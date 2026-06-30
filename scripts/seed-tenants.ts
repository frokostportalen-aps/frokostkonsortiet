import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { seedTenants } from '../src/endpoints/seed/tenants/seed-tenants'
import { TENANTS } from '../src/endpoints/seed/tenants/data'
import { isProduction, targetLabel } from './seedTarget'

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
  await seedTenants(payload, { force })
  payload.logger.info('Done seeding tenants.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
