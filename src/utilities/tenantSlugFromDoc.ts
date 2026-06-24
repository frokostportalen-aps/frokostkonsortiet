import type { BasePayload } from 'payload'

/**
 * Resolves the tenant slug for a document whose `tenant` field may be either a
 * populated tenant object (depth ≥ 1) or just an ID (depth 0). Used by
 * revalidation hooks to build per-tenant cache tags and paths.
 */
export async function tenantSlugFromDoc(
  payload: BasePayload,
  tenant: unknown,
): Promise<string | null> {
  if (!tenant) return null
  if (typeof tenant === 'object' && 'slug' in tenant) {
    return (tenant as { slug?: string }).slug ?? null
  }
  const doc = await payload.findByID({
    collection: 'tenants',
    id: tenant as string,
    depth: 0,
  })
  return doc?.slug ?? null
}
