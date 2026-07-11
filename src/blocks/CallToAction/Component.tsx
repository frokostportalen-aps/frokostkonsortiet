import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Eyebrow } from '@/components/Eyebrow'
import { signatureMarkClass } from '@/components/SignatureMark'

type Props = CTABlockProps & { tenantSlug?: string }

/**
 * The closing statement band: the tenant's primary colour at full strength, so
 * the page ends on brand instead of fading out. Buttons are forced to the
 * light `secondary` treatment for contrast against the dark panel.
 */
export const CallToActionBlock: React.FC<Props> = ({ links, richText, tenantSlug }) => {
  const { tagline, eyebrow, signature } = getDialect(tenantSlug)
  return (
    <div className="container">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)*1.5)] bg-primary p-10 text-primary-foreground md:p-16">
        {/* A quiet oversized quote-mark watermark — food, voice, hospitality. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 right-4 select-none font-serif text-[16rem] leading-none text-primary-foreground/10 md:right-10"
        >
          &ldquo;
        </span>
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[44rem]">
            {tagline && (
              <Eyebrow
                style={eyebrow}
                mark={signatureMarkClass.ctaBand[signature]}
                className="mb-4 text-primary-foreground/70"
              >
                {tagline}
              </Eyebrow>
            )}
            {/* Explicit heading colours (not prose-invert): the band is
                `primary`, which flips light↔dark per tenant, so headings must
                follow --primary-foreground rather than the mode. */}
            {richText && (
              <RichText
                className="mb-0 [&_h2]:text-3xl [&_h2]:leading-tight md:[&_h2]:text-4xl [&_h3]:text-2xl md:[&_h3]:text-3xl [&_h2]:text-primary-foreground [&_h3]:text-primary-foreground [&_p]:text-primary-foreground/85"
                data={richText}
                enableGutter={false}
              />
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} {...link} size="lg" appearance="secondary" />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
