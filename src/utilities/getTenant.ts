import type { Tenant } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function queryTenantBySlug(slug: string): Promise<Tenant | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'tenants',
    depth: 0,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return docs?.[0] || null
}

/**
 * Cached tenant lookup by slug, tagged so a tenant edit revalidates it.
 */
export const getTenantBySlug = (slug: string) =>
  unstable_cache(async () => queryTenantBySlug(slug), ['tenant', slug], {
    tags: ['tenant-domains', `tenant_${slug}`],
  })()

/**
 * All tenants with their public fields (name, slug, domains, isMain) — used by
 * the footer's family directory to cross-link every kitchen in the family.
 */
export const getAllTenants = unstable_cache(
  async (): Promise<Tenant[]> => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1000,
      pagination: false,
      sort: 'createdAt',
    })
    return docs
  },
  ['tenants-all'],
  { tags: ['tenant-domains'] },
)

/**
 * All tenant slugs — used by `generateStaticParams` to prerender every site.
 * Derived from `getAllTenants`, so the two share one query and one cache entry.
 */
export const getAllTenantSlugs = async (): Promise<string[]> =>
  (await getAllTenants()).map((t) => t.slug)
