import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

import { pagePath } from '@/collections/Pages/hooks/revalidatePage'
import { postPath } from '@/collections/Posts/hooks/revalidatePost'
import type { RevalidateRef } from '@/endpoints/seed/tenants/seed-tenants'

/**
 * On-demand revalidation for out-of-band content writes — chiefly
 * `pnpm seed:tenants[:prod]`, which runs outside the Next.js runtime and so
 * seeds with `context.disableRevalidate` (the afterChange hooks that normally
 * revalidate can't run there). After seeding, the CLI script POSTs the docs it
 * touched here so the static/ISR cache is purged immediately instead of waiting
 * out the `revalidate = 600` window.
 *
 * Guarded by REVALIDATE_SECRET (same style as the preview route's secret).
 * Excluded from the tenant proxy via the `next/` matcher exclusion in proxy.ts.
 *
 *   POST /next/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   {
 *     "items": [{ "tenant": "smagssans", "slug": "home", "collection": "pages" }],
 *     "tags": ["brand_smagssans"]
 *   }
 */
const pathFor = ({ tenant, slug, collection }: RevalidateRef): string =>
  collection === 'posts' ? postPath(tenant, slug) : pagePath(tenant, slug)

/**
 * The only tags callers may bust directly: the per-tenant globals the seed
 * writes with `context.disableRevalidate` (their afterChange hooks never fire,
 * so the seed reports exactly the tags it touched — see `SeedResult`).
 */
const TENANT_GLOBAL_TAG = /^(header|footer|brand)_[a-z0-9-]+$/

export async function POST(req: NextRequest): Promise<Response> {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  let items: RevalidateRef[]
  let tags: string[]
  try {
    const body = (await req.json()) as { items?: RevalidateRef[]; tags?: unknown[] }
    items = Array.isArray(body.items) ? body.items : []
    tags = (Array.isArray(body.tags) ? body.tags : []).filter(
      (tag): tag is string => typeof tag === 'string' && TENANT_GLOBAL_TAG.test(tag),
    )
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const paths: string[] = []
  const sitemapTenants = { pages: new Set<string>(), posts: new Set<string>() }

  for (const item of items) {
    if (!item?.tenant || !item?.slug) continue
    const collection = item.collection === 'posts' ? 'posts' : 'pages'
    const path = pathFor({ ...item, collection })
    revalidatePath(path)
    paths.push(path)
    sitemapTenants[collection].add(item.tenant)
  }

  // Refresh the sitemap caches once per (collection, tenant), mirroring the
  // tags the afterChange hooks set.
  for (const tenant of sitemapTenants.pages) revalidateTag(`pages-sitemap-${tenant}`, 'max')
  for (const tenant of sitemapTenants.posts) revalidateTag(`posts-sitemap-${tenant}`, 'max')

  // Replay the tenant-global tags the seed reported (header/footer nav, brand
  // logo + favicon), so a seeded change shows immediately — these caches are
  // tag-only with no expiry, so nothing else would ever refresh them.
  for (const tag of tags) revalidateTag(tag, 'max')

  // Seeding also creates/updates tenants, but it runs with
  // `context.disableRevalidate`, so the Tenants afterChange hook that normally
  // busts the `tenant-domains` tag never fires. Bust it here so the proxy's
  // domain→tenant map repopulates immediately — otherwise a freshly seeded DB
  // keeps serving the empty map cached before seeding, and the root `/` 404s
  // because no host can be resolved to a tenant.
  revalidateTag('tenant-domains', 'max')

  return NextResponse.json({ revalidated: paths.length + tags.length, paths, tags })
}
