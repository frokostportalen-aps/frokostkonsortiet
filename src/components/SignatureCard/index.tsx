import React from 'react'

import type { Signature } from '@/themes/tenantThemes'
import { cn } from '@/utilities/ui'

/**
 * A content card whose treatment carries the tenant's signature motif, so the
 * same grid of cards reads materially different per site while staying one
 * family:
 *   • rule  – hairline border + a short brand rule above the content (airy, editorial)
 *   • block – a thick brand bar down the left edge (bold, confident)
 *   • sketch– a tinted panel with a short underline marker (earthy, hand-made)
 *
 * When `href` is set the whole card is a link and lifts on hover/focus.
 */
const shellBySignature: Record<Signature, string> = {
  rule: 'border border-border bg-card',
  block: 'border border-border border-l-4 border-l-primary bg-card',
  sketch: 'border border-border bg-secondary',
}

const Marker: React.FC<{ signature: Signature }> = ({ signature }) => {
  if (signature === 'block') return null // the left bar is the marker
  if (signature === 'sketch')
    return <span aria-hidden className="mb-5 block h-[3px] w-10 rounded-full bg-primary/80" />
  // rule
  return <span aria-hidden className="mb-5 block h-px w-10 bg-primary" />
}

type Props = {
  signature?: Signature
  href?: string | null
  newTab?: boolean
  /** Lift on hover/focus even when the card itself isn't a link (e.g. it holds
   *  its own CMSLink). */
  interactive?: boolean
  className?: string
  children: React.ReactNode
}

export const SignatureCard: React.FC<Props> = ({
  signature = 'rule',
  href,
  newTab,
  interactive,
  className,
  children,
}) => {
  const base = cn(
    'group/card relative flex h-full flex-col rounded-[var(--radius)] p-6 text-card-foreground transition md:p-8',
    shellBySignature[signature],
    (href || interactive) &&
      'hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg',
    className,
  )

  const inner = (
    <>
      <Marker signature={signature} />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  )

  if (href) {
    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
    return (
      <a href={href} className={base} {...newTabProps}>
        {inner}
      </a>
    )
  }

  return <div className={base}>{inner}</div>
}
