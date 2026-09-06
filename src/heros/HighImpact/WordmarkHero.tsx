'use client'
import { useHeaderThemeSync } from '@/providers/HeaderTheme'
import React from 'react'

import type { HeroProps } from './shared'

import { heroLockup } from '@/utilities/lexicalText'
import { HeroLinks, HeroPhoto } from './shared'

/**
 * Brand lockup banner: a photo cut off by a diagonal against a solid brand
 * panel, with the site's headline set as an oversized wordmark whose first word
 * sits over the photo in the panel's own tone — as if the panel continued
 * through the letters — and the rest on the panel in `--hero-wordmark`, above a
 * letterspaced subline.
 *
 * The split is the word break, not the geometry: the lockup sits on a grid
 * whose columns are cut from the same numbers as the photo's clip path (see
 * globals.css), so the first word always lands whole on the photo's side and
 * the rest whole on the panel, at every viewport width. Editors control it by
 * writing the headline. A single-word headline can't be split, so it stays on
 * the panel, where it is legible either way.
 *
 * The layout sets the characters itself, so it reads the words out of the hero's
 * rich text rather than rendering it: the `h1` becomes the wordmark and the
 * first paragraph the subline (falling back to the site's tagline). It wants a
 * *short* headline — the brand name, not a sentence.
 */
export const WordmarkHero: React.FC<HeroProps> = ({ links, media, richText, dialect }) => {
  // A banner, not an overlay: the header keeps the ambient theme above it.
  useHeaderThemeSync(null)

  // The lockup's two lines, and which of them the editor marked as the page's
  // heading — a front page leads with the brand name, a section page with its
  // own subject. See `heroLockup`.
  const { wordmark, subline: sublineText, headingIsSubline } = heroLockup(richText)
  const subline = sublineText || dialect?.tagline || ''

  // The tag follows the content, not the size: on a page whose subject is the
  // small line, that line is the h1 and the lockup above it is a brand mark.
  // The visual composition is identical either way.
  const Wordmark = headingIsSubline ? 'p' : 'h1'
  const Subline = headingIsSubline ? 'h1' : 'p'

  // A single-word headline can't be split, so it stays whole on the panel.
  const [firstWord, ...tail] = wordmark.split(/\s+/)
  const rest = tail.join(' ')
  const lead = rest ? firstWord : ''

  return (
    <section
      data-theme="light"
      className="brand-panel hero-wordmark-panel relative w-full overflow-hidden"
    >
      {/* The photo, clipped to its side of the cut, under a scrim that darkens
          it towards the cut so the lead word reads on any picture. */}
      <div aria-hidden="true" className="hero-wordmark-cut absolute inset-0 select-none">
        {/* The photo fills the wedge the cut leaves visible, not the whole band:
            given the full width, `object-cover` would centre the subject on the
            band's middle — which is where the cut is, so the subject would sit
            half-hidden at the edge. */}
        <div className="hero-wordmark-photo absolute inset-y-0 left-0">
          <HeroPhoto media={media} size="(max-width: 48rem) 55vw, 62vw" />
        </div>
        <div className="hero-wordmark-scrim absolute inset-0" />
      </div>

      {/* The band: portrait on phones, 20:9 from `md`. The floor in rem keeps
          room for the lockup when the root font size is large; the ceiling stops
          the portrait ratio from running away on a wide phone, where it would
          grow faster than the content that has to sit at its foot. `w-full` is
          load-bearing: with a min-height and no fixed width, the aspect ratio
          would widen the band past its own section. */}
      <div className="relative w-full aspect-[3/4] min-h-[38rem] max-h-[42rem] md:aspect-[20/9] md:max-h-none md:min-h-[34rem]">
        <div className="hero-wordmark-lockup hero-entrance">
          <Wordmark className="hero-wordmark">
            {/* The trailing space keeps the two spans one phrase in the DOM: the
                grid places them, but a reader — screen or search engine — sees
                "Fra jorden", not "Frajorden". */}
            {lead && <span className="hero-wordmark-lead">{lead} </span>}
            <span className="hero-wordmark-rest">{rest || firstWord}</span>
          </Wordmark>
          {subline && <Subline className="hero-wordmark-subline">{subline}</Subline>}
          {Array.isArray(links) && links.length > 0 && (
            <div className="hero-wordmark-actions">
              <HeroLinks
                links={links}
                className="flex-col items-stretch gap-3 md:flex-row md:justify-end"
                linkClassName="hero-wordmark-button w-full md:w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
