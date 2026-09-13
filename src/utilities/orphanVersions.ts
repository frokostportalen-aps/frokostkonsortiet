import type { Payload } from 'payload'

/**
 * Version rows whose parent document no longer exists.
 *
 * Payload's own delete cascades to versions, so a healthy database has none.
 * They turn up when a draft-enabled document is removed outside that path —
 * straight in MongoDB, say. Nothing links to a version whose document is gone,
 * so they are invisible in the admin panel; they matter because a `--force`
 * reseed is supposed to leave exactly the seed state, and rows like these would
 * otherwise outlive the reset that every other document goes through.
 *
 * Used by the seed's reset and by `scripts/prune-versions.ts`, so the two can
 * never disagree about what counts as an orphan.
 */
export type OrphanVersion = {
  collection: string
  id: string
  /** The slug the deleted document had, for reporting. */
  slug: string
}

/** Collections that keep versions, and therefore have a versions table. */
const versionedCollections = (payload: Payload): string[] =>
  Object.values(payload.collections)
    .filter((c) => Boolean(c.config.versions))
    .map((c) => c.config.slug)

export const findOrphanVersions = async (payload: Payload): Promise<OrphanVersion[]> => {
  const orphans: OrphanVersion[] = []

  for (const collection of versionedCollections(payload)) {
    // Every id still present in the collection itself.
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

    // Any version pointing at an id that is no longer among them.
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
            slug: String((version.version as { slug?: unknown })?.slug ?? '(uden slug)'),
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  return orphans
}

/** Delete the given orphans, one bulk call per collection. */
export const deleteOrphanVersions = async (
  payload: Payload,
  orphans: OrphanVersion[],
): Promise<void> => {
  const byCollection = new Map<string, string[]>()
  for (const o of orphans) {
    const ids = byCollection.get(o.collection) ?? []
    ids.push(o.id)
    byCollection.set(o.collection, ids)
  }
  for (const [collection, ids] of byCollection) {
    await payload.db.deleteVersions({
      collection: collection as never,
      where: { id: { in: ids } },
    })
  }
}

/** Orphan counts keyed by `collection/slug`, for readable reporting. */
export const countBySlug = (orphans: OrphanVersion[]): Map<string, number> => {
  const counts = new Map<string, number>()
  for (const o of orphans) {
    const key = `${o.collection}/${o.slug}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}
