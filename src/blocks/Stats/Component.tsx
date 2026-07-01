import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'

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
      {/* Tinted band so the numbers read as one confident statement rather than
          floating loose on the page. Theme tokens (accent/primary) make it pick
          up each tenant's palette automatically. */}
      <div className="rounded-[var(--radius)] bg-accent px-6 py-12 text-accent-foreground md:px-12 md:py-16">
        {(heading || intro) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
            )}
            {intro && <p className="mx-auto mt-3 max-w-2xl opacity-80">{intro}</p>}
          </div>
        )}
        <dl className={`grid grid-cols-1 gap-y-10 gap-x-8 ${cols}`}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Numerals in the heading face: a serif tenant gets elegant
                  figures, a sans tenant gets confident ones — for free. */}
              <dt
                style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}
                className="text-5xl leading-none tracking-tight text-primary md:text-6xl"
              >
                {item.value}
              </dt>
              <dd className="mt-4 max-w-[16rem] text-sm font-medium leading-snug opacity-80 md:text-base">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
