import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

import { isProduction, targetLabel } from './seedTarget'

/**
 * Delete media that no document references — orphans left behind when an image
 * is renamed/removed from a tenant's images/ folder, or when an editor deletes a
 * page that owned an upload. Deleting a media doc also removes its file from
 * Cloudflare R2 via the s3Storage adapter.
 *
 *   pnpm prune:media               # dry run — lists orphans, deletes nothing
 *   pnpm prune:media -- --apply    # actually delete (local)
 *   pnpm prune:media:prod -- --apply --yes   # delete against prod (deliberate)
 *
 * Safe by design: a media is an orphan only if its id appears in NO other
 * document. We collect every ObjectId referenced anywhere (page layouts, rich
 * text, navs, …) and keep any media whose id is among them.
 */
const args = process.argv.slice(2)
const apply = args.includes('--apply')
const confirmed = args.includes('--yes')

const OBJECT_ID = /[0-9a-f]{24}/g

const run = async () => {
  const payload = await getPayload({ config })
  const prod = isProduction()
  payload.logger.info(`Prune media → ${targetLabel()}${prod ? ' (PRODUKTION)' : ''}`)

  // 1. Collect every ObjectId referenced anywhere except the media collection.
  //    Over-collecting non-media ids is harmless — it only keeps more media.
  const referenced = new Set<string>()
  const slugs = Object.keys(payload.collections).filter((s) => s !== 'media')
  for (const slug of slugs) {
    let page = 1
    // Some internal collections may not be queryable; skip those quietly.
    try {
      for (;;) {
        const res = await payload.find({
          collection: slug as never,
          depth: 0,
          limit: 200,
          page,
          pagination: true,
        })
        for (const doc of res.docs) {
          const ids = JSON.stringify(doc).match(OBJECT_ID)
          if (ids) for (const id of ids) referenced.add(id)
        }
        if (!res.hasNextPage) break
        page++
      }
    } catch {
      // not queryable — ignore
    }
  }

  // 2. Find media whose id is referenced nowhere.
  const orphans: { id: string; filename: string }[] = []
  let page = 1
  for (;;) {
    const res = await payload.find({ collection: 'media', depth: 0, limit: 200, page, pagination: true })
    for (const doc of res.docs) {
      const id = String(doc.id)
      if (!referenced.has(id)) orphans.push({ id, filename: (doc as { filename?: string }).filename ?? id })
    }
    if (!res.hasNextPage) break
    page++
  }

  if (!orphans.length) {
    payload.logger.info('Ingen ubrugte billeder fundet.')
    process.exit(0)
  }
  payload.logger.info(`Fandt ${orphans.length} ubrugte billeder:`)
  for (const o of orphans) payload.logger.info(`  - ${o.filename} (${o.id})`)

  if (!apply) {
    payload.logger.info('\nTØR kørsel — intet slettet. Kør med --apply for at slette (også fra R2).')
    process.exit(0)
  }
  if (prod && !confirmed) {
    console.error('\n⛔  Sletning mod PRODUKTION kræver bevidst bekræftelse: --apply --yes')
    process.exit(1)
  }

  for (const o of orphans) {
    await payload.delete({ collection: 'media', id: o.id })
  }
  payload.logger.info(`\n✓ Slettede ${orphans.length} ubrugte billeder (også fra R2).`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
