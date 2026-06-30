/**
 * Types for the per-tenant seed content. Each tenant lives in its own folder
 * (`frokost-konsortiet/`, `smagssans/`, `frajorden/`) with:
 *   - `index.ts`  — the TenantDef (meta + which pages/posts/menu it has)
 *   - `menu.ts`   — header + footer navigation
 *   - `pages/*`   — one file per page, each a PageFactory
 *   - `posts.ts`  — the tenant's news posts
 *   - `images/`   — image files referenced in content via `img('name')`
 *
 * Pages and posts are *factories*: the engine calls them with a `PageContext`
 * that resolves images to media ids and builds env-aware cross-site links.
 */

export type TenantMeta = {
  name: string
  slug: string
  /** The main Frokost Konsortiet site (fallback for unknown hosts). */
  isMain: boolean
  domains: string[]
  /** Short one-liner used when other sites list this tenant (e.g. the Partnere page). */
  tagline: string
}

/**
 * Passed to every page/post/menu factory.
 *   - `img('hero')` → the media id for `images/hero.<ext>` (throws if missing)
 *   - `siteUrl('smagssans')` → absolute URL to that tenant's site (env-aware)
 */
export type PageContext = {
  tenantID: string
  authorID: string
  img: (key: string) => string
  tenants: TenantMeta[]
  siteUrl: (slug: string) => string
}

/** A document the engine upserts (keyed on its `slug` within the tenant). */
export type SeedDoc = Record<string, unknown> & { slug: string }

export type PageFactory = (ctx: PageContext) => SeedDoc
export type PostFactory = (ctx: PageContext) => SeedDoc

export type NavItem = Record<string, unknown>
export type NavFactory = (ctx: PageContext) => { header: NavItem[]; footer: NavItem[] }

export type TenantDef = TenantMeta & {
  /** This tenant's folder; the engine reads `images/` from here. */
  dir: string
  pages: PageFactory[]
  posts: PostFactory[]
  menu: NavFactory
}
