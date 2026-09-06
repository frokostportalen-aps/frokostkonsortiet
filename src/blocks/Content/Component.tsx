import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { Signature } from '@/themes/dialect'

import { getDialect } from '@/themes/dialect'
import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import { SignatureCard } from '@/components/SignatureCard'
import { signatureMarkClass } from '@/components/SignatureMark'

type Props = ContentBlockProps & { tenantSlug?: string }

const colsSpanClasses = {
  full: '12',
  half: '6',
  oneThird: '4',
  twoThirds: '8',
} as const

/**
 * A flexible columns block. The column size decides the treatment, which keeps
 * one block doing two jobs across the whole site:
 *   - full           -> plain prose: section headings, intros, fine print
 *   - half/third/...  -> a card in a responsive grid (the signature shell)
 * A leading full-width heading that introduces cards gets the signature rule.
 *
 * With a `background` the same grid moves onto a full-bleed photo under a
 * readability scrim, tinted toward the site's own hue. Only the loose prose
 * flips to light type — the cards keep their paper surface, so a site's cards
 * look the same whether they stand on the page or on a picture.
 */
export const ContentBlock: React.FC<Props> = ({ background, columns, tenantSlug }) => {
  const { signature } = getDialect(tenantSlug)
  const cols = columns ?? []
  const hasCards = cols.some((c) => c.size && c.size !== 'full')
  const onPhoto = Boolean(background && typeof background === 'object')

  const grid = (
    <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 md:gap-x-8">
      {cols.map((col, index) => {
        const { enableLink, link, richText, size } = col
        const span = colsSpanClasses[size ?? 'full']

        // Full-width: prose. The first one, when it introduces cards, is the
        // section header and gets the motif rule.
        if (size === 'full' || !size) {
          const isSectionHeader = hasCards && index === 0
          return (
            <div className="prose-inset col-span-4 lg:col-span-12" key={index}>
              {richText && (
                <RichText
                  className={cn(onPhoto && 'prose-invert')}
                  data={richText}
                  enableGutter={false}
                />
              )}
              {isSectionHeader && (
                <span
                  aria-hidden
                  className={cn(
                    'mt-5 block',
                    signatureMarkClass.section[signature],
                    onPhoto && 'bg-white/70',
                  )}
                />
              )}
              {enableLink && <CMSLink className="mt-4" {...link} />}
            </div>
          )
        }

        // Fractional: a signature card.
        return (
          <div className={cn(`col-span-4 lg:col-span-${span}`, 'md:col-span-2')} key={index}>
            <SignatureCard signature={signature} interactive={!!enableLink}>
              {richText && (
                <RichText
                  // `w-full` because RichText carries `mx-auto`, and a card is a
                  // flex column: auto margins there make the block shrink to its
                  // content and centre, so a card with short copy sat indented
                  // beside its neighbours.
                  className="w-full [&_h3]:mt-0 [&_h3]:mb-3 [&_h3]:text-xl [&_p]:text-muted-foreground"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {enableLink && (
                <CMSLink
                  className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary transition-[gap] group-hover/card:gap-2.5"
                  {...link}
                >
                  <ArrowRight aria-hidden className="size-4" />
                </CMSLink>
              )}
            </SignatureCard>
          </div>
        )
      })}
    </div>
  )

  return (
    <section className={cn(onPhoto && 'relative overflow-hidden py-14 md:py-20')}>
      {onPhoto && (
        <>
          {/* The photo — its own positioned layer, so `fill` has a valid parent.
              `htmlElement={null}` keeps Media from adding a second wrapper. */}
          <div aria-hidden="true" className="absolute inset-0 select-none">
            <Media
              fill
              htmlElement={null}
              imgClassName="object-cover"
              resource={background}
              size="100vw"
            />
          </div>
          {/* Readability scrim — same token as the heroes', its recipe in
              globals.css. */}
          <div aria-hidden="true" className="scrim-section pointer-events-none absolute inset-0" />
        </>
      )}
      <div className={cn('container', onPhoto && 'relative')}>{grid}</div>
    </section>
  )
}
