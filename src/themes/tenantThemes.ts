/**
 * Per-site theme + design personality, keyed by tenant slug.
 *
 * The platform hosts one family of food brands (the "Frokost Konsortiet"
 * family). Every site shares the same structural grammar — the block system,
 * spacing scale, buttons, header/footer — and differs only along a small set of
 * deliberate axes, so the family reads as one brand while each site keeps its
 * own voice ("ét sprog, tre dialekter"):
 *
 *   • palette + surfaces  – injected as CSS variables by `TenantTheme`
 *   • typography          – see `themes/fonts.ts`
 *   • shape (radius)      – injected as `--radius`
 *   • personality         – `eyebrow` / `heroVariant` / `signature` / `tagline`,
 *                           resolved as a site's *dialect* (see `themes/dialect.ts`)
 *
 * Colour values accept any CSS colour (oklch, hex, …). Brand colours
 * (primary/accent), shape and scale apply in both light and dark mode; the
 * ambient surfaces only tint light mode, so dark mode stays a calm, shared
 * neutral across the family.
 */

/**
 * Per-site logo: either a wordmark (`text`, rendered in the site's own font) or
 * an image (`src` — an SVG/PNG URL or a file under /public, which overrides
 * `text`).
 */
export type TenantLogo = {
  text?: string
  src?: string
  /** A light-on-dark logo variant, shown on dark surfaces (footer, dark heroes)
   *  when present. Falls back to `src`. */
  srcDark?: string
  width?: number
  height?: number
  /**
   * How tall the logo is rendered, in px (default 34). A wordmark reads fine at
   * the default; a round or stacked mark needs more height before its type is
   * legible, and the header grows with it.
   */
  displayHeight?: number
}

/**
 * How a site dresses its chrome — the header and footer.
 *   • `default` – they follow the page theme, and the header floats so a
 *                 full-bleed hero can run up behind it
 *   • `brand`   – they are fixed light surfaces (see `.brand-panel`), which a
 *                 logo drawn for light backgrounds needs. The header is then
 *                 opaque, so heroes must start below it rather than under it.
 */
export type Chrome = 'default' | 'brand'

/** How small section labels ("eyebrows") are cased across a site. */
export type EyebrowStyle = 'smallcaps' | 'uppercase' | 'plain'

/** Front-page hero layout. `split` is editorial (type beside image); `overlay`
 *  is a full-bleed photo with the headline laid over it; `wordmark` is a brand
 *  lockup — a diagonally cut photo against a solid panel, with the headline set
 *  as an oversized two-tone wordmark across the cut. */
export type HeroVariant = 'split' | 'overlay' | 'wordmark'

/**
 * The one recurring motif a site is remembered by. Drives the accent on cards
 * and section headings so the same components feel materially different:
 *   • `rule`  – a hairline (1px) in the brand colour: refined, editorial
 *   • `block` – a thick solid bar: bold, confident
 *   • `sketch`– a short underline under titles: earthy, hand-made
 */
export type Signature = 'rule' | 'block' | 'sketch'

/**
 * How a site presents its customer quotes. This is an identity choice, not a
 * count — a site that has plenty of quotes may still want them read one at a
 * time, and the block never infers the layout from `items.length`:
 *   • `marquee`  – a band of cards that scrolls on its own: the references are
 *                  a body of goodwill, and no single one is the point
 *   • `carousel` – a rail of cards stepped by hand: the references are named
 *                  individuals, and the site expects each to be read
 */
export type TestimonialsVariant = 'marquee' | 'carousel'

export type ThemeVars = {
  primary?: string
  primaryForeground?: string
  /** Optional dark-mode override for `primary` — for brands whose primary is
   *  too dark to read against the shared dark surfaces (e.g. ink). */
  primaryDark?: string
  primaryForegroundDark?: string
  /** Optional dark-mode surface tints, so each site keeps a whisper of its own
   *  hue after dark instead of collapsing into one shared charcoal. */
  backgroundDark?: string
  cardDark?: string
  secondaryDark?: string
  borderDark?: string
  accent?: string
  accentForeground?: string
  /** A second surface tone for cards/panels, distinct from `accent`. */
  secondary?: string
  secondaryForeground?: string
  card?: string
  cardForeground?: string
  muted?: string
  mutedForeground?: string
  border?: string
  background?: string
  foreground?: string
  radius?: string
  /**
   * How much bigger this site sets its section headings than the family
   * default, as a unitless multiplier ("1.25"). Injected as `--display-scale`
   * and applied to `.prose h2` and `.section-heading`, so a site whose layout
   * is drawn around large display type gets it everywhere at once instead of
   * per block. Unset means the family default (1).
   */
  displayScale?: string
  /**
   * How far loose prose is indented so it lines up with the copy inside a
   * band (which is inset by the band's own padding). Injected as
   * `--text-inset` and read by `.prose-inset`. Unset means no indent — the
   * family default, where prose sits flush with the band edge.
   */
  textInset?: string
  /**
   * The colour a site uses for climate and eco signals — CO2e figures, organic
   * marks, the numbers band when it carries them. Named for the meaning rather
   * than the placement, because that is how it is specified: Fra Jorden's
   * palette gives it as "en dæmpet grøn til klima- og øko-signaler". Sites
   * without one fall back to `primary` wherever it is offered.
   */
  eco?: string
  ecoForeground?: string
  /**
   * Whether the high-impact hero (image overlay) uses light text on a dark
   * scrim ('dark') or dark text ('light'). Defaults to 'dark'.
   */
  heroTheme?: 'light' | 'dark'
  logo?: TenantLogo
  /**
   * Generic font family for the SVG favicon's letter mark (favicons can't
   * load webfonts), so the tab icon echoes the site's type. Defaults to
   * 'sans-serif'.
   */
  faviconFamily?: 'serif' | 'sans-serif'

  // ── personality (read by components, not injected as CSS) ──────────────────
  /** A short brand line shown as the hero eyebrow, e.g. "Siden 1980". */
  tagline?: string
  eyebrow?: EyebrowStyle
  chrome?: Chrome
  heroVariant?: HeroVariant
  signature?: Signature
  testimonials?: TestimonialsVariant
  /** The site's standing call-to-action, shown as a button in the header. */
  headerCta?: { label: string; url: string }
  /**
   * The `wordmark` hero's brand panel. Unlike the ambient surfaces these hold
   * in *both* modes — the panel is a fixed brand surface, so its own text
   * colours travel with it instead of following the theme:
   *   • `heroPanel`           – the panel fill, and the wordmark's tone where it
   *                             crosses the photo (the panel reads as if it
   *                             continued through the letters)
   *   • `heroWordmark`        – the wordmark on the panel
   *   • `heroPanelForeground` – the subline on the panel
   * Each falls back to a theme colour, so a site can use the variant without
   * setting them: `--secondary` for the panel and `--secondary-foreground` for
   * both text roles. (Not `--primary` for the wordmark — the variant's CSS
   * re-points `--primary` at it, and a custom property that cycles computes to
   * nothing.)
   */
  heroPanel?: string
  heroWordmark?: string
  heroPanelForeground?: string
  /**
   * Base colour for the overlay hero's readability scrim, as bare oklch
   * channels ("L C H") — composed with alpha in the hero. Lets a site tint the
   * photo toward its own identity (e.g. Fra Jorden's warm olive) instead of
   * neutral black.
   */
  heroScrim?: string
}

export const tenantThemes: Record<string, ThemeVars> = {
  // ── Frokost Konsortiet — the parent. Graphic, structural: near-black ink +
  //    a curry-yellow accent that echoes the photography's turmeric and brass.
  //    The parent is the "institution"; the kitchens carry the colour.
  //    Signature: a bold block bar. Hero: full-bleed photo overlay.
  'frokost-konsortiet': {
    primary: 'oklch(25% 0.022 265)', // ink
    primaryForeground: 'oklch(98.5% 0.01 95)',
    // Ink buttons vanish against the shared dark surfaces, so dark mode
    // inverts to the curry accent — same two-colour identity, flipped.
    primaryDark: 'oklch(85% 0.115 92)',
    primaryForegroundDark: 'oklch(24% 0.022 265)',
    backgroundDark: 'oklch(15% 0.012 265)', // cold ink night
    cardDark: 'oklch(19.5% 0.014 265)',
    secondaryDark: 'oklch(26.5% 0.015 265)',
    borderDark: 'oklch(29.5% 0.016 265)',
    accent: 'oklch(88% 0.115 92)', // curry
    accentForeground: 'oklch(28% 0.05 80)',
    secondary: 'oklch(95.8% 0.012 90)',
    secondaryForeground: 'oklch(24% 0.02 265)',
    card: 'oklch(98.5% 0.006 90)',
    cardForeground: 'oklch(21% 0.018 265)',
    muted: 'oklch(95.5% 0.01 90)',
    mutedForeground: 'oklch(44% 0.02 260)',
    border: 'oklch(88.5% 0.014 90)',
    background: 'oklch(99.1% 0.004 90)',
    foreground: 'oklch(21% 0.018 265)',
    radius: '0.5rem',
    heroTheme: 'dark',
    logo: { text: 'Frokost Konsortiet' },
    tagline: 'Ét fællesskab af køkkener',
    eyebrow: 'uppercase',
    heroVariant: 'overlay',
    signature: 'block',
    headerCta: { label: 'Kontakt os', url: '/kontakt' },
  },

  // ── Smagssans — refined editorial bistro. Deep dusty blue-green + warm cream,
  //    Playfair headings, hairline rules, small-caps eyebrows, soft radius.
  //    Hero: editorial split (type beside a bleeding photo).
  smagssans: {
    primary: 'oklch(40% 0.062 224)', // deep dusty blue-green
    primaryForeground: 'oklch(99% 0 0)',
    // The deep petrol is mud against the dark surfaces, so dark mode lifts it
    // to a mid dusty petrol with ink text (74%: visible without going icy).
    primaryDark: 'oklch(74% 0.05 212)',
    primaryForegroundDark: 'oklch(20% 0.03 224)',
    backgroundDark: 'oklch(15.5% 0.014 220)', // deep petrol night
    cardDark: 'oklch(20% 0.016 220)',
    secondaryDark: 'oklch(27% 0.017 220)',
    borderDark: 'oklch(30% 0.018 220)',
    accent: 'oklch(92% 0.026 82)', // warm cream / sand
    accentForeground: 'oklch(25% 0.018 60)', // deep warm charcoal
    secondary: 'oklch(95.5% 0.018 84)', // soft warm panel
    secondaryForeground: 'oklch(25% 0.018 60)',
    card: 'oklch(98% 0.012 84)', // barely-tinted card surface
    cardForeground: 'oklch(21% 0.01 55)',
    muted: 'oklch(95% 0.01 84)',
    mutedForeground: 'oklch(44% 0.014 60)',
    border: 'oklch(88% 0.014 78)', // warm hairline
    background: 'oklch(99% 0.004 85)', // barely-warm off-white
    foreground: 'oklch(21% 0.01 55)', // near-black warm charcoal
    radius: '0.75rem',
    heroTheme: 'dark',
    logo: { text: 'Smagssans' },
    faviconFamily: 'serif',
    tagline: 'Siden 1980 · sæsonens køkken',
    eyebrow: 'smallcaps',
    heroVariant: 'split',
    signature: 'rule',
    headerCta: { label: 'Få et tilbud', url: '/om-os#tilbud' },
  },

  // ── Fra Jorden — the palette Audryn specifies, taken from the logo: sand
  //    #ECE6DC, terracotta #A0562D, ink #2A2A28. Terracotta is the only
  //    saturated colour and carries the wordmark, the buttons and the secondary
  //    voice; everything else is a step on the sand scale, so the page reads as
  //    one warm paper with a single accent rather than a stack of tints.
  //    Her fourth colour, a muted green #4E6B4A, carries the climate and eco
  //    signals — today the numbers band, and the CO2e figures once the week
  //    menu exists.
  frajorden: {
    primary: 'oklch(53.3% 0.112 48)', // terracotta
    primaryForeground: 'oklch(96.3% 0.013 82)', // lightest sand
    // Terracotta holds against the dark surfaces, so dark mode keeps it rather
    // than flipping to a lighter earth tone the way the olive palette had to.
    primaryDark: 'oklch(58% 0.112 48)',
    primaryForegroundDark: 'oklch(96.3% 0.013 82)',
    backgroundDark: 'oklch(16% 0.006 80)',
    cardDark: 'oklch(20.5% 0.007 80)',
    secondaryDark: 'oklch(27.5% 0.008 80)',
    borderDark: 'oklch(30.5% 0.009 80)',
    // The surfaces are four steps down one sand ramp: page, band, panel,
    // hairline. Keeping them on one hue is what stops the page looking washed
    // out — the old palette lifted every surface towards white, so nothing had
    // weight against the photography.
    background: 'oklch(92.7% 0.015 81)', // sand — the paper itself
    accent: 'oklch(89.1% 0.020 80)', // band, one step down
    accentForeground: 'oklch(30.4% 0.013 72)',
    secondary: 'oklch(87.0% 0.023 81)', // panel/card, two steps down
    secondaryForeground: 'oklch(32.9% 0.013 67)',
    muted: 'oklch(90.3% 0.017 79)',
    mutedForeground: 'oklch(49.5% 0.055 58)', // terracotta, desaturated
    border: 'oklch(83.7% 0.025 77)',
    card: 'oklch(95.3% 0.011 85)', // lifted off the paper, not white
    cardForeground: 'oklch(28.4% 0.004 107)',
    foreground: 'oklch(28.4% 0.004 107)', // ink
    radius: '0.25rem',
    displayScale: '1.25',
    textInset: '3rem',
    eco: 'oklch(49.5% 0.062 142)', // dæmpet grøn #4E6B4A
    ecoForeground: 'oklch(96.3% 0.013 82)', // lightest sand
    heroTheme: 'dark',
    // The front page is a brand lockup: the sand ramp's darkest step as the
    // panel, terracotta for the wordmark, ink for the subline — the palette's
    // own three colours, nothing borrowed.
    heroPanel: 'oklch(84.4% 0.025 77)',
    heroWordmark: 'oklch(53.3% 0.112 48)', // terracotta
    heroPanelForeground: 'oklch(28.4% 0.004 107)', // ink
    // A round badge with type around its edge: it needs the height to be read.
    logo: { text: 'Fra Jorden', displayHeight: 56 },
    faviconFamily: 'serif',
    tagline: 'Økologisk · fra jorden til bordet',
    eyebrow: 'uppercase',
    // The round logo is drawn for light backgrounds, so header and footer stay
    // light in both modes — and the header is opaque, so nothing tucks under it.
    chrome: 'brand',
    heroVariant: 'wordmark',
    signature: 'sketch',
    // Referencerne er navngivne mennesker fra navngivne huse, og oplægget sætter
    // dem én ad gangen med pile: læseren skal nå at læse hver enkelt færdig.
    testimonials: 'carousel',
    // Tilbudsformularen bor på Frokostordning-siden — om-os findes ikke længere.
    headerCta: { label: 'Få et tilbud', url: '/frokost-ud-af-huset#tilbud' },
    // Warm olive-slate scrim so the hero photo reads earthy, not neutral black.
    heroScrim: '28% 0.02 82',
  },
}

export const getTenantTheme = (slug?: string | null): ThemeVars | null =>
  (slug && tenantThemes[slug]) || null

export const getTenantLogo = (slug?: string | null): TenantLogo | null =>
  getTenantTheme(slug)?.logo || null
