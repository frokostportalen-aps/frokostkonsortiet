import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The shared centred section header (heading + optional intro) used by the
 * band-style blocks — one place to tune the section type scale instead of a
 * copy per block.
 */
export const SectionHeader: React.FC<{
  heading?: string | null
  intro?: string | null
  /** 'onPrimary' renders on a primary-coloured band (e.g. the stats block). */
  tone?: 'default' | 'onPrimary'
  className?: string
}> = ({ heading, intro, tone = 'default', className }) => {
  if (!heading && !intro) return null

  return (
    <div className={cn('text-center', className)}>
      {heading && (
        <h2
          className={cn(
            'text-3xl font-semibold tracking-tight md:text-4xl',
            tone === 'onPrimary' && 'text-primary-foreground',
          )}
        >
          {heading}
        </h2>
      )}
      {intro && (
        <p
          className={cn(
            'mx-auto mt-3 max-w-2xl',
            tone === 'onPrimary' ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
