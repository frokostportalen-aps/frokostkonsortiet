'use client'
import { useHeaderThemeSync } from '@/providers/HeaderTheme'
import React from 'react'

import type { Page } from '@/payload-types'
import type { TenantDesign } from '@/themes/tenantThemes'

import { CMSLink } from '@/components/Link'
import { Eyebrow } from '@/components/Eyebrow'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HeroProps = Page['hero'] & {
  heroTheme?: 'light' | 'dark'
  design?: TenantDesign
}

const HeroLinks: React.FC<{ links: Page['hero']['links']; center?: boolean }> = ({
  links,
  center,
}) => {
  if (!Array.isArray(links) || links.length === 0) return null
  return (
    <ul className={`flex flex-wrap gap-4 ${center ? 'md:justify-center' : ''}`}>
      {links.map(({ link }, i) => (
        <li key={i}>
          <CMSLink {...link} />
        </li>
      ))}
    </ul>
  )
}

/**
 * Editorial split: the headline sits beside the photo on the site's own
 * background, with a tagline eyebrow and (per signature) a hairline marker. No
 * scrim, so the header keeps the ambient theme — used by sites whose voice is
 * typographic rather than photographic.
 */
const SplitHero: React.FC<HeroProps> = ({ links, media, mediaFit, richText, design }) => {
  // No scrim: the header keeps the ambient theme over an editorial split.
  useHeaderThemeSync(null)

  // `contain` shows the whole image without cropping (e.g. cut-out photos); it
  // has no backdrop, so it floats on the site background instead of sitting in a
  // rounded, clipped frame the way a cropped `cover` photo does.
  const contain = mediaFit === 'contain'

  return (
    <div className="container pb-8 md:pb-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="max-w-xl">
          {design?.tagline && (
            <Eyebrow style={design.eyebrow} withRule className="mb-6">
              {design.tagline}
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
              contain ? '' : 'overflow-hidden rounded-[var(--radius)]'
            }`}
          >
            <Media
              fill
              imgClassName={contain ? 'object-contain' : 'object-cover'}
              priority
              resource={media}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Full-bleed photo with the headline laid over a readability scrim. The header
 * overlaps the photo (negative top margin) and adopts the hero theme so the
 * logo/menu stay legible against the image.
 */
const OverlayHero: React.FC<HeroProps> = ({ links, media, richText, heroTheme = 'dark' }) => {
  // The header floats over the photo and adopts the hero's theme for contrast.
  useHeaderThemeSync(heroTheme)

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-foreground"
      data-theme={heroTheme}
    >
      {/* Readability scrim between the photo and the content. Top-weighted so it
          also lifts the overlapping header/menu. Matches the hero text colour:
          a dark scrim for light text, a light scrim for dark text. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 ${
          heroTheme === 'dark'
            ? 'bg-gradient-to-b from-black/45 via-black/30 to-black/20'
            : 'bg-gradient-to-b from-white/75 via-white/55 to-white/40'
        }`}
      />
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          <HeroLinks links={links} center />
        </div>
      </div>
      <div className="min-h-[68vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}

export const HighImpactHero: React.FC<HeroProps> = (props) => {
  return props.design?.heroVariant === 'split' ? (
    <SplitHero {...props} />
  ) : (
    <OverlayHero {...props} />
  )
}
