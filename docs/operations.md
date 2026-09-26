# Production operations

Hard-won, non-obvious things about running this multi-tenant stack in
production. See also [seeding.md](seeding.md) for the content seed itself.

Note what is *not* here: a way to change production from a terminal. Content on
the live sites is written by editors in the admin panel, and every script in
this repo refuses a non-local database
([ADR 0003](adr/0003-no-production-seed.md)).

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
- **Nothing you run locally can reach the live bucket.** Media is only ever
  written or deleted there by the deployed app, acting on what an editor does in
  the admin. `prune:media` — which deletes R2 objects — is local-only like
  everything else, because an image an editor uploaded but has not placed on a
  page yet looks exactly like an orphan to it.

## Production is editors' work — no script touches it

The customer writes content in the admin panel, so **no script may create,
overwrite or delete anything on production**. Every `:prod` command is gone, and
`seed-tenants`, `add-page`, `prune-media` and `prune-versions` all exit before
connecting if `DATABASE_URL` is not a local host. No flag overrides it. The
rationale is [ADR 0003](adr/0003-no-production-seed.md).

New content for a live site is therefore a task in the admin, not a data file
plus a deploy. Seed data is still what sets up a **fresh local database** and
what a new site starts from before it is handed over.

The one deliberate exception is **user administration** — creating or resetting
a super-admin when mail is broken or you are locked out (see the last section).
That is an account operation, not content, and it is done by hand with a
throwaway script rather than a committed command.

## When production content refreshes

Edits made in the admin fire Payload's `afterChange` hooks, which call
`revalidatePath`/`revalidateTag` in the running app — a published change is live
right away, no deploy needed.

The `[tenant]`, `[tenant]/[slug]` and posts routes also use ISR
(`export const revalidate = 600`), which is the backstop: anything that reached
the database **without** going through the running app (a direct MongoDB edit,
say) shows up within ~10 minutes, or immediately after a redeploy.

## Ugens menu (frokostportalen)

The "Ugens menu" block reads a kitchen's published week straight from
frokostportalen's public endpoint — no login, no key:

```
GET https://backend.frokostportal.dk/api/public/menu?week=<1-53>&year=<ISO-år>&kitchenId=<GUID>&language=da
```

**It must be called server-to-server** — CORS blocks other origins, so the fetch
lives in `src/data/weeklyMenu.ts` and never in a `'use client'` module.

Which kitchen a site asks for comes from the tenant, not from the block:
**Tenants → Køkken-ID**. Seeded from `kitchenId` in each tenant's `index.ts`, and
editable by a super-admin without a deploy. Frokost Konsortiet (the portal) has
no kitchen of its own and leaves it empty — the block then renders nothing at
all rather than guessing at a kitchen.

Two empty states, which mean different things:

- **"Køkkenet har ikke lagt ugens menu op endnu"** — the API answered fine, the
  week is simply empty. Normal for a kitchen that publishes late (Fra Jorden's
  kitchen has published nothing at all so far). Nothing to fix on our side.
- **"Menuen kan ikke hentes lige nu"** — the request itself failed. Check the
  endpoint by hand with the URL above before looking at our code.

The block fetches the current week plus the next one, and the visitor switches
between them client-side — no search params, so the pages stay statically
renderable.

A menu correction upstream reaches the site **within ~20 minutes** without a
deploy, and needs no action from us. That is two windows stacked: the fetch is
cached for 10 minutes (`revalidate: 600`), and it is only ever called when the
page itself regenerates, which its own ISR window (also 600 s) drives. The fetch
is tagged `weekly-menu` and `weekly-menu-<kitchenId>` for a future on-demand
invalidator — nothing busts those tags today, so don't count on them. Redeploy
if a correction has to be live immediately.

`FROKOSTPORTAL_MENU_URL` overrides the endpoint if it ever moves.

## Transactional mail (Resend)

Mail — form notifications and "forgot password" — goes through
[Resend](https://resend.com). `payload.config.ts` only installs the adapter when
`RESEND_API_KEY` is set; without it Payload keeps its default adapter, which
**logs** the mail to the console instead of sending it. Local dev therefore
needs no setup and can never mail a real customer by accident.

### What lives where

The one Resend account is platform-wide; the sender identity is per site.

| Setting | Where | Why there |
| --- | --- | --- |
| `RESEND_API_KEY` | env | A secret, one per platform |
| `EMAIL_DEFAULT_FROM_ADDRESS` / `_NAME` | env | Platform *fallback* — see below |
| `EMAIL_OVERRIDE_RECIPIENT` | env | Redirects *every* mail here — staging only |
| A site's lead inbox (`contactEmail`) | its `TenantDef` | Differs per site |
| A site's own sender (`senderEmail`) | its `TenantDef`, optional | Differs per site |

The env fallback is not "the from address for everything" — it is what gets used
when there is no tenant to ask. That happens in exactly one place: Payload sends
password-reset mail with `email.defaultFromName/Address` hardcoded in its own
`forgotPassword.ts`, with no per-tenant seam. Everything a *visitor* triggers
goes out under the site's own identity.

Per-site mail config lives in `data/<tenant>/index.ts`:

```ts
contactEmail: 'kontakt@smagssans.dk',   // where forespørgsler land
senderEmail: 'no-reply@smagssans.dk',   // optional; needs its own DNS verification
```

`seed-tenants.ts` bakes both onto the tenant's "Få et tilbud" form. A re-seed
with `--force` pushes a change into existing forms; editors can also edit it per
form under **Forms → Emails** in the admin.

**Any sender domain must be verified in Resend** (DNS: SPF + DKIM). A site
without `senderEmail` sends from the platform address under its own display name
(`Smagssans <no-reply@frokostkonsortiet.dk>`), so one verification covers every
site. Giving a site its own `senderEmail` is what costs another verification —
the trade is a cleaner-looking sender against the DNS work.

Notification mails carry the site name in the subject and set `replyTo` to the
visitor's own address, so hitting reply answers the visitor directly. The body is
a `{{*:table}}` placeholder, which plugin-form-builder expands into a table of
every submitted field — including fields an editor adds later.

Submissions are stored in the `form-submissions` collection regardless of
whether the mail goes out, so a mail failure never loses a lead. Failures are
logged (`Error while sending email to address: …`) rather than shown to the
visitor.

## Restoring an admin login

With Resend configured, Payload's "forgot password" flow works. If mail is
broken — or you are bootstrapping the first user — create or reset a super-admin
by running the Local API against the prod DB (a short `tsx` script using
`getPayload` with `.env.production`):

- Prefer **creating/resetting with a strong password** — never the seed default
  `password`.
- Never delete the last super-admin. The seed's post-author logic reuses any
  existing super-admin, so deleting the one you log in with will lock you out.
