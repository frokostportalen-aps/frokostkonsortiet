/**
 * Hardcoded per-site CSS variable overrides, keyed by tenant slug. Add a new
 * site's colors here; values accept any CSS color (oklch, hex, …). Brand colors
 * apply in both light and dark mode; background/foreground affect light mode.
 *
 * These are injected by `TenantTheme` (rendered in the tenant layout).
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

export type ThemeVars = {
  primary?: string
  primaryForeground?: string
  accent?: string
  accentForeground?: string
  background?: string
  foreground?: string
  radius?: string
  /**
   * Whether the high-impact hero (image overlay) uses light text on a dark
   * scrim ('dark') or dark text ('light'). Defaults to 'dark'.
   */
  heroTheme?: 'light' | 'dark'
  logo?: TenantLogo
}

export const tenantThemes: Record<string, ThemeVars> = {
  'frokost-konsortiet': {
    primary: 'oklch(47% 0.13 45)', // terracotta
    primaryForeground: 'oklch(98% 0 0)',
    accent: 'oklch(92% 0.05 70)',
    accentForeground: 'oklch(30% 0.08 45)',
    radius: '0.625rem',
    heroTheme: 'dark',
    logo: { text: 'Frokost Konsortiet' },
  },
  smagssans: {
    primary: 'oklch(45% 0.16 330)', // plum / berry
    primaryForeground: 'oklch(98% 0 0)',
    accent: 'oklch(92% 0.05 330)',
    accentForeground: 'oklch(30% 0.1 330)',
    radius: '1rem',
    heroTheme: 'light',
    logo: { text: 'Smagssans' },
  },
  frajorden: {
    primary: 'oklch(50% 0.13 150)', // green
    primaryForeground: 'oklch(98% 0 0)',
    accent: 'oklch(92% 0.06 150)',
    accentForeground: 'oklch(30% 0.09 150)',
    radius: '0.375rem',
    heroTheme: 'dark',
    logo: { text: 'Fra Jorden' },
  },
}

export const getTenantTheme = (slug?: string | null): ThemeVars | null =>
  (slug && tenantThemes[slug]) || null

export const getTenantLogo = (slug?: string | null): TenantLogo | null =>
  getTenantTheme(slug)?.logo || null
