import React from 'react'

import type { TimelineBlock as Props } from '@/payload-types'

export const TimelineBlock: React.FC<Props> = ({ heading, intro, items }) => {
  if (!items?.length) return null

  return (
    <div className="container">
      {(heading || intro) && (
        <div className="mb-12 max-w-2xl">
          {heading && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
          )}
          {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
        </div>
      )}

      {/* A single vertical rail down the left with a dot per milestone. The rail
          is drawn on the <ol> as a left border; each <li> hangs its dot on top
          of it. Theme tokens (primary/border) keep it on-brand per tenant. */}
      <ol className="relative ml-3 border-l-2 border-border">
        {items.map((item, i) => (
          <li key={i} className="relative ml-8 pb-12 last:pb-0">
            {/* Dot sitting on the rail. */}
            <span
              aria-hidden
              className="absolute -left-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background"
            />
            <div className="text-sm font-semibold uppercase tracking-wide text-primary">
              {item.year}
            </div>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
