import type { Tenant } from '@/payload-types'

import canUseDOM from './canUseDOM'

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
