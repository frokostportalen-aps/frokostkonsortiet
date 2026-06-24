# Local development

Frokost Konsortiet runs **multiple sites from one Payload instance** — the main
site plus per-kitchen sites (smagssans, frajorden, …), each on its own domain.
This guide covers running it locally, including how to exercise the multi-tenant
routing. For the architecture and the why, see
[ADR 0001](adr/0001-multi-tenant-from-single-payload.md).

## Prerequisites

- **Node** `^18.20.2 || >=20.9.0` and **pnpm** `^9 || ^10` (pinned via the
  `packageManager` field — use `corepack enable` to get the right version)
- **MongoDB** (or use the Docker option below, which includes it)
- A `.env` file (copy from `.env.example`):

  ```bash
  cp .env.example .env
  ```

  Required keys: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`,
  `PREVIEW_SECRET`, `CRON_SECRET`. Multi-tenant adds:

  | Variable | Purpose |
  | --- | --- |
  | `TENANT_ORIGINS` | Comma-separated list of every site origin. Feeds Payload CORS and `next/image` remote patterns. |
  | `INTERNAL_URL` | Optional. Stable origin the proxy uses to fetch the domain→tenant map (set in Docker; falls back to the request URL otherwise). |

---

## Option A — Docker (recommended for multi-tenant testing)

Works out of the box with **OrbStack** or Docker Desktop. Dependencies install
inside the image (`Dockerfile.dev`), and only `./src` is bind-mounted for live
reload, so nothing is written back into your working tree.

```bash
docker compose up --build                   # first run (build), then just `up`
docker compose exec app pnpm seed:tenants   # seed tenants + admin (idempotent)
```

Then open these — browsers and OrbStack resolve `*.localhost` to `127.0.0.1`
automatically, so **no `/etc/hosts` edits needed**:

| URL | Site |
| --- | --- |
| http://frokostkonsortiet.localhost:3000 | Frokost Konsortiet (main / aggregator) |
| http://smagssans.localhost:3000 | Smagssans kitchen |
| http://frajorden.localhost:3000 | Fra Jorden kitchen |
| http://localhost:3000/admin | Shared Payload admin |

Seed creates a super-admin: **`admin@example.com` / `password`**.

Lifecycle:

```bash
docker compose logs -f app    # tail app logs
docker compose down           # stop (keeps DB + uploads)
docker compose down -v        # stop and wipe DB + uploaded media
```

Rebuild the image after changing dependencies, `Dockerfile.dev`, or files
outside `./src` (e.g. `next.config.ts`): `docker compose up --build`.

---

## Option B — Native (Node on your machine)

```bash
corepack enable                # ensures the pinned pnpm version
pnpm install
pnpm dev                       # http://localhost:3000
```

You need a MongoDB reachable at the `DATABASE_URL` in `.env`. To test multiple
sites without Docker, either run the seed and add `127.0.0.1` aliases, or rely
on `*.localhost` resolving to loopback:

```bash
pnpm seed:tenants              # seed tenants + admin against your local DB
```

Visit http://smagssans.localhost:3000, etc. (most browsers resolve `*.localhost`
to `127.0.0.1`). If a hostname doesn't resolve, add it to `/etc/hosts`:

```
127.0.0.1 frokostkonsortiet.localhost smagssans.localhost frajorden.localhost
```

---

## How multi-tenant routing works locally

1. A request arrives with a `Host` header (e.g. `smagssans.localhost:3000`).
2. `src/proxy.ts` looks the host up in the cached `/api/tenant-domains` map and
   rewrites the request to an internal `/{tenantSlug}/...` path.
3. The `app/(frontend)/[tenant]/...` routes render that site's content; the main
   tenant (`isMain`) aggregates posts across all kitchens.

The host→tenant mapping is **editable in the admin** (the `domains` array on each
tenant in the *Tenants* collection) — changes take effect without a restart.

---

## Adding or changing sites

1. Admin → **Tenants** → create a tenant, set its `slug` and `domains[]` (add
   `<name>.localhost` for local testing), and `isMain` for the main site.
2. Add the new origin to `TENANT_ORIGINS` (and restart, since it's read at boot).
3. Create that tenant's Header/Footer and pages in the admin, or extend
   `scripts/seed-tenants.ts`.

---

## Common commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run the app (Next dev + Payload admin) |
| `pnpm seed:tenants` | Seed tenants, header/footer, sample pages, super-admin |
| `pnpm payload migrate` | Run DB migrations (e.g. backfill tenant on existing data) |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` |
| `pnpm generate:importmap` | Regenerate the admin import map |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |

---

## Troubleshooting

**`ERR_PNPM_UNSUPPORTED_ENGINE` / pnpm version mismatch.** Run `corepack enable`
so the pinned `packageManager` version (pnpm 10.x) is used instead of a globally
installed newer one.

**`ERR_PNPM_ENOMEM` during install in Docker.** Caused by installing into a bind
mount where the pnpm store and `node_modules` are on different filesystems
(forcing copies). The provided `Dockerfile.dev` installs deps in an image layer
to avoid this — make sure you're building with it (`docker compose up --build`),
not running `pnpm install` against a mounted repo.

**A site shows the wrong content / 404.** Check `curl http://localhost:3000/api/tenant-domains`
returns your host in the map. If not, verify the tenant's `domains[]` in the
admin (hosts are matched lowercased, without port, `www.` stripped).

**Live preview.** Preview runs on the admin origin (`localhost:3000`) because
draft cookies don't cross root domains — this is expected.

**Edits to `next.config.ts` / `package.json` don't reload in Docker.** Only
`./src` is bind-mounted. Rebuild: `docker compose up --build`.
