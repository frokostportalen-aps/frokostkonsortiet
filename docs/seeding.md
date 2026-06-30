# Seeding & content

The seed turns plain TypeScript data into each site's pages, posts, media,
header and footer. It is **additive by default** — safe to run after editors
have written real content — and lives in `src/endpoints/seed/tenants/`.

For the production-specific gotchas (R2 image storage, the import map landmine,
cache/redeploy after a seed, restoring an admin login) see
[operations.md](operations.md). The design rationale is
[ADR 0002](adr/0002-additive-per-tenant-seed.md).

## Structure — one folder per tenant

```
src/endpoints/seed/tenants/
  seed-tenants.ts        # the engine (upsert helpers, image loading, force reset)
  lexical.ts             # low-level Lexical rich-text builders
  data/
    types.ts             # PageFactory, PostFactory, NavFactory, TenantDef, PageContext
    builders.ts          # composable block builders (content, mediaContent, cta, faq, hero, …)
    dir.ts               # folderOf(import.meta.url)
    index.ts             # assembles TENANTS = [frokostKonsortiet, smagssans, fraJorden]
    frokost-konsortiet/
      index.ts           # the TenantDef (meta + which pages/posts/menu it has)
      menu.ts            # header + footer navigation
      posts.ts           # the tenant's news posts
      pages/             # one file per page (home.ts, om-os.ts, services.ts, …)
      images/            # image files referenced from content (hero.jpg, …)
    smagssans/ …
    frajorden/ …
```

Pages and posts are **factories**: the engine calls them with a `PageContext`
that resolves images and builds env-aware cross-site links.

```ts
export const home: PageFactory = ({ tenantID, img, siteUrl, tenants }) => ({
  slug: 'home',
  tenant: tenantID,
  hero: hero.high(img('hero'), richText(heading('h1', '…'))),
  layout: [content([…]), mediaContent(img('forside-1'), 'left', …), cta(…)],
})
```

## Add or edit content

**A new page**

1. Create `data/<tenant>/pages/<slug>.ts` exporting a `PageFactory` (copy an
   existing page; compose with the helpers in `builders.ts`).
2. Add it to the tenant's `pages: [...]` array in `data/<tenant>/index.ts`.
3. Run the seed (additive) — only the new page is created.

**An image**

1. Drop a file into `data/<tenant>/images/`, e.g. `images/team.jpg`.
2. Reference it by its filename **without extension**: `img('team')`.

The engine uploads every image in the folder once, keyed on filename
(`${slug}-${name}`), so additive runs reuse them instead of re-uploading.
⚠️ Because of that reuse, **replacing an image file only takes effect on a
`--force` run** (additive keeps the already-uploaded media).

## Running the seed

```
pnpm seed:tenants                       # additive (default) — local docker stack
pnpm seed:tenants -- --force            # destructive reset — local
pnpm seed:tenants:prod                  # additive — prod DB (.env.production)
pnpm seed:tenants:prod -- --force --yes # destructive reset — prod (deliberate)
```

Run the local variant **inside the container** so fetched media lands in the
app's media volume: `docker compose exec app pnpm seed:tenants`.

- **Additive** (default): pages/posts are upserted on `(tenant, slug)` and media
  on filename. Existing documents — including editor edits — are never touched.
- **`--force`** (alias `--reset`): wipes each tenant's `posts`/`pages`/`media`
  and rebuilds them from the seed. It never touches `users` or `tenants`.
  Against production it additionally requires **`--yes`** (the guard treats any
  non-local `DATABASE_URL` host as production — see `scripts/seedTarget.ts`).

**Post author:** the engine reuses an existing super-admin as the post author
and only creates the dev `admin@example.com` user on a database with **no users
at all** (a fresh local DB). Seeding a populated DB (production) never adds that
test user.

## Ad-hoc: add a single page from code

`scripts/add-page.ts` shows how to insert one page additively using the exported
`upsertPage` helper, without touching the declarative data files:

```
pnpm tsx scripts/add-page.ts
```

## Clean up unused media

`prune-media` deletes media that **no document references** (orphans left when
an image is renamed/removed, or a page an upload belonged to is deleted). It
removes both the media document and the Cloudflare R2 object.

```
pnpm prune:media                       # dry run — lists orphans, deletes nothing
pnpm prune:media -- --apply            # delete (local)
pnpm prune:media:prod -- --apply --yes # delete against prod (deliberate)
```

It is safe by design: a media is an orphan only if its id appears in **no** other
document (it scans every collection for referenced ObjectIds).
