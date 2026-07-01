import { Mulish, Playfair_Display, Poppins, Source_Serif_4 } from 'next/font/google'

/**
 * Per-site fonts, keyed by tenant slug. Each font exposes a CSS variable; the
 * tenant layout applies the font's className (which defines that variable) to a
 * wrapper and points `--font-sans` at it, so the whole site uses it.
 *
 * Fonts must be initialised at module scope (next/font requirement), so add a
 * new font here and reference it in `tenantFonts` below.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

// Clean humanist sans for body copy. Playfair stays for headings (see smagssans
// below) — display serifs are elegant for titles but hard to read in running
// text, so the body gets a proper sans.
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mulish',
  display: 'swap',
})

export type TenantFont = {
  /** next/font className that defines the body font's CSS variable */
  className: string
  /** the value to assign to --font-sans, e.g. "var(--font-mulish)" */
  sansVar: string
  /** optional second next/font className for a separate heading font */
  headingClassName?: string
  /** optional value for --font-heading; when set, h1–h6 use it */
  headingVar?: string
}

export const tenantFonts: Record<string, TenantFont> = {
  'frokost-konsortiet': { className: poppins.variable, sansVar: 'var(--font-poppins)' },
  smagssans: {
    className: mulish.variable,
    sansVar: 'var(--font-mulish)',
    headingClassName: playfair.variable,
    headingVar: 'var(--font-playfair)',
  },
  frajorden: { className: sourceSerif.variable, sansVar: 'var(--font-source-serif)' },
}

export const getTenantFont = (slug?: string | null): TenantFont | null =>
  (slug && tenantFonts[slug]) || null
