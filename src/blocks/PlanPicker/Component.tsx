import React from 'react'

import type { PlanPickerBlock as PlanPickerBlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'
import { PlanPickerClient } from './Component.client'

type Props = PlanPickerBlockProps & { tenantSlug?: string }

/**
 * The quote wizard is interactive, so the block itself is a client component —
 * but the dialect is resolved here, on the server, and passed down.
 *
 * `getDialect` imports the tenant registry, and importing it from inside a
 * `'use client'` module pulls the whole thing — every site's palette, every
 * header CTA — into the browser bundle of any page holding a plan picker. The
 * heroes and the header already draw the boundary this way for the same reason.
 */
export const PlanPickerBlock: React.FC<Props> = ({ tenantSlug, ...block }) => {
  const { signature, eyebrow } = getDialect(tenantSlug)
  return <PlanPickerClient {...block} signature={signature} eyebrow={eyebrow} />
}
