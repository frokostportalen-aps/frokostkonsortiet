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
 *                           read by components via `getTenantDesign`
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

  // ── personality (read by components, not injected as CSS) ──────────────────
  /** A short brand line shown as the hero eyebrow, e.g. "Siden 1980". */
  tagline?: string
  eyebrow?: EyebrowStyle
  heroVariant?: HeroVariant
  signature?: Signature
}

/** Resolved design personality with defaults applied. */
export type TenantDesign = {
  eyebrow: EyebrowStyle
  heroVariant: HeroVariant
  signature: Signature
  tagline?: string
}

const DESIGN_DEFAULTS: TenantDesign = {
  eyebrow: 'uppercase',
  heroVariant: 'overlay',
  signature: 'rule',
}

export const tenantThemes: Record<string, ThemeVars> = {
  // ── Frokost Konsortiet — the parent. Confident, geometric, warm terracotta.
  //    Signature: a bold block bar. Hero: full-bleed photo overlay.
  'frokost-konsortiet': {
    primary: 'oklch(47% 0.13 45)', // terracotta
    primaryForeground: 'oklch(98% 0 0)',
    accent: 'oklch(92% 0.05 70)', // warm sand
    accentForeground: 'oklch(30% 0.08 45)',
    secondary: 'oklch(96% 0.018 70)',
    secondaryForeground: 'oklch(30% 0.06 45)',
    card: 'oklch(98.5% 0.008 70)',
    cardForeground: 'oklch(22% 0.02 45)',
    muted: 'oklch(95.5% 0.012 70)',
    mutedForeground: 'oklch(45% 0.03 45)',
    border: 'oklch(89% 0.02 60)',
    background: 'oklch(99.3% 0.004 70)',
    foreground: 'oklch(22% 0.02 45)',
    radius: '0.5rem',
    heroTheme: 'dark',
    logo: { text: 'Frokost Konsortiet' },
    tagline: 'Frokostkonsortiet',
    eyebrow: 'uppercase',
    heroVariant: 'overlay',
    signature: 'block',
  },

  // ── Smagssans — refined editorial bistro. Deep dusty blue-green + warm cream,
  //    Playfair headings, hairline rules, small-caps eyebrows, soft radius.
  //    Hero: editorial split (type beside a bleeding photo).
  smagssans: {
    primary: 'oklch(40% 0.062 224)', // deep dusty blue-green
    primaryForeground: 'oklch(99% 0 0)',
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
    tagline: 'Siden 1980 · sæsonens køkken',
    eyebrow: 'smallcaps',
    heroVariant: 'split',
    signature: 'rule',
  },

  // ── Fra Jorden — earthy, organic, organic green. Source Serif, squared
  //    corners, a hand-made underline motif. Hero: warm photo overlay.
  frajorden: {
    primary: 'oklch(48% 0.11 148)', // grounded leaf green
    primaryForeground: 'oklch(99% 0 0)',
    accent: 'oklch(92% 0.045 130)', // pale sage
    accentForeground: 'oklch(28% 0.07 150)',
    secondary: 'oklch(95% 0.03 120)',
    secondaryForeground: 'oklch(28% 0.06 150)',
    card: 'oklch(98% 0.012 120)',
    cardForeground: 'oklch(23% 0.025 150)',
    muted: 'oklch(95% 0.018 120)',
    mutedForeground: 'oklch(44% 0.03 150)',
    border: 'oklch(88% 0.022 130)',
    background: 'oklch(99% 0.006 120)',
    foreground: 'oklch(23% 0.025 150)',
    radius: '0.25rem',
    heroTheme: 'dark',
    logo: { text: 'Fra Jorden' },
    tagline: 'Økologisk · fra jorden til bordet',
    eyebrow: 'uppercase',
    heroVariant: 'overlay',
    signature: 'sketch',
  },
}

export const getTenantTheme = (slug?: string | null): ThemeVars | null =>
  (slug && tenantThemes[slug]) || null

export const getTenantLogo = (slug?: string | null): TenantLogo | null =>
  getTenantTheme(slug)?.logo || null

/** The resolved design personality for a site, with family defaults filled in. */
export const getTenantDesign = (slug?: string | null): TenantDesign => {
  const theme = getTenantTheme(slug)
  if (!theme) return DESIGN_DEFAULTS
  return {
    eyebrow: theme.eyebrow ?? DESIGN_DEFAULTS.eyebrow,
    heroVariant: theme.heroVariant ?? DESIGN_DEFAULTS.heroVariant,
    signature: theme.signature ?? DESIGN_DEFAULTS.signature,
    tagline: theme.tagline,
  }
}
