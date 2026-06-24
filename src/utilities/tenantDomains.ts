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
