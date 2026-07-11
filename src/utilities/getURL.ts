import type { Tenant } from '@/payload-types'

import canUseDOM from './canUseDOM'
import { pickLinkDomain, urlForTenantDomain } from './tenantDomains'

/**
 * The public origin for a given tenant, derived from its first configured
 * domain (e.g. "https://smagssans.dk"). Falls back to the shared server URL
 * when a tenant has no domain yet (local dev, freshly created sites).
 */
export const getTenantServerURL = (tenant?: Tenant | null) => {
  const domain = tenant?.domains?.[0]?.domain
  if (domain) {
    return domain.startsWith('http') ? domain : `https://${domain}`
  }
  return getServerSideURL()
}

/**
 * Environment-aware absolute URL to a tenant's own site, for cross-site links
 * (the footer's family directory). Shares the seed's domain policy via
 * `pickLinkDomain`, so the two can't drift.
 */
export const getTenantCrossURL = (tenant: Tenant): string => {
  const domains = (tenant.domains ?? []).map((d) => d.domain)
  const server = getServerSideURL()
  // Decide local vs public from the *explicit* env when present; without one,
  // getServerSideURL falls back to localhost, which must not make a
  // mis-configured production build link to *.localhost domains.
  const explicitServer =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const isLocal = explicitServer
    ? /localhost|127\.0\.0\.1/.test(explicitServer)
    : process.env.NODE_ENV !== 'production'

  const domain = pickLinkDomain(domains, !isLocal)
  if (!domain) return server

  let port = ''
  try {
    port = new URL(server).port
  } catch {
    /* keep default */
  }
  return urlForTenantDomain(domain, port)
}

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
