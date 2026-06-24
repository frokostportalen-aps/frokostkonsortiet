import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenant =
      doc.tenant && typeof doc.tenant === 'object'
        ? doc.tenant
        : doc.tenant
          ? await payload.findByID({ collection: 'tenants', id: doc.tenant, depth: 0 })
          : null

    const tag = tenant?.slug ? `footer_${tenant.slug}` : 'footer'
    payload.logger.info(`Revalidating ${tag}`)
    revalidateTag(tag, 'max')
  }

  return doc
}
