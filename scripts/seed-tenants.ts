import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { seedTenants } from '../src/endpoints/seed/tenants/seed-tenants'

/**
 * Seeds every site with realistic Danish content: tenants + `.localhost`
 * domains, a cross-site menu, a rich front page and an /om-os page per site,
 * news posts, per-tenant imagery, and a super-admin.
 *
 *   pnpm seed:tenants            # uses .env (local docker stack)
 *   pnpm seed:tenants:prod       # uses .env.production (seeds the prod DB)
 *
 * Run the local variant INSIDE the container so fetched media lands in the
 * app's media volume:  docker compose exec app pnpm seed:tenants
 */
const run = async () => {
  // Show which database we're about to seed (credentials stripped) — this is a
  // destructive operation per tenant, so make the target unmistakable.
  const target = (process.env.DATABASE_URL || '(DATABASE_URL not set)').replace(/:\/\/[^@]*@/, '://')
  const payload = await getPayload({ config })
  payload.logger.info(`Seeding → ${target}`)
  await seedTenants(payload)
  payload.logger.info('Done seeding tenants.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
