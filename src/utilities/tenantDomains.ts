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
 * The single source of truth for which of a tenant's domains a link or
 * canonical URL should target — shared by the seed's menu links, the footer's
 * family directory and the site's own canonical/sitemap origin, so the policy
 * can't drift between them.
 *
 * Public URLs use the domain an editor marked primary (the one the site is
 * live on). A site without one isn't live yet: prefer its `new.*` staging
 * domain, then any non-localhost domain. Local URLs prefer the `*.localhost`
 * dev domains.
 */
export const pickLinkDomain = (
  domains: string[],
  preferPublic: boolean,
  primary?: string,
): string | undefined =>
  preferPublic
    ? (primary ??
      domains.find((d) => d.startsWith('new.')) ??
      domains.find((d) => !d.includes('localhost')) ??
      domains[0])
    : (domains.find((d) => d.includes('localhost')) ?? domains[0])

/** Absolute URL for a chosen domain (localhost gets http + the given port). */
export const urlForTenantDomain = (domain: string, localPort?: string): string =>
  domain.includes('localhost')
    ? `http://${domain}${localPort ? `:${localPort}` : ''}/`
    : `https://${domain}/`
