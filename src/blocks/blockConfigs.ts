import type { Block } from 'payload'

import { Archive } from './ArchiveBlock/config'
import { CallToAction } from './CallToAction/config'
import { ClientList } from './ClientList/config'
import { Content } from './Content/config'
import { FAQ } from './FAQ/config'
import { FormBlock } from './Form/config'
import { MediaBlock } from './MediaBlock/config'
import { MediaContent } from './MediaContent/config'
import { PlanPicker } from './PlanPicker/config'
import { PriceMenu } from './PriceMenu/config'
import { Stats } from './Stats/config'
import { Steps } from './Steps/config'
import { Team } from './Team/config'
import { Testimonials } from './Testimonials/config'
import { Timeline } from './Timeline/config'

/**
 * The layout blocks an editor can add to a page — the single list feeding
 * `Pages.layout`. Deliberately imports *only* block configs, never their React
 * renderers: the Payload config is built in Node (generate:types, migrations),
 * and pulling a block's client component in here drags `.scss`/browser imports
 * into that graph and breaks the build.
 *
 * The renderers live in `RenderBlocks`, which types its dispatcher against the
 * generated block-slug union — so every block listed here is compile-time
 * required to have a renderer, and the two lists can't silently drift.
 *
 * Order sets the editor block-picker order and the generated `layout` union.
 */
export const blockConfigs: Block[] = [
  CallToAction,
  Content,
  MediaBlock,
  MediaContent,
  Archive,
  FormBlock,
  FAQ,
  Testimonials,
  Stats,
  PriceMenu,
  Steps,
  Team,
  PlanPicker,
  ClientList,
  Timeline,
]
