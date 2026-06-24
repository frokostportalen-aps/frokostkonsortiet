import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

/**
 * Header and Footer are no longer Payload globals — they are tenant-scoped
 * collections (one document per tenant). This fetches the single document for a
 * given site, cached under a per-tenant tag so revalidating one site's header
 * does not bust another's.
 */
type TenantGlobalSlug = 'header' | 'footer'

async function getTenantGlobal(slug: TenantGlobalSlug, tenantSlug: string, depth = 1) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: slug,
    depth,
    limit: 1,
    pagination: false,
    where: {
      'tenant.slug': {
        equals: tenantSlug,
      },
    },
  })

  return result.docs?.[0] || null
}

/**
 * Returns an unstable_cache function tagged per tenant + global slug.
 */
export const getCachedGlobal = (slug: TenantGlobalSlug, tenantSlug: string, depth = 1) =>
  unstable_cache(async () => getTenantGlobal(slug, tenantSlug, depth), [slug, tenantSlug], {
    tags: [`${slug}_${tenantSlug}`],
  })
