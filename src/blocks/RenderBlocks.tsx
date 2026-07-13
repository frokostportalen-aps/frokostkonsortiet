import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ClientListBlock } from '@/blocks/ClientList/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaContentBlock } from '@/blocks/MediaContent/Component'
import { PlanPickerBlock } from '@/blocks/PlanPicker/Component'
import { PriceMenuBlock } from '@/blocks/PriceMenu/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { StepsBlock } from '@/blocks/Steps/Component'
import { TeamBlock } from '@/blocks/Team/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'

/** Every block type an editor can add (derived from the generated layout union). */
type BlockType = NonNullable<Page['layout']>[number]['blockType']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockRenderer = React.ComponentType<any>

// Renderers live here (the render graph, which may pull client/`.scss` imports),
// kept apart from the Node config graph in `blockConfigs`. Typing the map as
// `Record<BlockType, …>` makes TypeScript require a renderer for every block an
// editor can add — so adding a block to `blockConfigs` without one fails to
// compile instead of silently rendering nothing.
const blockComponents: Record<BlockType, BlockRenderer> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faq: FAQBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mediaContent: MediaContentBlock,
  clientList: ClientListBlock,
  planPicker: PlanPickerBlock,
  priceMenu: PriceMenuBlock,
  stats: StatsBlock,
  steps: StepsBlock,
  team: TeamBlock,
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
                <div className="my-16 md:my-24" data-block-type={blockType} data-reveal="" key={index}>
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
