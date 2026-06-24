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
 * All tenant slugs — used by `generateStaticParams` to prerender every site.
 */
export const getAllTenantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true },
    })
    return docs.map((t) => t.slug).filter(Boolean) as string[]
  },
  ['tenant-slugs'],
  { tags: ['tenant-domains'] },
)
