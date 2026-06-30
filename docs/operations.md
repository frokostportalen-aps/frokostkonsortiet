# Production operations

Hard-won, non-obvious things about running this multi-tenant stack in
production. See also [seeding.md](seeding.md) for the content seed itself.

## ⚠️ Import map must include the R2 upload handler

**Symptom:** the production admin at `/admin` renders a completely **blank
page** — providers mount, all chunks return 200, **no browser console error** —
while the local dev admin works fine. The server log shows:

```
getFromImportMap: PayloadComponent not found in importMap
{ key: '@payloadcms/storage-s3/client#S3ClientUploadHandler' }
```

**Cause:** the `s3Storage` (Cloudflare R2) plugin only activates when
`R2_BUCKET` is set (`src/plugins/index.ts`). When active it injects an admin
component — `S3ClientUploadHandler` — that **must** be present in
`src/app/(payload)/admin/importMap.js`. The local dev container has **no
`R2_BUCKET`**, so Payload's dev-time import-map regeneration **strips that
entry**. Production (R2 on) then can't resolve the component and renders blank.
`next dev` resolves components dynamically so it never notices locally.

**Fix / prevention:**
- Regenerate with R2 active and commit: `pnpm generate:importmap`. The script
  forces `R2_BUCKET=placeholder` so the entry is always included (the value is
  irrelevant to map generation — the plugin just needs to be active).
- A `prebuild` guard (`scripts/assert-importmap.mjs`) fails the build if the
  entry is missing, so a stripped map fails loudly instead of shipping a blank
  admin.
- The dev container keeps stripping the entry in your **working tree** (you'll
  see `importMap.js` as modified in `git status`). That's cosmetic now — **do
  not commit that change**; run `pnpm generate:importmap` if you ever need to
  update the map for real.

## Media storage & the shared R2 bucket

- Media goes to **Cloudflare R2** only when `R2_BUCKET` is set (it is in
  `.env.production`). Without it — the local container — uploads fall back to the
  on-disk `public/media` volume.
- ⚠️ **Local `:prod` runs and the deployed app point at the same R2 bucket.**
  Running `pnpm seed:tenants:prod` or `pnpm prune:media:prod` from your machine
  writes to / deletes from the **live** bucket. `--force` deletes a tenant's R2
  objects (via the s3Storage delete hook) before re-uploading.

## Content changes need a redeploy (or the ISR window)

The seed is a CLI script that writes to the DB directly. It **cannot bust the
running server's Next route cache** (and runs with `disableRevalidate`). So:

- Pages that existed at the **last build** (home, om-os) stay **cached** with
  their old content/media until something refreshes them.
- **New slugs** (a brand-new page) render fresh on-demand and show immediately.

The `[tenant]`, `[tenant]/[slug]` and posts routes use ISR
(`export const revalidate = 600`), so published pages self-refresh within ~10
minutes. **After seeding production, trigger a redeploy** for an immediate
refresh (a redeploy also rebuilds the admin import map cleanly).

## Seeding production safely

```
pnpm seed:tenants:prod -- --force --yes
```

Pre-flight worth doing first (read-only against the prod DB): confirm a
super-admin exists and check how many pages/posts/media `--force` will delete.
`--force` never touches `users` or `tenants`; it only wipes and rebuilds
`pages`/`posts`/`media`. Redeploy afterwards (see above).

## Restoring an admin login

There is **no email adapter** configured in production, so Payload's
"forgot password" flow cannot send reset mails. To create or reset a super-admin
you run the Local API against the prod DB (a short `tsx` script using
`getPayload` with `.env.production`):

- Prefer **creating/resetting with a strong password** — never the seed default
  `password`.
- Never delete the last super-admin. The seed's post-author logic reuses any
  existing super-admin, so deleting the one you log in with will lock you out.
- Consider adding an email adapter so password resets work without DB access.
