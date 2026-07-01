import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, mediaFit, richText }) => {
  const contain = mediaFit === 'contain'
  return (
    <div className="container pt-6 md:pt-10">
      <div className="max-w-3xl">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap gap-4">
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

      {media && typeof media === 'object' && (
        <div className="mt-8 md:mt-10">
          {/* Crop to a wide banner so a tall source image can't blow the hero up
              to full height. object-cover + a fixed aspect ratio keep it tidy.
              `contain` instead shows the whole image (no crop, no clipped frame). */}
          <div
            className={`relative aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9] ${
              contain ? '' : 'overflow-hidden rounded-lg'
            }`}
          >
            <Media
              fill
              imgClassName={contain ? 'object-contain' : 'object-cover'}
              priority
              resource={media}
            />
          </div>
          {media?.caption && (
            <div className="mt-3">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
