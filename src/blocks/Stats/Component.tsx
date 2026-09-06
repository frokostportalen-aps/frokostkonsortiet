import React from 'react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

type Props = StatsBlockProps & { tenantSlug?: string }

import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

/**
 * The band's surface. `eco` is the site's climate colour (`--eco`, which falls
 * back to the brand colour when a site hasn't defined one) — for numbers that
 * are about CO2, organics or season rather than about the company. `sand` is
 * the quiet option, for a page that already has a loud band.
 */
// Only `sand` needs its own figure colour: it is a quiet surface, so the brand
// colour is what makes the numbers read. The coloured bands set a foreground
// pair of their own, and the figures follow it — contrast has to come from the
// band's own pair, never from a third token.
const toneClass: Record<'brand' | 'eco' | 'sand', { band: string; value?: string }> = {
  brand: { band: 'bg-primary text-primary-foreground' },
  eco: { band: 'bg-eco text-eco-foreground' },
  sand: { band: 'bg-secondary text-secondary-foreground', value: 'text-primary' },
}

// Match the column count to how many numbers there are, so a row of three
// doesn't leave an empty fourth cell.
const gridForCount: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export const StatsBlock: React.FC<Props> = ({ heading, intro, items, tone }) => {
  if (!items?.length) return null

  const skin = toneClass[tone ?? 'brand']

  const cols = gridForCount[items.length] ?? 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div className="container">
      {/* A full-strength band: the numbers become a colour statement rather
          than another pale panel. */}
      <div className={cn('rounded-band px-6 py-10 md:px-12 md:py-14', skin.band)}>
        <SectionHeader heading={heading} intro={intro} muted={false} />
        <dl className={cn('grid grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-0', cols)}>
          {items.map((item, i) => (
            <div
              key={i}
              // Hairline dividers only where the numbers actually sit side by
              // side in one row; at narrower widths the gap does that job, and
              // a rule in the middle of a wrapped grid reads as an error.
              className={cn(
                'flex flex-col items-center px-6 text-center',
                i > 0 && 'lg:border-l lg:border-current/20',
              )}
            >
              {/* Numerals in the heading face: a serif tenant gets elegant
                  figures, a sans tenant gets confident ones — for free. */}
              <dt
                className={cn(
                  'font-heading text-4xl leading-none tracking-tight md:text-5xl',
                  skin.value,
                )}
              >
                {item.value}
              </dt>
              {/* Spaced capitals, the same small-label voice as the icon row.
                  The measure keeps the row even: every label wraps at the same
                  character count, so two of them can't break in different
                  places. (Why `label` is tighter than `eyebrow`: see the token
                  in globals.css.) */}
              <dd className="mt-4 max-w-[32ch] text-xs font-semibold uppercase leading-[1.5] tracking-label opacity-75">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
