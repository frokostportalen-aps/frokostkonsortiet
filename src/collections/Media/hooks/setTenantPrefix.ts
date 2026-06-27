import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Store each tenant's media under its own folder in the storage bucket by
 * setting the cloud-storage `prefix` field to the tenant's slug. The S3 adapter
 * builds the object key as `<prefix>/<filename>`, so files land in
 * `frokost-konsortiet/…`, `smagssans/…`, etc. instead of one shared root.
 *
 * Ownership and access are still governed by the `tenant` field — this only
 * affects the physical object layout in the bucket.
 */
export const setTenantPrefix: CollectionBeforeChangeHook = async ({ data, req }) => {
  const tenant = data?.tenant
  if (!tenant) return data

  let slug: string | undefined
  if (typeof tenant === 'object') {
    slug = (tenant as { slug?: string }).slug
  } else {
    const doc = await req.payload.findByID({
      collection: 'tenants',
      id: tenant,
      depth: 0,
      req,
    })
    slug = doc?.slug ?? undefined
  }

  if (slug) data.prefix = slug
  return data
}
