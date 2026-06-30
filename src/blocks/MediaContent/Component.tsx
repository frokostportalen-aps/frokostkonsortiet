import React from 'react'

import type { MediaContentBlock as Props } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediaContentBlock: React.FC<Props> = ({ media, richText, links, imagePosition }) => {
  const imageRight = imagePosition === 'right'

  return (
    // Outer wrapper owns max-width + side padding; the inner band owns the
    // rounding + overflow clip (keeping padding off the rounded element, so the
    // corners are actually visible). Consecutive bands merge and only the
    // group's outer corners stay rounded — see globals.css, keyed off the
    // wrapper's data-block-type and the band's class.
    <div className="container">
      <div className="media-content-band grid items-stretch overflow-hidden rounded-lg md:grid-cols-2">
        {/* Image half — fills its cell edge to edge. */}
        <div className={cn('relative min-h-[18rem] md:min-h-[26rem]', imageRight && 'md:order-2')}>
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="object-cover"
              resource={media}
              size="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Text half — tinted panel, vertically centred. */}
        <div
          className={cn(
            'flex flex-col justify-center gap-4 bg-accent px-6 py-10 text-accent-foreground md:px-12 md:py-16',
            imageRight && 'md:order-1',
          )}
        >
          {richText && <RichText data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
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
