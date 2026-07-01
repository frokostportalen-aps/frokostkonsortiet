import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { tenantSlugFromDoc } from '../../../utilities/tenantSlugFromDoc'

export const postPath = (tenantSlug: string, slug?: string | null) => `/${tenantSlug}/posts/${slug}`

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc.tenant)

    if (tenantSlug && doc._status === 'published') {
      const path = postPath(tenantSlug, doc.slug)
      payload.logger.info(`Revalidating post at path: ${path}`)
      revalidatePath(path)
      revalidateTag(`posts-sitemap-${tenantSlug}`, 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (tenantSlug && previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = postPath(tenantSlug, previousDoc.slug)
      payload.logger.info(`Revalidating old post at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag(`posts-sitemap-${tenantSlug}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantSlug = await tenantSlugFromDoc(payload, doc?.tenant)
    if (tenantSlug) {
      revalidatePath(postPath(tenantSlug, doc?.slug))
      revalidateTag(`posts-sitemap-${tenantSlug}`, 'max')
    }
  }

  return doc
}
