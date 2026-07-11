import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

// Match the column count to how many numbers there are, so a row of three
// doesn't leave an empty fourth cell.
const gridForCount: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export const StatsBlock: React.FC<Props> = ({ heading, intro, items }) => {
  if (!items?.length) return null

  const cols = gridForCount[items.length] ?? 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div className="container">
      {/* Full-strength primary band: the numbers become the page's one bold
          colour statement instead of another pale panel. Values pick up the
          accent so the band is two-tone in the tenant's own pair. */}
      <div className="rounded-[calc(var(--radius)*1.5)] bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
        <SectionHeader heading={heading} intro={intro} tone="onPrimary" className="mb-12" />
        <dl className={`grid grid-cols-1 gap-y-10 gap-x-8 ${cols}`}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Numerals in the heading face: a serif tenant gets elegant
                  figures, a sans tenant gets confident ones — for free. */}
              <dt className="font-heading text-5xl leading-none tracking-tight text-accent md:text-6xl">
                {item.value}
              </dt>
              <dd className="mt-4 max-w-[16rem] text-sm font-medium leading-snug text-primary-foreground/80 md:text-base">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
