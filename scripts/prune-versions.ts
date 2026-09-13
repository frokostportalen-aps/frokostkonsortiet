import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { isProduction, targetLabel } from './seedTarget'

/**
 * Delete version documents whose parent no longer exists — rows left behind in
 * `_<collection>_versions` when a draft-enabled document is removed outside the
 * normal delete path (a manual removal straight in MongoDB, or a delete from a
 * Payload version that did not cascade).
 *
 *   pnpm prune:versions                        # dry run — lists orphans, deletes nothing
 *   pnpm prune:versions -- --apply             # actually delete (local)
 *   pnpm prune:versions:prod -- --apply --yes  # delete against prod (deliberate)
 *
 * Orphans are invisible in the admin panel, since nothing links to a version
 * whose document is gone, so this is housekeeping rather than a fix for
 * anything users can see. It matters when handing a site over: a reset seed is
 * supposed to leave exactly the seed state, and these rows survive it.
 *
 * Safe by design: a version is an orphan only when its `parent` is missing from
 * the live collection. Payload's own delete already cascades, so a healthy
 * database reports nothing — finding rows here means something bypassed it.
 */
const args = process.argv.slice(2)
const apply = args.includes('--apply')
const confirmed = args.includes('--yes')

type Orphan = { collection: string; id: string; parent: string; slug: string }

const run = async () => {
  const payload = await getPayload({ config })
  const prod = isProduction()
  payload.logger.info(`Prune versions → ${targetLabel()}${prod ? ' (PRODUKTION)' : ''}`)

  // Only collections that actually keep versions have a versions table.
  const versioned = Object.values(payload.collections)
    .filter((c) => Boolean(c.config.versions))
    .map((c) => c.config.slug)

  const orphans: Orphan[] = []

  for (const collection of versioned) {
    // 1. Every id that still exists in the collection itself.
    const live = new Set<string>()
    let page = 1
    for (;;) {
      const res = await payload.find({
        collection: collection as never,
        depth: 0,
        limit: 200,
        page,
        pagination: true,
      })
      for (const doc of res.docs) live.add(String((doc as { id: unknown }).id))
      if (!res.hasNextPage) break
      page++
    }

    // 2. Any version pointing at an id that is no longer there.
    page = 1
    for (;;) {
      const res = await payload.findVersions({
        collection: collection as never,
        depth: 0,
        limit: 200,
        page,
        pagination: true,
      })
      for (const version of res.docs) {
        const parent = version.parent ? String(version.parent) : ''
        if (!parent || !live.has(parent)) {
          orphans.push({
            collection,
            id: String(version.id),
            parent: parent || '(ingen)',
            slug: String((version.version as { slug?: unknown })?.slug ?? '(uden slug)'),
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  if (!orphans.length) {
    payload.logger.info('Ingen forældreløse versioner fundet.')
    process.exit(0)
  }

  payload.logger.info(`Fandt ${orphans.length} forældreløse versioner:`)
  // Grouped by slug: one deleted page typically leaves a draft and a published
  // row behind, and listing them separately says less than the count does.
  const bySlug = new Map<string, number>()
  for (const o of orphans) {
    const key = `${o.collection}/${o.slug}`
    bySlug.set(key, (bySlug.get(key) ?? 0) + 1)
  }
  for (const [key, count] of [...bySlug].sort()) {
    payload.logger.info(`  - ${key} (${count})`)
  }

  if (!apply) {
    payload.logger.info('\nTØR kørsel — intet slettet. Kør med --apply for at slette.')
    process.exit(0)
  }
  if (prod && !confirmed) {
    console.error('\n⛔  Sletning mod PRODUKTION kræver bevidst bekræftelse: --apply --yes')
    process.exit(1)
  }

  for (const collection of versioned) {
    const ids = orphans.filter((o) => o.collection === collection).map((o) => o.id)
    if (!ids.length) continue
    await payload.db.deleteVersions({
      collection: collection as never,
      where: { id: { in: ids } },
    })
  }
  payload.logger.info(`\n✓ Slettede ${orphans.length} forældreløse versioner.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
