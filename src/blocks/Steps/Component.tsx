import React from 'react'

import type { StepsBlock as StepsBlockProps } from '@/payload-types'

import { NumberBadge } from '@/components/NumberBadge'
import { SectionHeader } from '@/components/SectionHeader'

const colsForCount: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
}

/**
 * A numbered process ("I ringer → vi smager til → frokosten lander"). The
 * numbering is earned here — the content really is a sequence — and the badge
 * + connector carry the tenant's primary colour.
 */
export const StepsBlock: React.FC<StepsBlockProps> = ({ heading, intro, items }) => {
  if (!items?.length) return null

  const cols = colsForCount[items.length] ?? 'sm:grid-cols-3'

  return (
    <div className="container">
      <SectionHeader heading={heading} intro={intro} className="mb-12" />

      <ol className={`grid gap-x-8 gap-y-10 ${cols}`}>
        {items.map((step, i) => (
          <li key={i} className="flex flex-col">
            <div className="flex items-center gap-4">
              <NumberBadge className="size-11 text-lg">{i + 1}</NumberBadge>
              {/* The connector — the thread that carries the eye to the next
                  step; the last step lets it run off unfinished. */}
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug">{step.title}</h3>
            {step.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
