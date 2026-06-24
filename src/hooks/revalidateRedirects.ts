import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { tenantSlugFromDoc } from '../utilities/tenantSlugFromDoc'

export const revalidateRedirects: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc?.tenant)
    const tag = tenantSlug ? `redirects_${tenantSlug}` : 'redirects_all'
    payload.logger.info(`Revalidating ${tag}`)
    revalidateTag(tag, 'max')
  }

  return doc
}
