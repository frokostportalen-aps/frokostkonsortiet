import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { seedTenants, type RevalidateRef } from '../src/endpoints/seed/tenants/seed-tenants'
import { getServerSideURL } from '../src/utilities/getURL'
import { isProduction, targetLabel } from './seedTarget'

/**
 * Seeding runs outside Next.js, so the afterChange hooks that normally purge the
 * ISR cache can't fire (we seed with `context.disableRevalidate`). Instead we
 * POST the touched docs to the running app's `/next/revalidate` endpoint so the
 * new content shows immediately rather than after the `revalidate = 600` window.
 *
 * No-op (with a hint) when REVALIDATE_SECRET is unset — the seed still succeeds;
 * pages just refresh on the next ISR cycle. The target URL comes from
 * getServerSideURL(), which for a seed run is always the local app (the seed
 * only ever runs against a local database — see the guard below).
 */
const revalidateSeeded = async (
  items: RevalidateRef[],
  tags: string[],
  log: (msg: string) => void,
): Promise<void> => {
  if (items.length === 0 && tags.length === 0) return
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    log(
      'Springer revalidering over (REVALIDATE_SECRET mangler) — sider opdateres inden for revalidate-vinduet.',
    )
    return
  }
  const base = getServerSideURL()
  try {
    const res = await fetch(new URL('/next/revalidate', base), {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-secret': secret },
      body: JSON.stringify({ items, tags }),
    })
    if (!res.ok) {
      log(
        `Revalidering fejlede (HTTP ${res.status}) — sider opdateres inden for revalidate-vinduet.`,
      )
      return
    }
    const { revalidated } = (await res.json()) as { revalidated: number }
    log(`✓ Revaliderede ${revalidated} stier/tags via ${base}`)
  } catch (err) {
    log(
      `Revalidering kunne ikke nå ${base} (${(err as Error).message}) — sider opdateres inden for revalidate-vinduet.`,
    )
  }
}

/**
 * Seeds every site with realistic Danish content: tenants + `.localhost`
 * domains, a cross-site menu, a rich front page and an /om-os page per site,
 * news posts, per-tenant imagery, and a super-admin.
 *
 *   pnpm seed:tenants              # additive (default) — local docker stack
 *   pnpm seed:tenants -- --force   # destructive reset — local
 *
 * LOCAL ONLY. Production content belongs to the editors who write it, so the
 * seed refuses to run against a non-local database at all — see the guard in
 * run() below. Content for the live sites is written in the admin panel.
 *
 * Additive runs only create what's missing and never touch existing docs.
 * `--force` (alias `--reset`) wipes each tenant's pages/posts/media and
 * rebuilds them from the seed data.
 *
 * Run it INSIDE the container so fetched media lands in the app's media
 * volume:  docker compose exec app pnpm seed:tenants
 */
const args = process.argv.slice(2)
const force = args.includes('--force') || args.includes('--reset')

const run = async () => {
  // Show which database we're about to seed (credentials stripped) so the target
  // is unmistakable.
  const target = targetLabel()
  const mode = force ? 'DESTRUKTIV reset' : 'additiv'

  // Guard: the seed is a local-only tool. Editors own the content on the live
  // sites, and even an additive run would recreate pages they deleted — so any
  // non-local database is refused, whatever the flags say. The check reads
  // DATABASE_URL, so a hand-set DOTENV_CONFIG_PATH is caught too.
  if (isProduction()) {
    console.error(
      [
        '',
        '⛔  Seed afvist: målet er ikke en lokal database.',
        `      DB: ${target}`,
        '',
        '    Seeden må kun køre mod en lokal database. Indholdet på de live sites',
        '    er skrevet af redaktører og må ikke overskrives af seed-data.',
        '',
        '    Skal der nyt indhold på et live site, laves det i admin-panelet.',
        '',
      ].join('\n'),
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })
  payload.logger.info(`Seeding (${mode}) → ${target}`)
  const { revalidate, revalidateTags } = await seedTenants(payload, { force })
  payload.logger.info('Done seeding tenants.')
  await revalidateSeeded(revalidate, revalidateTags, (msg) => payload.logger.info(msg))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
