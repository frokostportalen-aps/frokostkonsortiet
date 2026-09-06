import React from 'react'

import type { EyebrowStyle } from '@/themes/dialect'

import { Eyebrow } from '@/components/Eyebrow'
import { cn } from '@/utilities/ui'

/**
 * The shared centred section header (heading + optional intro) used by the
 * band-style blocks — one place to tune the section type scale instead of a
 * copy per block. The size comes from `.section-heading`, which follows the
 * site's `--display-scale`.
 *
 * `eyebrow` is the short line the layouts set *under* the heading in spaced
 * capitals ("– OGSÅ DEM, DER PLEJER AT MÅTTE SPRINGE OVER"). It is a second
 * half of the title rather than a sentence, so it takes the site's own eyebrow
 * casing and stays out of the intro, which is running text.
 *
 * Colour is inherited. A header on a coloured band would otherwise need to be
 * told which foreground to use, and the caller would have to keep that in sync
 * with the band's own — which is how a band on the eco colour ended up printing
 * its heading in `--primary-foreground`.
 */
export const SectionHeader: React.FC<{
  heading?: string | null
  intro?: string | null
  eyebrow?: string | null
  /** The site's eyebrow casing, resolved by the caller. Deliberately a prop and
   *  not a `getDialect` lookup here: this component is imported by a client
   *  component, and `getDialect` reaches the tenant registry — importing it
   *  would ship every site's palette to the browser. */
  eyebrowStyle?: EyebrowStyle
  /** Muted intro colour. Off on a coloured band, where the intro follows the
   *  band's own text colour at reduced opacity instead. */
  muted?: boolean
  className?: string
}> = ({ heading, intro, eyebrow, eyebrowStyle = 'uppercase', muted = true, className }) => {
  if (!heading && !intro && !eyebrow) return null

  return (
    <div className={cn('mb-10 text-center', className)}>
      {heading && <h2 className="section-heading font-semibold">{heading}</h2>}
      {eyebrow && (
        <Eyebrow style={eyebrowStyle} className="mt-3 justify-center">
          {eyebrow}
        </Eyebrow>
      )}
      {intro && (
        <p className={cn('mx-auto mt-3 max-w-2xl', muted ? 'text-muted-foreground' : 'opacity-80')}>
          {intro}
        </p>
      )}
    </div>
  )
}
