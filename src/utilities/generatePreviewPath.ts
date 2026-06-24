import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  tenantSlug?: string | null
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, tenantSlug }: Props) => {
  if (slug === undefined || slug === null || !tenantSlug) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  // Preview stays same-origin (the admin domain) but the path is tenant-scoped
  // so it renders against the correct site's [tenant] route tree.
  const encodedParams = new URLSearchParams({
    path: `/${tenantSlug}${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
