import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { TenantDesign } from '@/themes/tenantThemes'

import { CMSLink } from '../../components/Link'
import { SignatureCard } from '@/components/SignatureCard'
import { signatureMarkClass } from '@/components/SignatureMark'

type Props = ContentBlockProps & { design?: TenantDesign }

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
 */
export const ContentBlock: React.FC<Props> = ({ columns, design }) => {
  const signature = design?.signature ?? 'rule'
  const cols = columns ?? []
  const hasCards = cols.some((c) => c.size && c.size !== 'full')

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 md:gap-x-8">
        {cols.map((col, index) => {
          const { enableLink, link, richText, size } = col
          const span = colsSpanClasses[size ?? 'full']

          // Full-width: prose. The first one, when it introduces cards, is the
          // section header and gets the motif rule.
          if (size === 'full' || !size) {
            const isSectionHeader = hasCards && index === 0
            return (
              <div className="col-span-4 lg:col-span-12" key={index}>
                {richText && <RichText data={richText} enableGutter={false} />}
                {isSectionHeader && (
                  <span aria-hidden className={cn('mt-5 block', signatureMarkClass.section[signature])} />
                )}
                {enableLink && <CMSLink className="mt-4" {...link} />}
              </div>
            )
          }

          // Fractional: a signature card.
          return (
            <div
              className={cn(`col-span-4 lg:col-span-${span}`, { 'md:col-span-2': true })}
              key={index}
            >
              <SignatureCard signature={signature} interactive={!!enableLink}>
                {richText && (
                  <RichText
                    className="[&_h3]:mt-0 [&_h3]:mb-3 [&_h3]:text-xl [&_p]:text-muted-foreground"
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
    </div>
  )
}
