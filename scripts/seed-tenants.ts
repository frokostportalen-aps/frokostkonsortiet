import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { seedTenants, type RevalidateRef } from '../src/endpoints/seed/tenants/seed-tenants'
import { TENANTS } from '../src/endpoints/seed/tenants/data'
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
 * getServerSideURL(): a local run reaches the app inside the container at :3000,
 * prod hits NEXT_PUBLIC_SERVER_URL from .env.production.
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
 *   pnpm seed:tenants                       # additive (default) — local docker stack
 *   pnpm seed:tenants -- --force            # destructive reset — local
 *   pnpm seed:tenants:prod                  # additive — prod DB (.env.production)
 *   pnpm seed:tenants:prod -- --force --yes # destructive reset — prod (deliberate)
 *
 * Additive runs only create what's missing and never touch existing docs, so
 * editor-written content survives. `--force` (alias `--reset`) wipes each
 * tenant's pages/posts/media and rebuilds them from the seed data — against
 * production it additionally requires `--yes` to avoid accidental data loss.
 *
 * Run the local variant INSIDE the container so fetched media lands in the
 * app's media volume:  docker compose exec app pnpm seed:tenants
 */
const args = process.argv.slice(2)
const force = args.includes('--force') || args.includes('--reset')
const confirmed = args.includes('--yes')

const run = async () => {
  // Show which database we're about to seed (credentials stripped) so the target
  // is unmistakable.
  const target = targetLabel()
  const prod = isProduction()
  const mode = force ? 'DESTRUKTIV reset' : 'additiv'

  // Guard: a destructive run against production must be confirmed explicitly.
  if (force && prod && !confirmed) {
    console.error(
      [
        '',
        '⛔  Du er ved at køre en DESTRUKTIV seed (--force) mod PRODUKTION:',
        `      DB:      ${target}`,
        `      Tenants: ${TENANTS.length}`,
        '',
        '    Dette SLETTER alle pages/posts/media pr. tenant og genskaber dem fra',
        '    seed-data — også indhold skrevet af redaktører.',
        '',
        '    Bekræft bevidst med:  pnpm seed:tenants:prod -- --force --yes',
        '',
      ].join('\n'),
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })
  payload.logger.info(`Seeding (${mode}${prod ? ', PRODUKTION' : ''}) → ${target}`)
  const { revalidate, revalidateTags } = await seedTenants(payload, { force })
  payload.logger.info('Done seeding tenants.')
  await revalidateSeeded(revalidate, revalidateTags, (msg) => payload.logger.info(msg))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
