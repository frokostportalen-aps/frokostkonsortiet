# 3. The seed never runs against production

- Status: Accepted
- Date: 2026-09-26
- Deciders: Kasper Birch
- Amends: [ADR 0002](0002-additive-per-tenant-seed.md)

## Context

[ADR 0002](0002-additive-per-tenant-seed.md) made the seed additive precisely so
it could be run against a live database after editors had started writing: the
default run only creates what is missing, and a destructive `--force` reset
against production was gated behind an explicit `--yes`.

That was the right call while we were the only ones writing content. It no
longer is: **the customer has started writing their own content** on the live
sites. Two things follow.

1. **`--force` against production is now unacceptable at any confirmation
   level.** One habitual `pnpm seed:tenants:prod -- --force --yes` deletes every
   page, post and media the customer wrote — including the R2 objects. A
   double-confirm flag is a speed bump, not a guarantee, and the value it
   protected (rebuilding prod from seed data) is gone.
2. **Even an additive run is wrong now.** "Only creates what's missing" is not
   the same as "changes nothing": a page the customer deliberately *deleted* is
   missing, so the next additive run puts it back. The seed's idea of what a
   site should contain is simply no longer the truth about the live sites.

The seed is still how a fresh local database and a not-yet-handed-over site get
their content, so it stays — it just loses production as a target.

## Decision

- **Remove the `seed:tenants:prod` script.** There is no supported command for
  seeding production.
- **`scripts/seed-tenants.ts` refuses any non-local database**, before opening
  Payload and regardless of flags. Pointing the local command at prod by hand is
  caught too — the check reads `DATABASE_URL` itself, not just which env file
  was loaded. No flag overrides it.
- **`scripts/add-page.ts` carries the same guard.** It writes seed-shaped
  content through the same `upsertPage` helper and would otherwise be the way
  around the door we just closed.
- **One assert, in `scripts/seedTarget.ts`.** `assertLocalDatabase(hint)` is the
  single home of the rule, so a third content script cannot half-copy it or
  leave it out.
- **The check fails closed.** A run is allowed only when *every* host in
  `DATABASE_URL` is local. The previous host parse used `new URL()`, which
  throws on the multi-host replica-set form (`mongodb://a:27017,b:27017/db`) —
  and a throw meant "no host", which meant "not production". A guard whose one
  job is never to touch production must not open because it failed to parse.
- **The prune scripts are unchanged.** `prune:media:prod` and
  `prune:versions:prod` keep their `--apply --yes` gate: they delete only what
  no document references, which is a maintenance question, not a content one.

Content for a live site is now created in the admin panel, like any other
editorial change.

## Consequences

- **Editor content cannot be overwritten by us.** The failure mode ADR 0002
  mitigated is removed rather than mitigated.
- **Changing a live site's seed data no longer changes the live site.** Editing
  a `PageFactory` affects local databases and new sites only; the corresponding
  change on a live site is a manual edit in the admin. Expect the seed data and
  the live content to drift apart — that is the point, not a defect.
- **Handing over a new site is now a one-way door.** The last seed a site gets
  is the one before its editors are let in. Get its content right locally first.
- **The seed's production-specific plumbing keeps no purpose beyond local runs**
  (the revalidate POST now always targets the local app). It is left in place —
  harmless, and still what makes a local reseed show up immediately.
- **Fail-closed costs an unusual local setup a `DATABASE_URL` that names a local
  host.** An empty one is refused, but it could not connect anyway. Hosts like
  `host.docker.internal` are refused until someone adds them to `LOCAL_HOSTS`.
- **The guard lives in the scripts, not the seed engine.** Those are the only
  two callers today, and the engine never runs inside Next. If the template's
  `/next/seed` route and its admin "Seed database" button are ever pulled in
  from an upstream sync, they would call the engine from inside the production
  app, where no script guard applies — so an engine-level assert reading
  `payload.db.url` is the next step if that ever becomes a real possibility.
