'use client'
import { useHeaderThemeSync } from '@/providers/HeaderTheme'
import React from 'react'

import type { HeroProps } from './shared'

import RichText from '@/components/RichText'
import { signatureMarkClass } from '@/components/SignatureMark'
import { HeroLinks, HeroPhoto } from './shared'

/**
 * Full-bleed photo with the headline laid over a readability scrim. The header
 * overlaps the photo (negative top margin) and adopts the hero theme so the
 * logo/menu stay legible against the image. The scrim reads `--hero-scrim`, so
 * a site tints it toward its own hue through the theme like any other token.
 */
export const OverlayHero: React.FC<HeroProps> = ({
  links,
  media,
  richText,
  heroTheme = 'dark',
  dialect,
}) => {
  // Brand chrome makes the header an opaque light surface: it neither floats
  // over the photo nor takes the hero's theme, so tucking under it would only
  // crop the top of the picture.
  const floats = dialect?.chrome !== 'brand'

  // A floating header sits over the photo and adopts the hero's theme.
  useHeaderThemeSync(floats ? heroTheme : null)

  const dark = heroTheme === 'dark'

  return (
    <div
      className={`relative flex items-center justify-center text-foreground ${
        floats ? '-mt-[4.4rem]' : ''
      }`}
      data-theme={heroTheme}
    >
      {/* The photo — its own positioned layer, so `fill` has a valid parent. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden select-none">
        <HeroPhoto media={media} size="100vw" />
      </div>

      {/* Readability scrim between the photo and the content. Top-weighted so it
          also lifts the overlapping header/menu; the recipe lives in globals.css
          and takes its hue from `--hero-scrim`. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${dark ? 'scrim-hero' : 'scrim-hero-light'}`}
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

      {/* Pads the copy down past the header so the centred text block sits in the
          *visible* photo. Deliberately larger than the -mt above: it is not the
          overlap, it is where this hero's copy is meant to sit. */}
      <div
        className={`container z-10 relative flex items-center justify-center pb-8 ${
          floats ? 'pt-[10.4rem]' : 'pt-[6rem]'
        }`}
      >
        <div className="hero-entrance max-w-[40rem] md:text-center">
          {dialect?.tagline && (
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-caps text-primary md:justify-center">
              <span aria-hidden className={signatureMarkClass.heroEyebrow[dialect.signature]} />
              <span className={dark ? 'text-white/90' : 'text-foreground/80'}>
                {dialect.tagline}
              </span>
            </p>
          )}
          {richText && (
            <RichText
              className={`mb-8 [&_h1]:text-balance [&_h1]:font-bold [&_h1]:tracking-display [&_h1]:leading-[1.06] [&_h1]:text-5xl md:[&_h1]:text-6xl [&_p]:text-lg [&_p]:leading-relaxed ${
                dark
                  ? '[&_p]:text-white/95 [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_8px_40px_rgb(0_0_0/0.35)]'
                  : ''
              }`}
              data={richText}
              enableGutter={false}
            />
          )}
          <HeroLinks links={links} className="md:justify-center" overlayDark={dark} />
        </div>
      </div>

      {/* Height spacer — the photo and scrims are absolute, so this sets the
          hero's size. */}
      <div aria-hidden="true" className="min-h-[68vh] md:min-h-[74vh]" />
    </div>
  )
}
