import React from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'
import { TestimonialsCarousel } from './Carousel.client'
import { TestimonialsMarquee } from './Marquee'

type Props = TestimonialsBlockProps & { tenantSlug?: string }

/**
 * Customer quotes, in the layout the site's dialect asks for — a band of cards
 * that scrolls on its own (`marquee`, the family default) or a rail of cards
 * stepped by hand (`carousel`). The two are different answers to how a site
 * presents its references: see `TestimonialsVariant`.
 *
 * The empty check lives here rather than in each variant, so neither layout has
 * to treat "no quotes" as a state it can be in.
 *
 * The dialect is resolved here, on the server, and only the chosen layout is
 * rendered. `getDialect` reaches the tenant registry, so importing it from
 * inside the carousel's `'use client'` module would ship every site's palette
 * to the browser — the plan picker and the heroes draw the boundary the same
 * way, for the same reason.
 */
export const TestimonialsBlock: React.FC<Props> = ({ tenantSlug, ...block }) => {
  const { testimonials } = getDialect(tenantSlug)
  const { items } = block
  if (!items?.length) return null

  return testimonials === 'carousel' ? (
    <TestimonialsCarousel {...block} items={items} />
  ) : (
    <TestimonialsMarquee {...block} items={items} />
  )
}
