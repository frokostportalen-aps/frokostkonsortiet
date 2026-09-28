import React from 'react'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'
import { GalleryClient } from './Component.client'

type Props = GalleryBlockProps & { tenantSlug?: string }

/**
 * The rail and the lightbox are client-side, but the dialect is resolved here
 * on the server and passed down — for the same reason as the vendekort:
 * `getDialect` reaches the tenant registry, which must not ship to the browser.
 */
export const GalleryBlock: React.FC<Props> = ({ tenantSlug, ...block }) => {
  const { eyebrow } = getDialect(tenantSlug)
  return <GalleryClient {...block} eyebrowStyle={eyebrow} />
}
