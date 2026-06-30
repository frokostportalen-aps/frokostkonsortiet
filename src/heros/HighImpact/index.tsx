'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero'] & { heroTheme?: 'light' | 'dark' }> = ({
  links,
  media,
  richText,
  heroTheme = 'dark',
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(heroTheme)
  }, [heroTheme, setHeaderTheme])

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
            ? 'bg-gradient-to-b from-black/70 via-black/45 to-black/25'
            : 'bg-gradient-to-b from-white/85 via-white/55 to-white/35'
        }`}
      />
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
