import type { PaginatedDocs, Where } from 'payload'
import type { Page, Post, Search } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { getTenantBySlug } from '@/utilities/getTenant'
import { ownedByTenant, visiblePostsWhere } from './tenantScope'

/**
 * The one seam for reading a site's content. Every function requires a
 * `tenantSlug`, so no frontend read can forget its tenant scope — the leak risk
 * ADR-0001 flags lives here and nowhere else. Pages are always scoped to the
 * site that owns them; posts follow the aggregator rule (see tenantScope.ts).
 */

/** Resolve the aggregator-aware post visibility for a site. */
async function visibleToTenant(tenantSlug: string): Promise<Where> {
  return visiblePostsWhere(await getTenantBySlug(tenantSlug), tenantSlug)
}

type BySlug = { tenantSlug: string; slug: string; draft: boolean }

/** A published (or draft) page for this site, by slug. */
export const findPageBySlug = cache(async ({ tenantSlug, slug, draft }: BySlug): Promise<Page | null> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { and: [{ slug: { equals: slug } }, ownedByTenant(tenantSlug)] },
  })

  return docs?.[0] ?? null
})

/** A post visible to this site, by slug (the main tenant may see any kitchen's). */
export const findPostBySlug = cache(async ({ tenantSlug, slug, draft }: BySlug): Promise<Post | null> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { and: [{ slug: { equals: slug } }, await visibleToTenant(tenantSlug)] },
  })

  return docs?.[0] ?? null
})

/** A page of posts visible to this site, for the listing views. */
export async function listPosts({
  tenantSlug,
  limit = 12,
  page,
  depth = 1,
}: {
  tenantSlug: string
  limit?: number
  page?: number
  depth?: number
}): Promise<PaginatedDocs<Post>> {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'posts',
    depth,
    limit,
    overrideAccess: false,
    where: await visibleToTenant(tenantSlug),
    ...(page ? { page } : {}),
  })
}

/** How many posts are visible to this site — used to page the listing. */
export async function countPosts({ tenantSlug }: { tenantSlug: string }): Promise<number> {
  const payload = await getPayload({ config: configPromise })

  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
    where: await visibleToTenant(tenantSlug),
  })

  return totalDocs
}

/** Posts visible to this site, optionally narrowed to categories (Archive block). */
export async function listPostsByCategory({
  tenantSlug,
  categoryIds,
  limit = 3,
}: {
  tenantSlug: string
  categoryIds?: (string | number)[]
  limit?: number
}): Promise<Post[]> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    where: {
      and: [
        await visibleToTenant(tenantSlug),
        ...(categoryIds?.length ? [{ categories: { in: categoryIds } }] : []),
      ],
    },
  })

  return docs
}

/** The card fields the search view renders — mirrors the `select` below. */
type SearchResult = Pick<Search, 'id' | 'title' | 'slug' | 'meta' | 'categories'>

/** Search results scoped to what this site may see. */
export async function searchPosts({
  tenantSlug,
  query,
  limit = 12,
}: {
  tenantSlug: string
  query?: string
  limit?: number
}): Promise<PaginatedDocs<SearchResult>> {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'search',
    depth: 1,
    limit,
    pagination: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    where: {
      and: [
        await visibleToTenant(tenantSlug),
        ...(query
          ? [
              {
                or: [
                  { title: { like: query } },
                  { 'meta.description': { like: query } },
                  { 'meta.title': { like: query } },
                  { slug: { like: query } },
                ],
              },
            ]
          : []),
      ],
    },
  })
}
