import type { Tenant } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

import { normalizeHost } from './tenantDomains'

/**
 * Resolves the tenant for the incoming request by matching the `host` header
 * against each tenant's configured domains, falling back to the main tenant.
 * For Node-runtime route handlers (e.g. sitemaps) that middleware does not
 * rewrite, so they cannot read the `[tenant]` route param.
 */
export async function getTenantFromHost(): Promise<Tenant | null> {
  const headerList = await headers()
  const host = normalizeHost(headerList.get('host') || '')

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'tenants',
    depth: 0,
    limit: 1000,
    pagination: false,
  })

  const match = docs.find((tenant) =>
    (tenant.domains || []).some((entry) => normalizeHost(entry?.domain || '') === host),
  )
  const main = docs.find((tenant) => tenant.isMain)

  return match ?? main ?? null
}
