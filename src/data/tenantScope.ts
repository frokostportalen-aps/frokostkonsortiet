import type { Where } from 'payload'

/**
 * Tenant scoping — the invariant ADR-0001 calls out as the top risk: any content
 * read that forgets its tenant scope leaks another site's content.
 *
 * There are two distinct rules, and naming them is the point:
 *
 * - **owned** — documents whose `tenant` is exactly this site. Every site,
 *   including the main "Frokost Konsortiet" tenant, owns only its own pages and
 *   posts. Used for pages (always) and for per-site sitemaps.
 * - **visible** — the posts a visitor to this site may *see*. Kitchens see only
 *   what they own; the main tenant is an aggregator and sees posts from every
 *   kitchen. Used for the reader-facing post listing, detail, search and archive.
 *
 * These are pure functions with no I/O so the aggregator invariant is unit
 * testable without a database — see tests/int/tenantScope.int.spec.ts.
 */

/** Documents whose tenant is exactly this site (main included). */
export function ownedByTenant(tenantSlug: string): Where {
  return { 'tenant.slug': { equals: tenantSlug } }
}

/**
 * The `where` clause for posts a visitor to `tenantSlug` may see. The main
 * tenant aggregates (no constraint); every kitchen is scoped to what it owns.
 * Takes the resolved tenant document so the decision stays pure.
 */
export function visiblePostsWhere(
  tenant: { isMain?: boolean | null } | null,
  tenantSlug: string,
): Where {
  return tenant?.isMain ? {} : ownedByTenant(tenantSlug)
}
