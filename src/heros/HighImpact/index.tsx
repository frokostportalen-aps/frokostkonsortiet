import React from 'react'

import type { HeroProps } from './shared'

import { headingText } from '@/utilities/lexicalText'
import { OverlayHero } from './OverlayHero'
import { SplitHero } from './SplitHero'
import { WordmarkHero } from './WordmarkHero'

/**
 * The front-page hero, in the site's own dialect: one field set, three layouts
 * ("ét sprog, tre dialekter"). Each variant lives in its own file beside this
 * one and shares `HeroProps` + `HeroLinks` from `./shared`; the site's
 * `dialect.heroVariant` picks between them.
 *
 * Deliberately a server component: the variants each declare `'use client'`, so
 * the boundary sits at the one that renders. Marking the dispatcher too would
 * pull every variant — and the `RichText` serializer two of them use — into the
 * browser bundle of every page with a high-impact hero.
 */
export const HighImpactHero: React.FC<HeroProps> = (props) => {
  switch (props.dialect?.heroVariant) {
    case 'split':
      return <SplitHero {...props} />
    case 'wordmark':
      // The lockup letters the `h1` itself, so a hero without one has nothing
      // to set — those fall through to the overlay.
      return headingText(props.richText) ? (
        <WordmarkHero {...props} />
      ) : (
        <OverlayHero {...props} />
      )
    default:
      return <OverlayHero {...props} />
  }
}
