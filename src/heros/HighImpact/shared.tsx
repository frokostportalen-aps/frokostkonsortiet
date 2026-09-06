import type { Page } from '@/payload-types'
import type { Dialect } from '@/themes/dialect'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

/**
 * What every high-impact variant receives. The variants differ in layout, not
 * in data: each one gets the same hero fields plus the site's dialect, and
 * reads the parts it expresses.
 */
export type HeroProps = Page['hero'] & {
  heroTheme?: 'light' | 'dark'
  dialect?: Dialect
}

/**
 * The hero's call-to-action row, shared by every variant. A variant restyles it
 * through these props rather than by reaching into the markup from CSS, so this
 * component keeps ownership of its own element and classes.
 */
export const HeroLinks: React.FC<{
  links: Page['hero']['links']
  /** Restyle outline buttons for a dark photo backdrop (glassy, light border). */
  overlayDark?: boolean
  /** Layout of the row itself — a variant can stack it or realign it. */
  className?: string
  /** Applied to every button, for a variant's own sizing. */
  linkClassName?: string
}> = ({ links, overlayDark, className, linkClassName }) => {
  if (!Array.isArray(links) || links.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-4', className)}>
      {links.map(({ link }, i) => (
        <li key={i}>
          <CMSLink
            {...link}
            size="lg"
            className={cn(
              overlayDark &&
                link.appearance === 'outline' &&
                'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white',
              linkClassName,
            )}
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * The hero photo, on the terms every variant shares: it fills its (positioned)
 * parent, loads with priority as the page's LCP image, and settles into place
 * with the family's motion. Each variant owns the frame around it — the cut, the
 * rounded panel, the full bleed — this owns the picture itself.
 */
export const HeroPhoto: React.FC<{
  media: Page['hero']['media']
  /** `sizes` hint: how wide the photo actually renders, per breakpoint. */
  size: string
  fit?: 'cover' | 'contain'
}> = ({ media, size, fit = 'cover' }) => {
  if (!media || typeof media !== 'object') return null
  return (
    <Media
      fill
      // Both class names appear as literals, so Tailwind's scanner finds them.
      imgClassName={`hero-media-settle ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      priority
      resource={media}
      size={size}
    />
  )
}
