/**
 * Reusable block builders for composing pages. A page file imports these and
 * assembles a `layout` array freely — placing images (`img('name')`), text,
 * media+text splits, CTAs, FAQs, etc. wherever it likes.
 *
 * The lexical helpers (`heading`, `p`, `list`, `richText`, `link`) are
 * re-exported here so a page file only needs one import.
 */
import { heading, list, p, richText } from '../lexical'

export { heading, list, p, richText }

type Node = Record<string, unknown>
type RichText = ReturnType<typeof richText>
type Size = 'full' | 'half' | 'oneThird' | 'twoThirds'
type ImagePosition = 'left' | 'right'

// ── links ────────────────────────────────────────────────────────────────────

export type LinkWrap = { link: Record<string, unknown> }

/** A custom link (used in hero/CTA link groups and nav). */
export const customLink = (
  label: string,
  url: string,
  appearance: 'default' | 'outline' = 'default',
  newTab = false,
): LinkWrap => ({
  link: { type: 'custom', appearance, label, url, ...(newTab ? { newTab: true } : {}) },
})

// ── content block + columns ──────────────────────────────────────────────────

export type Column = Record<string, unknown>

/** A plain text column inside a Content block. */
export const column = (size: Size, ...nodes: Node[]): Column => ({
  size,
  enableLink: false,
  richText: richText(...nodes),
})

/** A column whose card links somewhere (e.g. the partners grid). */
export const linkColumn = (size: Size, linkData: Record<string, unknown>, ...nodes: Node[]): Column => ({
  size,
  enableLink: true,
  link: linkData,
  richText: richText(...nodes),
})

export const content = (columns: Column[], blockName = 'Indhold') => ({
  blockType: 'content',
  blockName,
  columns,
})

// ── media blocks ───────────────────────────────────────────────────────────—

/** Image beside text (the image side alternates down a page via `position`). */
export const mediaContent = (
  media: string,
  position: ImagePosition,
  rt: RichText,
  links: LinkWrap[] = [],
  blockName = 'Billede + tekst',
) => ({
  blockType: 'mediaContent',
  blockName,
  media,
  imagePosition: position,
  richText: rt,
  links,
})

/** A standalone full-width image. */
export const mediaBlock = (media: string, blockName = 'Billede') => ({
  blockType: 'mediaBlock',
  blockName,
  media,
})

// ── other blocks ───────────────────────────────────────────────────────────—

export const cta = (rt: RichText, links: LinkWrap[], blockName = 'CTA') => ({
  blockType: 'cta',
  blockName,
  links,
  richText: rt,
})

/** A list of news posts pulled from the collection. */
export const archive = (introContent?: RichText, blockName = 'Nyheder') => ({
  blockType: 'archive',
  blockName,
  categories: [],
  ...(introContent ? { introContent } : {}),
  populateBy: 'collection',
  relationTo: 'posts',
})

export const testimonials = (
  heading_: string,
  intro: string,
  items: { quote: string; author: string; role: string }[],
  blockName = 'Udtalelser',
) => ({
  blockType: 'testimonials',
  blockName,
  heading: heading_,
  intro,
  items,
})

/** FAQ block from plain question/answer strings. */
export const faq = (
  items: { q: string; a: string }[],
  heading_?: string,
  blockName = 'FAQ',
) => ({
  blockType: 'faq',
  blockName,
  ...(heading_ ? { heading: heading_ } : {}),
  items: items.map((qa) => ({ question: qa.q, answer: richText(p(qa.a)) })),
})

// ── hero ──────────────────────────────────────────────────────────────────—

export const hero = {
  /** Full-bleed hero with a background image (front pages). */
  high: (media: string, rt: RichText, links: LinkWrap[] = []) => ({
    type: 'highImpact',
    media,
    richText: rt,
    links,
  }),
  /** Image + heading (om-os and content pages). */
  medium: (media: string, rt: RichText, links: LinkWrap[] = []) => ({
    type: 'mediumImpact',
    media,
    richText: rt,
    links,
  }),
  /** Text-only hero, no image. */
  low: (rt: RichText, links: LinkWrap[] = []) => ({
    type: 'lowImpact',
    richText: rt,
    links,
  }),
  /** No hero. */
  none: () => ({ type: 'none' }),
}
