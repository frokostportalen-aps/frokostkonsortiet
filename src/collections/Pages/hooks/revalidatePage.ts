import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { tenantSlugFromDoc } from '../../../utilities/tenantSlugFromDoc'

const pagePath = (tenantSlug: string, slug?: string | null) =>
  slug === 'home' ? `/${tenantSlug}` : `/${tenantSlug}/${slug}`

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc.tenant)

    if (tenantSlug && doc._status === 'published') {
      const path = pagePath(tenantSlug, doc.slug)
      payload.logger.info(`Revalidating page at path: ${path}`)
      revalidatePath(path)
      revalidateTag(`pages-sitemap-${tenantSlug}`, 'max')
    }

    // If the page was previously published, we need to revalidate the old path
    if (tenantSlug && previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = pagePath(tenantSlug, previousDoc.slug)
      payload.logger.info(`Revalidating old page at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag(`pages-sitemap-${tenantSlug}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc?.tenant)
    if (tenantSlug) {
      revalidatePath(pagePath(tenantSlug, doc?.slug))
      revalidateTag(`pages-sitemap-${tenantSlug}`, 'max')
    }
  }

  return doc
}
