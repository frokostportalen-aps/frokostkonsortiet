import React from 'react'

import type { EyebrowStyle } from '@/themes/dialect'
import { cn } from '@/utilities/ui'

/**
 * A small label that sits above a heading ("eyebrow"). Its casing is part of a
 * site's personality, so the style comes from the tenant's design tokens:
 * small-caps reads editorial, uppercase reads structural, plain reads quiet.
 */
const styleClass: Record<EyebrowStyle, string> = {
  smallcaps: 'text-sm [font-variant:small-caps] tracking-[0.08em]',
  uppercase: 'text-xs uppercase tracking-[0.18em]',
  plain: 'text-xs tracking-wide',
}

export const Eyebrow: React.FC<{
  children: React.ReactNode
  style?: EyebrowStyle
  /** Draw a short brand-colour rule before the label (the editorial marker). */
  withRule?: boolean
  className?: string
}> = ({ children, style = 'uppercase', withRule = false, className }) => (
  <p
    className={cn(
      'flex items-center gap-3 font-semibold text-primary',
      styleClass[style],
      className,
    )}
  >
    {withRule && <span aria-hidden className="h-px w-8 shrink-0 bg-primary/70" />}
    <span>{children}</span>
  </p>
)
