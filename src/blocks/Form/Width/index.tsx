import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  // flex-basis (not max-width) so half-width fields pair up on one row inside
  // the form's flex-wrap container — but only from `sm:`; on phones every
  // field takes the full line. `- 0.5rem` compensates the row gap.
  return (
    <div
      className={cn('grow basis-full sm:basis-[calc(var(--field-width)-0.5rem)]', className)}
      style={{ '--field-width': `${width || 100}%` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
