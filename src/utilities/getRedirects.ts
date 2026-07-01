import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { ownedByTenant } from '@/data/tenantScope'

export async function getRedirects(tenantSlug: string, depth = 1) {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
    where: ownedByTenant(tenantSlug),
  })

  return redirects
}

/**
 * Returns an unstable_cache function tagged per tenant so one site's redirects
 * do not fire on another's. Cache all of a tenant's redirects together.
 */
export const getCachedRedirects = (tenantSlug: string) =>
  unstable_cache(async () => getRedirects(tenantSlug), ['redirects', tenantSlug], {
    tags: [`redirects_${tenantSlug}`],
  })
