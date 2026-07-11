/**
 * Reusable block builders for composing pages. A page file imports these and
 * assembles a `layout` array freely — placing images (`img('name')`), text,
 * media+text splits, CTAs, FAQs, etc. wherever it likes.
 *
 * The lexical helpers (`heading`, `p`, `list`, `richText`, `link`) are
 * re-exported here so a page file only needs one import.
 */
import { heading, link, list, p, paragraph, richText, text } from '../lexical'

export { heading, link, list, p, paragraph, richText, text }

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

/** Big key-figures band (2–4 numbers). Theme-aware, reusable across tenants. */
export const stats = (
  items: { value: string; label: string }[],
  heading_?: string,
  intro?: string,
  blockName = 'Nøgletal',
) => ({
  blockType: 'stats',
  blockName,
  ...(heading_ ? { heading: heading_ } : {}),
  ...(intro ? { intro } : {}),
  items,
})

/** A restaurant-style menu with prices (sections of lines with dotted leaders). */
export type PriceMenuItem = {
  name: string
  description?: string
  price: string
  unit?: string
  featured?: boolean
}
export type PriceMenuSection = {
  title: string
  description?: string
  items: PriceMenuItem[]
}
export const priceMenu = (
  opts: {
    heading?: string
    intro?: string
    sections: PriceMenuSection[]
    note?: string
  },
  blockName = 'Menukort',
) => ({
  blockType: 'priceMenu',
  blockName,
  ...opts,
})

/** Embedded form (plugin-form-builder) with an optional intro heading. */
export const formBlock = (formID: string, intro?: RichText, blockName = 'Formular') => ({
  blockType: 'formBlock',
  blockName,
  form: formID,
  enableIntro: !!intro,
  ...(intro ? { introContent: intro } : {}),
})

/** Numbered process steps ("I ringer -> vi smager til -> frokosten lander"). */
export const steps = (
  items: { title: string; description?: string }[],
  heading_?: string,
  intro?: string,
  blockName = 'Sådan foregår det',
) => ({
  blockType: 'steps',
  blockName,
  ...(heading_ ? { heading: heading_ } : {}),
  ...(intro ? { intro } : {}),
  items,
})

/** The people behind the food — portraits with a personal one-liner. */
export const team = (
  members: { image: string; name: string; role?: string; quote?: string }[],
  heading_?: string,
  intro?: string,
  blockName = 'Mød køkkenet',
) => ({
  blockType: 'team',
  blockName,
  ...(heading_ ? { heading: heading_ } : {}),
  ...(intro ? { intro } : {}),
  members,
})

/** Interactive quote wizard (need + headcount -> recommendation + contact form). */
export const planPicker = (
  opts: {
    heading?: string
    intro?: string
    plans: {
      need: 'frokost' | 'kantine' | 'catering'
      minPeople: number
      title: string
      description?: string
      priceLabel?: string
      url: string
    }[]
    /** The tenant's standing quote form (ctx.tilbudsFormID). */
    form: string
  },
  blockName = 'Ordningsvælger',
) => ({
  blockType: 'planPicker',
  blockName,
  ...opts,
})

/** Typographic client wall ("Arbejdspladser der spiser med"). */
export const clientList = (
  names: string[],
  heading_ = 'Arbejdspladser der spiser med',
  blockName = 'Kundeliste',
) => ({
  blockType: 'clientList',
  blockName,
  heading: heading_,
  clients: names.map((name) => ({ name })),
})

/** Vertical timeline (company history etc.). Theme-aware, reusable across tenants. */
export const timeline = (
  items: { year: string; title: string; description?: string }[],
  heading_?: string,
  intro?: string,
  blockName = 'Tidslinje',
) => ({
  blockType: 'timeline',
  blockName,
  ...(heading_ ? { heading: heading_ } : {}),
  ...(intro ? { intro } : {}),
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

/** How the hero image fills its frame. `contain` shows the whole image without
 *  cropping — use it for subjects with breathing room, e.g. cut-out photos. */
type HeroOpts = { fit?: 'cover' | 'contain' }

export const hero = {
  /** Full-bleed hero with a background image (front pages). */
  high: (media: string, rt: RichText, links: LinkWrap[] = [], opts: HeroOpts = {}) => ({
    type: 'highImpact',
    media,
    richText: rt,
    links,
    mediaFit: opts.fit ?? 'cover',
  }),
  /** Image + heading (om-os and content pages). */
  medium: (media: string, rt: RichText, links: LinkWrap[] = [], opts: HeroOpts = {}) => ({
    type: 'mediumImpact',
    media,
    richText: rt,
    links,
    mediaFit: opts.fit ?? 'cover',
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
