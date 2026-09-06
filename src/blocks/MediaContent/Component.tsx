import React from 'react'

import type { MediaContentBlock as MediaContentBlockProps } from '@/payload-types'
import { getDialect } from '@/themes/dialect'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { signatureMarkClass } from '@/components/SignatureMark'
import { cn } from '@/utilities/ui'

type Props = MediaContentBlockProps & { tenantSlug?: string }

export const MediaContentBlock: React.FC<Props> = ({
  media,
  richText,
  links,
  imagePosition,
  mediaRatio,
  textAlign,
  tenantSlug,
}) => {
  const imageRight = imagePosition === 'right'
  // A third-width picture can't be bled to the edge the way a half-width one is:
  // at that width `object-cover` would crop a portrait into a tall strip. So the
  // narrow variant insets the image and lets the whole band carry the tint,
  // which is also what the layouts asking for the split are drawn as.
  const narrow = mediaRatio === 'oneThird'
  const centred = textAlign === 'center'
  const { signature } = getDialect(tenantSlug)

  return (
    // Outer wrapper owns max-width + side padding; the inner band owns the
    // rounding + overflow clip (keeping padding off the rounded element, so the
    // corners are actually visible). Consecutive bands merge and only the
    // group's outer corners stay rounded — see globals.css, keyed off the
    // wrapper's data-block-type and the band's class.
    <div className="container">
      <div
        // The variant is in the DOM because adjacent bands style each other:
        // globals.css merges a run of flush bands into one element, and only
        // flush bands may take part in that (see the rule for why).
        data-variant={narrow ? 'inset' : 'flush'}
        className={cn(
          'media-content-band grid items-stretch overflow-hidden rounded-lg',
          'bg-accent text-accent-foreground',
          narrow ? 'md:grid-cols-3' : 'md:grid-cols-2',
        )}
      >
        {/* Image side — edge to edge at half width, inset at a third. */}
        <div
          className={cn(
            'relative',
            // `self-center` is not a `md:` refinement — it's what stops the cell
            // from collapsing. The band is `items-stretch`, and this cell's only
            // content is the absolutely-positioned <picture>, so it contributes
            // no in-flow size in either axis. Blink resolves the row from the
            // aspect-ratio anyway; WebKit lets `stretch` win over the ratio and
            // sizes the cell 0x0 — the picture vanished on iPhones while every
            // other engine looked right. Opting out of `stretch` makes the ratio
            // the definite size in both, at identical measurements.
            narrow ? 'aspect-[4/5] m-6 md:m-10 self-center' : 'min-h-[18rem] md:min-h-[26rem]',
            imageRight && 'md:order-2',
          )}
        >
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="object-cover"
              resource={media}
              // The container caps at 96rem, so past that width the cell stops
              // growing — a bare vw hint would keep asking for a larger source.
              size={
                narrow
                  ? '(max-width: 768px) 100vw, (min-width: 1536px) 420px, 33vw'
                  : '(max-width: 768px) 100vw, (min-width: 1536px) 736px, 50vw'
              }
            />
          )}
        </div>

        {/* Text side — tinted panel, vertically centred. */}
        <div
          className={cn(
            'flex flex-col justify-center gap-5 px-6 py-10 md:px-12 md:py-16',
            narrow && 'md:col-span-2',
            centred && 'items-center text-center',
            imageRight && 'md:order-1',
          )}
        >
          <span aria-hidden className={cn('block', signatureMarkClass.band[signature])} />
          {richText && (
            <RichText className="[&_p]:opacity-80" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={cn('flex flex-wrap gap-4', centred && 'justify-center')}>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
