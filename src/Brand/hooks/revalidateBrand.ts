import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { tenantSlugFromDoc } from '@/utilities/tenantSlugFromDoc'

/**
 * Bust the per-tenant brand cache when a site's logo/favicon changes, so the
 * new asset shows immediately. Mirrors `revalidateHeader`.
 */
export const revalidateBrand: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc.tenant)
    const tag = tenantSlug ? `brand_${tenantSlug}` : 'brand'
    payload.logger.info(`Revalidating ${tag}`)
    revalidateTag(tag, 'max')
  }

  return doc
}
