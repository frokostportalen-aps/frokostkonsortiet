import { Playfair_Display, Poppins, Source_Serif_4 } from 'next/font/google'

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

export type TenantFont = {
  /** next/font className that defines the font's CSS variable */
  className: string
  /** the value to assign to --font-sans, e.g. "var(--font-playfair)" */
  sansVar: string
}

export const tenantFonts: Record<string, TenantFont> = {
  'frokost-konsortiet': { className: poppins.variable, sansVar: 'var(--font-poppins)' },
  smagssans: { className: playfair.variable, sansVar: 'var(--font-playfair)' },
  frajorden: { className: sourceSerif.variable, sansVar: 'var(--font-source-serif)' },
}

export const getTenantFont = (slug?: string | null): TenantFont | null =>
  (slug && tenantFonts[slug]) || null
