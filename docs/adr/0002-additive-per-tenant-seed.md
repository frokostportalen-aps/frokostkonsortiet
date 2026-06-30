# 2. Additive, per-tenant seed with composable content

- Status: Accepted
- Date: 2026-06-30
- Deciders: Kasper Birch

## Context

The original seed ([ADR 0001](0001-multi-tenant-from-single-payload.md) covers
the multi-tenant base) was **destructive per tenant**: on every run it deleted
all `posts`, `pages` and `media` for a tenant and rebuilt them. All content for
every site also lived in a single ~1,200-line `seed-data.ts`.

Two things made that untenable:

1. **Editors are coming.** Once people write real content in the admin,
   re-running the seed would delete their work.
2. **Authoring/maintenance.** One giant file made it hard to see what belonged
   to which tenant, and the high-level section format (`text`/`columns`/`pricing`/`faq`)
   couldn't express richer pages or place images freely.

Requirements: keep the ability to add content programmatically, make it **safe
to re-run** against a live database, organise content **per tenant**, and let
images be **dropped in and referenced** from content.

## Decision

### Idempotent, additive engine
- Pages/posts are **upserted on `(tenant, slug)`** (backed by the existing
  unique index); media on its **filename**. Default runs only create what's
  missing and never touch existing documents — editor edits survive.
- A **`--force`** flag restores the destructive reset (wipe + rebuild
  `pages`/`posts`/`media`); it never touches `users` or `tenants`. Against a
  production database it additionally requires **`--yes`** (`scripts/seedTarget.ts`
  treats any non-local `DATABASE_URL` host as production).
- The post author is an **existing super-admin**; the dev `admin@example.com`
  user is created only on a database with no users at all (fresh local).

### Per-tenant folders + composable pages
- Each tenant is a folder under `data/<tenant>/` with `index.ts` (a `TenantDef`),
  `menu.ts`, `posts.ts`, `pages/<slug>.ts`, and an `images/` folder.
- Pages/posts are **factories** (`PageFactory`) built from small **block
  builders** (`builders.ts`: `content`, `mediaContent`, `cta`, `faq`, `hero`, …),
  so any page can be composed freely instead of fitting a fixed section schema.

### Local images referenced by name
- Images are **files in the tenant's `images/` folder**, referenced from content
  via `img('name')` (filename without extension). The engine uploads each once
  and resolves the name to a media id.

### Orphan cleanup
- `scripts/prune-media.ts` deletes media no document references (and its R2
  object), dry-run by default.

## Consequences

- **Editor content is safe** across re-seeds; programmatic content is still
  first-class (edit a data file, or use `upsertPage` ad-hoc).
- **Per-tenant editing is easy**; the trade-off is some duplication (the kitchen
  sites share near-identical page sets by design, for independent editing).
- **Replacing an image file requires a `--force` run** — additive runs reuse
  already-uploaded media by filename.
- The `s3Storage` (R2) admin component **must stay in the import map**, or the
  production admin breaks; this is now guarded at build time. See
  [operations.md](../operations.md).
- Out-of-band seeds don't bust the Next route cache, so a **redeploy** (or the
  ISR window) is needed for already-built pages to reflect changes.

See [seeding.md](../seeding.md) for the operational guide.
