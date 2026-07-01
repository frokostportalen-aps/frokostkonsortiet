import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaContentBlock } from '@/blocks/MediaContent/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faq: FAQBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mediaContent: MediaContentBlock,
  stats: StatsBlock,
  testimonials: TestimonialsBlock,
  timeline: TimelineBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  tenantSlug?: string
}> = (props) => {
  const { blocks, tenantSlug } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            // Each block validates its own slice of the union at runtime; a
            // single shared call site can't satisfy every block's prop type, so
            // widen here rather than scatter @ts-expect-error directives.
            const Block = blockComponents[blockType] as React.FC<
              Record<string, unknown> & { tenantSlug?: string }
            >

            if (Block) {
              return (
                <div className="my-16" data-block-type={blockType} key={index}>
                  <Block {...block} tenantSlug={tenantSlug} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
