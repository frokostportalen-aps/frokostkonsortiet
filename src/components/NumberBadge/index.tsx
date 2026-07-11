import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The family's numbered-circle marker (step numbers, question numbers) — one
 * definition of the badge treatment instead of a copy per block. Size and
 * tone overrides go through `className` (cn merges them over the defaults).
 */
export const NumberBadge: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <span
    aria-hidden
    className={cn(
      'font-heading flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground',
      className,
    )}
  >
    {children}
  </span>
)
