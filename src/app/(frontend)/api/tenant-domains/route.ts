import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'

import { normalizeHost, type TenantDomainData } from '@/utilities/tenantDomains'

/**
 * Returns the editable domain→tenant map so `middleware.ts` can resolve an
 * incoming host without running the Payload local API at the Edge. Cached under
 * the `tenant-domains` tag; the Tenants collection hooks bust that tag on every
 * change, so adding a site in admin takes effect without a redeploy.
 */
const getCachedTenantDomainMap = unstable_cache(
  async (): Promise<TenantDomainData> => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        domains: true,
        isMain: true,
      },
    })

    const map: Record<string, string> = {}
    let mainSlug: string | null = null

    for (const tenant of docs) {
      if (tenant.isMain && tenant.slug) {
        mainSlug = tenant.slug
      }
      for (const entry of tenant.domains || []) {
        if (entry?.domain && tenant.slug) {
          map[normalizeHost(entry.domain)] = tenant.slug
        }
      }
    }

    return { map, mainSlug }
  },
  ['tenant-domains'],
  { tags: ['tenant-domains'] },
)

export async function GET() {
  const data = await getCachedTenantDomainMap()
  return NextResponse.json(data)
}
