/**
 * Pure helpers shared by the Edge middleware and the `/api/tenant-domains`
 * route. No Payload / Node imports here — the middleware runs on the Edge.
 */

export type TenantDomainData = {
  /** normalized host → tenant slug */
  map: Record<string, string>
  /** slug of the tenant flagged `isMain`, used as fallback for unknown hosts */
  mainSlug: string | null
}

/** Lowercase, drop the port, and strip a leading `www.` so lookups are stable. */
export function normalizeHost(host: string): string {
  return host
    .toLowerCase()
    .split(':')[0]
    .replace(/^www\./, '')
    .trim()
}

/**
 * Resolve an incoming host to a tenant slug. Unknown hosts (e.g. localhost,
 * preview URLs) fall back to the main site so the app still renders.
 */
export function resolveTenantSlug(host: string, data: TenantDomainData): string | null {
  const normalized = normalizeHost(host)
  return data.map[normalized] ?? data.mainSlug
}

/**
 * The single source of truth for which of a tenant's domains a cross-site
 * link should target — shared by the seed's menu links and the footer's
 * family directory, so the policy can't drift between them.
 *
 * Public links prefer the `new.*` staging domains (the primary domains are
 * not live yet), then any non-localhost domain; local links prefer the
 * `*.localhost` dev domains.
 */
export const pickLinkDomain = (domains: string[], preferPublic: boolean): string | undefined =>
  preferPublic
    ? (domains.find((d) => d.startsWith('new.')) ??
      domains.find((d) => !d.includes('localhost')) ??
      domains[0])
    : (domains.find((d) => d.includes('localhost')) ?? domains[0])

/** Absolute URL for a chosen domain (localhost gets http + the given port). */
export const urlForTenantDomain = (domain: string, localPort?: string): string =>
  domain.includes('localhost')
    ? `http://${domain}${localPort ? `:${localPort}` : ''}/`
    : `https://${domain}/`
