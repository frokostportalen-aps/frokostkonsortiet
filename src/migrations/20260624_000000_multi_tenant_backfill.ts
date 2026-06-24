import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'

/**
 * Backfills the multi-tenant conversion on a database that predates it:
 *  - ensures a main "Frokost Konsortiet" tenant exists
 *  - assigns every tenant-less document to it
 *  - migrates the old `header`/`footer` globals into per-tenant documents
 *
 * Idempotent: safe to run on a fresh DB (no-ops where there's nothing to move).
 */
// form-submissions are scoped via their parent form, so they get no tenant field.
const TENANT_COLLECTIONS = [
  'pages',
  'posts',
  'categories',
  'media',
  'redirects',
  'forms',
  'search',
] as const

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Ensure the main tenant.
  const existing = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'frokost-konsortiet' } },
    limit: 1,
    pagination: false,
    req,
  })

  const tenant =
    existing.docs[0] ??
    (await payload.create({
      collection: 'tenants',
      data: {
        name: 'Frokost Konsortiet',
        slug: 'frokost-konsortiet',
        isMain: true,
        domains: [{ domain: 'localhost:3000' }],
      },
      context: { disableRevalidate: true },
      req,
    }))

  const tenantID = tenant.id

  // 2. Assign tenant-less documents to the main tenant.
  for (const collection of TENANT_COLLECTIONS) {
    try {
      await payload.update({
        collection,
        where: { tenant: { exists: false } },
        data: { tenant: tenantID },
        overrideAccess: true,
        context: { disableRevalidate: true },
        req,
      })
    } catch (err) {
      payload.logger.warn(`Skipping backfill for ${collection}: ${(err as Error).message}`)
    }
  }

  // 3. Migrate legacy globals → per-tenant header/footer docs.
  const db = payload.db.connection?.db
  for (const slug of ['header', 'footer'] as const) {
    const already = await payload.find({
      collection: slug,
      where: { tenant: { equals: tenantID } },
      limit: 1,
      pagination: false,
      req,
    })
    if (already.docs.length > 0) continue

    let navItems: unknown[] = []
    try {
      const legacy = await db?.collection('globals').findOne({ globalType: slug })
      if (legacy && Array.isArray(legacy.navItems)) navItems = legacy.navItems
    } catch {
      // no legacy globals collection — start empty
    }

    await payload.create({
      collection: slug,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { tenant: tenantID, navItems } as any,
      context: { disableRevalidate: true },
      req,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Non-destructive: leave tenant assignments in place. Remove only the
  // generated header/footer docs for the main tenant.
  const tenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'frokost-konsortiet' } },
    limit: 1,
    pagination: false,
    req,
  })
  const tenantID = tenant.docs[0]?.id
  if (!tenantID) return

  for (const slug of ['header', 'footer'] as const) {
    await payload.delete({
      collection: slug,
      where: { tenant: { equals: tenantID } },
      req,
    })
  }
}
