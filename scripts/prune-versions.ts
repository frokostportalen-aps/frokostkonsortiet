import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import {
  deleteOrphanVersions,
  findOrphanVersions,
  summariseOrphans,
} from '../src/endpoints/seed/orphanVersions'
import { isProduction, targetLabel } from './seedTarget'

/**
 * Report (and optionally delete) version rows whose parent document is gone.
 *
 *   pnpm prune:versions                        # dry run — lists orphans, deletes nothing
 *   pnpm prune:versions -- --apply             # actually delete (local)
 *   pnpm prune:versions:prod -- --apply --yes  # delete against prod (deliberate)
 *
 * A `--force` reseed clears these on its own, so this is not a step anyone has
 * to remember. It earns its place as the read-only way to ask the question —
 * see `docs/seeding.md` for what an answer other than "none" means.
 */
const args = process.argv.slice(2)
const apply = args.includes('--apply')
const confirmed = args.includes('--yes')

const run = async () => {
  const payload = await getPayload({ config })
  const prod = isProduction()
  payload.logger.info(`Prune versions → ${targetLabel()}${prod ? ' (PRODUKTION)' : ''}`)

  const orphans = await findOrphanVersions(payload)

  if (!orphans.length) {
    payload.logger.info('Ingen forældreløse versioner fundet.')
    process.exit(0)
  }

  payload.logger.info(`Fandt ${orphans.length} forældreløse versioner:`)
  for (const line of summariseOrphans(orphans)) payload.logger.info(`  - ${line}`)

  if (!apply) {
    payload.logger.info('\nTØR kørsel — intet slettet. Kør med --apply for at slette.')
    process.exit(0)
  }
  if (prod && !confirmed) {
    console.error('\n⛔  Sletning mod PRODUKTION kræver bevidst bekræftelse: --apply --yes')
    process.exit(1)
  }

  await deleteOrphanVersions(payload, orphans)
  payload.logger.info(`\n✓ Slettede ${orphans.length} forældreløse versioner.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
