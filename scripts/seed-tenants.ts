import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { seedTenants } from '../src/endpoints/seed/tenants/seed-tenants'

/**
 * Seeds every site with realistic Danish content: tenants + `.localhost`
 * domains, a cross-site menu, a rich front page and an /om-os page per site,
 * news posts, per-tenant imagery, and a super-admin.
 *
 *   pnpm seed:tenants
 *
 * Run it INSIDE the container so the fetched media lands in the app's media
 * volume:  docker compose exec app pnpm seed:tenants
 */
const run = async () => {
  const payload = await getPayload({ config })
  await seedTenants(payload)
  payload.logger.info('Done seeding tenants.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
