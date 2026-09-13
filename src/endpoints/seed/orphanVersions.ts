import type { CollectionSlug, Payload } from 'payload'

/**
 * Version rows whose parent document no longer exists.
 *
 * Payload's own delete cascades to versions, so these only appear when a
 * draft-enabled document is removed outside that path — straight in MongoDB,
 * say. See `docs/seeding.md` for what that means in practice.
 */
export type OrphanVersion = {
  collection: CollectionSlug
  id: string
  /** The slug the deleted document had, for reporting. */
  slug: string
}

/** Collections that keep versions, and therefore have a versions table. */
const versionedCollections = (payload: Payload): CollectionSlug[] =>
  Object.values(payload.collections)
    .filter((c) => Boolean(c.config.versions))
    .map((c) => c.config.slug)

export const findOrphanVersions = async (payload: Payload): Promise<OrphanVersion[]> => {
  const orphans: OrphanVersion[] = []

  for (const collection of versionedCollections(payload)) {
    // `select: {}` returns ids only — these documents carry whole lexical
    // layouts, and all we compare against is the id.
    const { docs: liveDocs } = await payload.find({
      collection,
      depth: 0,
      pagination: false,
      select: {},
    })
    const live = liveDocs.map((doc) => String(doc.id))

    // Let the database do the comparison. On a healthy database this matches
    // nothing, so nothing is read, and `$nin` covers a missing parent too.
    // Without the projection each row would carry a full document snapshot,
    // and reading a post version would fire `populateAuthors` — a user lookup
    // per row, for a job that only needs the parent id.
    const { docs: versions } = await payload.findVersions({
      collection,
      depth: 0,
      pagination: false,
      select: { parent: true, version: { slug: true } },
      where: { parent: { not_in: live } },
    })

    for (const version of versions) {
      orphans.push({
        collection,
        id: String(version.id),
        slug: 'slug' in version.version ? (version.version.slug ?? '(uden slug)') : '(uden slug)',
      })
    }
  }

  return orphans
}

/** Delete the given orphans, one bulk call per collection. */
export const deleteOrphanVersions = async (
  payload: Payload,
  orphans: OrphanVersion[],
): Promise<void> => {
  for (const collection of new Set(orphans.map((o) => o.collection))) {
    const ids = orphans.filter((o) => o.collection === collection).map((o) => o.id)
    await payload.db.deleteVersions({ collection, where: { id: { in: ids } } })
  }
}

/** Orphan counts as sorted `collection/slug (n)` lines, for reporting. */
export const summariseOrphans = (orphans: OrphanVersion[]): string[] => {
  const counts = new Map<string, number>()
  for (const o of orphans) {
    const key = `${o.collection}/${o.slug}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts].sort().map(([key, count]) => `${key} (${count})`)
}
