import type { Tenant } from '@/payload-types'

import { headers } from 'next/headers'

import { getAllTenants } from './getTenant'
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

  // Cached and busted with the `tenant-domains` tag — crawlers hit robots.txt
  // and the sitemaps often, and this runs on every one of those requests.
  const docs = await getAllTenants()

  const match = docs.find((tenant) =>
    (tenant.domains || []).some((entry) => normalizeHost(entry?.domain || '') === host),
  )
  const main = docs.find((tenant) => tenant.isMain)

  return match ?? main ?? null
}
