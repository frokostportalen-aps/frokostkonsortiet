'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import type { TenantDesign } from '@/themes/tenantThemes'

import { CMSLink } from '@/components/Link'
import { Eyebrow } from '@/components/Eyebrow'
import { Media } from '@/components/Media'
import { signatureMarkClass } from '@/components/SignatureMark'
import RichText from '@/components/RichText'

type HeroProps = Page['hero'] & {
  heroTheme?: 'light' | 'dark'
  design?: TenantDesign
}

const HeroLinks: React.FC<{
  links: Page['hero']['links']
  center?: boolean
  /** Restyle outline buttons for a dark photo backdrop (glassy, light border). */
  overlayDark?: boolean
}> = ({ links, center, overlayDark }) => {
  if (!Array.isArray(links) || links.length === 0) return null
  return (
    <ul className={`flex flex-wrap gap-4 ${center ? 'md:justify-center' : ''}`}>
      {links.map(({ link }, i) => (
        <li key={i}>
          <CMSLink
            {...link}
            size="lg"
            className={
              overlayDark && link.appearance === 'outline'
                ? 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white'
                : undefined
            }
          />
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
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => setHeaderTheme(null), [setHeaderTheme])

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
              size="(max-width: 768px) 100vw, 50vw"
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
 * logo/menu stay legible against the image. The scrim can be tinted toward the
 * tenant's identity via `design.heroScrim` (bare oklch channels).
 */
const OverlayHero: React.FC<HeroProps> = ({
  links,
  media,
  richText,
  heroTheme = 'dark',
  design,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => setHeaderTheme(heroTheme), [heroTheme, setHeaderTheme])

  const dark = heroTheme === 'dark'
  const scrimBase = design?.heroScrim ?? '0% 0 0'

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-foreground"
      data-theme={heroTheme}
    >
      {/* The photo — its own positioned layer, so `fill` has a valid parent. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} size="100vw" />
        )}
      </div>

      {/* Readability scrim between the photo and the content. Top-weighted so it
          also lifts the overlapping header/menu; tinted toward the tenant's own
          hue when `heroScrim` is set. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          dark
            ? {
                background: `linear-gradient(180deg, oklch(${scrimBase} / 0.58), oklch(${scrimBase} / 0.34) 45%, oklch(${scrimBase} / 0.3))`,
              }
            : {
                background:
                  'linear-gradient(180deg, rgb(255 255 255 / 0.78), rgb(255 255 255 / 0.55) 45%, rgb(255 255 255 / 0.4))',
              }
        }
      />
      {/* Soft vignette behind the centred copy, so the headline stays legible
          over bright spots in the photo without darkening the whole image. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          dark
            ? 'bg-[radial-gradient(ellipse_55%_45%_at_50%_58%,rgb(0_0_0/0.42),transparent_72%)]'
            : 'bg-[radial-gradient(ellipse_55%_45%_at_50%_58%,rgb(255_255_255/0.5),transparent_72%)]'
        }`}
      />

      {/* pt matches the header overlap (-mt above), so the vertically centred
          text block lands in the middle of the *visible* photo. */}
      <div className="container z-10 relative flex items-center justify-center pt-[10.4rem] pb-8">
        <div className="max-w-[40rem] md:text-center">
          {design?.tagline && (
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary md:justify-center">
              <span aria-hidden className={signatureMarkClass.heroEyebrow[design.signature]} />
              <span className={dark ? 'text-white/90' : 'text-foreground/80'}>
                {design.tagline}
              </span>
            </p>
          )}
          {richText && (
            <RichText
              className={`mb-8 [&_h1]:text-balance [&_h1]:font-bold [&_h1]:tracking-[-0.02em] [&_h1]:leading-[1.06] [&_h1]:text-5xl md:[&_h1]:text-6xl [&_p]:text-lg [&_p]:leading-relaxed ${
                dark
                  ? '[&_p]:text-white/95 [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_8px_40px_rgb(0_0_0/0.35)]'
                  : ''
              }`}
              data={richText}
              enableGutter={false}
            />
          )}
          <HeroLinks links={links} center overlayDark={dark} />
        </div>
      </div>

      {/* Height spacer — the photo and scrims are absolute, so this sets the
          hero's size. */}
      <div aria-hidden="true" className="min-h-[68vh] md:min-h-[74vh]" />
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
