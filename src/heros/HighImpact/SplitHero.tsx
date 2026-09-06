'use client'
import { useHeaderThemeSync } from '@/providers/HeaderTheme'
import React from 'react'

import type { HeroProps } from './shared'

import { Eyebrow } from '@/components/Eyebrow'
import RichText from '@/components/RichText'
import { HeroLinks, HeroPhoto } from './shared'

/**
 * Editorial split: the headline sits beside the photo on the site's own
 * background, with a tagline eyebrow and (per signature) a hairline marker. No
 * scrim, so the header keeps the ambient theme — used by sites whose voice is
 * typographic rather than photographic.
 */
export const SplitHero: React.FC<HeroProps> = ({ links, media, mediaFit, richText, dialect }) => {
  // No scrim: the header keeps the ambient theme over an editorial split.
  useHeaderThemeSync(null)

  // `contain` shows the whole image without cropping (e.g. cut-out photos); it
  // has no backdrop, so it floats on the site background instead of sitting in a
  // rounded, clipped frame the way a cropped `cover` photo does.
  const contain = mediaFit === 'contain'

  return (
    <div className="container pb-8 md:pb-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="hero-entrance max-w-xl">
          {dialect?.tagline && (
            <Eyebrow style={dialect.eyebrow} withRule className="mb-6">
              {dialect.tagline}
            </Eyebrow>
          )}
          {richText && (
            <RichText
              className="mb-8 [&_h1]:text-balance [&_p]:text-lg [&_p]:text-muted-foreground"
              data={richText}
              enableGutter={false}
            />
          )}
          <HeroLinks links={links} />
        </div>

        {media && typeof media === 'object' && (
          <div
            className={`relative aspect-[3/4] w-full sm:aspect-[16/10] md:aspect-[4/5] ${
              contain ? '' : 'overflow-hidden rounded-lg'
            }`}
          >
            <HeroPhoto
              media={media}
              size="(max-width: 768px) 100vw, 50vw"
              fit={contain ? 'contain' : 'cover'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
