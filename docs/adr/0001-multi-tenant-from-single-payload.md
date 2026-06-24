# 1. Multi-tenant: many sites from one Payload instance

- Status: Accepted
- Date: 2026-06-24
- Deciders: Kasper Birch

## Context

Frokost Konsortiet is the main site. It has several "kitchens" (køkkener) — e.g. *smagssans* and *frajorden* — and more will be added over time. Each site needs **its own root domain** (frokostkonsortiet.dk, smagssans.dk, frajorden.dk), but the team wants to manage **all sites from a single Payload admin** and ship them from a **single Next.js app**, without a redeploy every time a site is added.

The starting point was the standard Payload "website" template (Payload 3.85, Next 16 App Router, MongoDB): a single-site setup with `pages`, `posts`, `categories`, `media`, `users`, and `header`/`footer` globals.

Three product decisions framed the design:

1. **Separate root domains** per site (not subdomains, not path prefixes).
2. **The main site is both its own tenant and an aggregator** — its listings may show content across all kitchens, while each kitchen shows only its own.
3. **The domain → site mapping must be editable in the Payload admin**, so a new site can go live without a code change/redeploy.

## Decision

Adopt the official **`@payloadcms/plugin-multi-tenant`** plus a Next.js host-resolving **proxy** (Next 16's `proxy.ts`, formerly `middleware.ts`).

### Data model
- A **`tenants` collection** (`name`, `slug`, editable `domains[]`, `isMain`) is the source of truth for sites and their domains.
- The plugin injects a `tenant` field into `pages`, `posts`, `categories`, `media`, `redirects`, `forms`, and `search`.
- **`header`/`footer` become tenant-scoped collections** (`isGlobal: true` — one document per tenant) because Payload globals cannot be per-tenant.
- `users` gain a `roles` field; **super-admins** (`userHasAccessToAllTenants`) manage every site, **editors** are bound to their assigned tenant(s).

### Request routing
- `src/proxy.ts` reads the incoming `host`, resolves it to a tenant slug via the cached `/api/tenant-domains` route, and **rewrites to an internal `/{tenantSlug}/...` path**. It is idempotent (won't double-prefix already-scoped paths such as same-origin live-preview redirects) and falls back to the main tenant for unknown hosts.
- The frontend lives under **`app/(frontend)/[tenant]/...`** so Next's Full Route Cache and `generateStaticParams` are tenant-aware.
- Editing a tenant's `domains` busts the `tenant-domains` cache tag (Tenants `afterChange` hook) → routing updates **without a redeploy**.

### Scoping & aggregation
- The plugin only scopes the **admin**. Every frontend `payload.find` (`overrideAccess: false`) **must** filter by `'tenant.slug'`, or content leaks across sites.
- `getTenantPostsWhere()` returns `{}` for the main tenant (aggregator) and a tenant constraint for kitchens.
- Cache tags and `revalidatePath` calls are tenant-prefixed (`header_${slug}`, `redirects_${slug}`, `/{tenant}/posts/${slug}`, per-tenant sitemaps).

### Cross-domain plumbing
- `TENANT_ORIGINS` (comma-separated env) feeds Payload CORS and `next/image` `remotePatterns`.
- Per-tenant `metadataBase`/canonical URLs derive from each tenant's first domain.
- Live preview stays **same-origin** (the admin domain) because draft cookies don't cross root domains; the preview route enforces that the user may preview the path's tenant.

## Consequences

### Positive
- One admin, one deployment, one database for all sites.
- New sites are added entirely from the admin (create tenant + domains) — no code change.
- Strong per-site isolation with a deliberate aggregator escape hatch for the main site.
- Static generation and caching remain per-site correct via the `[tenant]` route segment.

### Negative / trade-offs
- **Cross-tenant leakage is a standing risk**: any new frontend query that forgets the tenant filter exposes another site's content. This is the most important invariant to uphold in review.
- More moving parts: a proxy, a cached domain-resolution endpoint, and tenant-prefixed cache keys.
- Globals had to become collections, changing the editing model for header/footer.
- The proxy fetches `/api/tenant-domains` on matched requests (cached), a small added hop.
- Not yet hard-constrained to same tenant: nested-docs category parents and the FormBlock relationship picker rely on the admin tenant selector rather than `filterOptions`.

### Operational notes
- Set `TENANT_ORIGINS` to every site origin before deploying secondary domains.
- Run `pnpm payload migrate` (`src/migrations/20260624_000000_multi_tenant_backfill.ts`) to backfill `tenant` on existing documents and create per-tenant header/footer.
- Local multi-domain testing: use `lvh.me` subdomains or `/etc/hosts` aliases, since root domains can't be exercised on localhost.

## Alternatives considered

- **Custom "Sites" collection + relationship field** instead of the plugin: more control, but reimplements tenant scoping, admin filtering, and the tenant selector that the plugin provides out of the box.
- **`x-tenant` header only (no `[tenant]` route segment)**: rejected — static prerendering can't key on a header (one site's HTML could be served to another domain), and the live-preview iframe can't set custom request headers.
- **Subdomains or path prefixes** instead of separate root domains: simpler DNS/dev, but does not meet the "each site its own brand domain" requirement.
