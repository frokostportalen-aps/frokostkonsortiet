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
 * (primary/accent) apply in both light and dark mode; surfaces and shape only
 * shape light mode, so dark mode stays a calm, shared neutral across the family.
 */

/**
 * Per-site logo: either a wordmark (`text`, rendered in the site's own font) or
 * an image (`src` — an SVG/PNG URL or a file under /public, which overrides
 * `text`).
 */
export type TenantLogo = {
  text?: string
  src?: string
  width?: number
  height?: number
}

/** How small section labels ("eyebrows") are cased across a site. */
export type EyebrowStyle = 'smallcaps' | 'uppercase' | 'plain'

/** Front-page hero layout. `split` is editorial (type beside image); `overlay`
 *  is a full-bleed photo with the headline laid over it. */
export type HeroVariant = 'split' | 'overlay'

/**
 * The one recurring motif a site is remembered by. Drives the accent on cards
 * and section headings so the same components feel materially different:
 *   • `rule`  – a hairline (1px) in the brand colour: refined, editorial
 *   • `block` – a thick solid bar: bold, confident
 *   • `sketch`– a short underline under titles: earthy, hand-made
 */
export type Signature = 'rule' | 'block' | 'sketch'

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
  heroVariant?: HeroVariant
  signature?: Signature
  /** The site's standing call-to-action, shown as a button in the header. */
  headerCta?: { label: string; url: string }
  /**
   * Base colour for the overlay hero's readability scrim, as bare oklch
   * channels ("L C H") — composed with alpha in the hero. Lets a site tint the
   * photo toward its own identity (e.g. Fra Jorden's forest green) instead of
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

  // ── Fra Jorden — forest floor: deep green on warm paper, sage accents.
  //    Source Serif, squared corners, a hand-made underline motif.
  //    Hero: warm photo overlay.
  frajorden: {
    primary: 'oklch(40% 0.095 152)', // deep forest green
    primaryForeground: 'oklch(98.5% 0.008 110)',
    // Deep forest disappears against the dark surfaces; dark mode lifts it to
    // a fresh pale leaf with deep-green text.
    primaryDark: 'oklch(80% 0.08 148)',
    primaryForegroundDark: 'oklch(22% 0.05 150)',
    backgroundDark: 'oklch(15.5% 0.013 140)', // green-brown night
    cardDark: 'oklch(20% 0.015 140)',
    secondaryDark: 'oklch(26.5% 0.017 138)',
    borderDark: 'oklch(29.5% 0.018 138)',
    accent: 'oklch(92% 0.05 118)', // sage
    accentForeground: 'oklch(26% 0.055 150)',
    secondary: 'oklch(94.5% 0.035 112)',
    secondaryForeground: 'oklch(26% 0.05 150)',
    card: 'oklch(98% 0.012 105)',
    cardForeground: 'oklch(23.5% 0.032 145)',
    muted: 'oklch(95% 0.02 110)',
    mutedForeground: 'oklch(42% 0.04 145)',
    border: 'oklch(86.5% 0.028 118)',
    background: 'oklch(98.8% 0.008 98)', // warm paper
    foreground: 'oklch(23.5% 0.032 145)',
    radius: '0.25rem',
    heroTheme: 'dark',
    logo: { text: 'Fra Jorden' },
    faviconFamily: 'serif',
    tagline: 'Økologisk · fra jorden til bordet',
    eyebrow: 'uppercase',
    heroVariant: 'overlay',
    signature: 'sketch',
    headerCta: { label: 'Få et tilbud', url: '/om-os#tilbud' },
    // Forest-tinted scrim so the hero photo reads green, not neutral black.
    heroScrim: '20% 0.05 150',
  },
}

export const getTenantTheme = (slug?: string | null): ThemeVars | null =>
  (slug && tenantThemes[slug]) || null

export const getTenantLogo = (slug?: string | null): TenantLogo | null =>
  getTenantTheme(slug)?.logo || null
