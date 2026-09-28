import React from 'react'

import type { FlipCardsBlock as FlipCardsBlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'
import { FlipCardsClient } from './Component.client'

type Props = FlipCardsBlockProps & { tenantSlug?: string }

/**
 * The cards turn on hover and press, so the block itself is a client
 * component — but the dialect is resolved here, on the server, and passed
 * down. `getDialect` reaches the tenant registry, and importing it from a
 * `'use client'` module would ship every site's palette to the browser of any
 * page holding a card row. The plan picker draws the boundary the same way.
 */
export const FlipCardsBlock: React.FC<Props> = ({ tenantSlug, ...block }) => {
  const { eyebrow } = getDialect(tenantSlug)
  return <FlipCardsClient {...block} eyebrowStyle={eyebrow} />
}
