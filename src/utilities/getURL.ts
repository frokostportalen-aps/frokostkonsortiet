import type { Tenant } from '@/payload-types'

import canUseDOM from './canUseDOM'
import { pickLinkDomain, urlForTenantDomain } from './tenantDomains'

/**
 * The domain an editor marked as the tenant's primary one — set only once the
 * site is live there. No primary domain means the site isn't live yet.
 */
const getTenantPrimaryDomain = (tenant?: Tenant | null): string | undefined =>
  tenant?.domains?.find((d) => d?.primary)?.domain || undefined

/** A site is open to search engines only once it has a primary domain. */
export const isTenantIndexable = (tenant?: Tenant | null): boolean =>
  Boolean(getTenantPrimaryDomain(tenant))

/**
 * Environment-aware absolute URL to a tenant's own site (with a trailing
 * slash), for cross-site links (the footer's family directory). Shares the
 * seed's domain policy via `pickLinkDomain`, so the two can't drift.
 */
export const getTenantCrossURL = (tenant: Tenant): string => {
  const domains = (tenant.domains ?? []).map((d) => d.domain)
  const server = getServerSideURL()
  // A production build must never emit *.localhost family links, even when the
  // server runs behind a proxy with NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  // — visitors can't resolve those. Only a dev build follows the env's word.
  const explicitServer =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const isLocal =
    process.env.NODE_ENV !== 'production' &&
    (explicitServer ? /localhost|127\.0\.0\.1/.test(explicitServer) : true)

  const domain = pickLinkDomain(domains, !isLocal, getTenantPrimaryDomain(tenant))
  if (!domain) return server

  let port = ''
  try {
    port = new URL(server).port
  } catch {
    /* keep default */
  }
  return urlForTenantDomain(domain, port)
}

/**
 * The origin for a given tenant (e.g. "https://frajorden.dk"), for canonical
 * URLs and sitemaps: the same domain cross-site links use, so its primary
 * domain once it is live. Falls back to the shared server URL when there is no
 * tenant.
 */
export const getTenantServerURL = (tenant?: Tenant | null) =>
  tenant ? getTenantCrossURL(tenant).replace(/\/$/, '') : getServerSideURL()

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
