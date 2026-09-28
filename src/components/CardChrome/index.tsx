import React from 'react'
import type { LucideIcon } from 'lucide-react'

import type { EyebrowStyle } from '@/themes/dialect'

import { Eyebrow } from '@/components/Eyebrow'
import { cn } from '@/utilities/ui'

/**
 * The pieces a card in a row is drawn from — the vendekort's front and the
 * gallery's pictures share them, so the two stay one look when either is tuned.
 */

/**
 * The card label: the site's own small-caps/uppercase/plain voice, like every
 * other label on the page — but it sits on a coloured surface, so it inherits
 * that surface's text colour instead of the eyebrow's brand colour.
 */
export const CardLabel: React.FC<{ children: React.ReactNode; eyebrowStyle?: EyebrowStyle }> = ({
  children,
  eyebrowStyle,
}) => (
  <Eyebrow className="justify-center text-current" style={eyebrowStyle}>
    {children}
  </Eyebrow>
)

/** The coloured band under a card's photo, holding its label. */
export const CardBand: React.FC<{
  children: React.ReactNode
  eyebrowStyle?: EyebrowStyle
  tone: string
}> = ({ children, eyebrowStyle, tone }) => (
  <div className={cn('flex flex-1 items-center justify-center px-4 py-5', tone)}>
    <CardLabel eyebrowStyle={eyebrowStyle}>{children}</CardLabel>
  </div>
)

/** The round mark in the corner that says what a press does (turn, enlarge). */
export const CardBadge: React.FC<{ icon: LucideIcon }> = ({ icon: Icon }) => (
  <span
    aria-hidden
    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition group-hover:bg-background"
  >
    <Icon className="size-4" strokeWidth={1.75} />
  </span>
)

/** The one control laid over a whole card — the press target, and the only
 *  thing on the card a keyboard has to reach. */
export const CARD_PRESS =
  'absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring'
