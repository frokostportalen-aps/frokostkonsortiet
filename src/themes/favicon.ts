import { getTenantTheme } from './tenantThemes'

/**
 * Per-tenant favicon as an inline SVG data URI: the site's initial on a
 * rounded square in the tenant's brand colours, with the corner radius scaled
 * from the tenant's `--radius`. Everything derives from the theme, so a new
 * tenant gets a distinct tab mark without shipping per-tenant icon files.
 */
export const getTenantFavicon = (slug?: string | null): string | null => {
  const theme = getTenantTheme(slug)
  const letter = theme?.logo?.text?.trim().charAt(0).toUpperCase()
  if (!letter || !theme?.primary || !theme?.accent) return null

  // The icon renders at ~2rem in a tab, so 1rem of tenant radius maps to
  // 32 units of the 64-unit viewBox.
  const radius = Math.round(parseFloat(theme.radius ?? '0.5') * 32)

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>` +
    `<rect width='64' height='64' rx='${radius}' fill='${theme.primary}'/>` +
    `<text x='32' y='32' dy='0.36em' text-anchor='middle' font-family='${theme.faviconFamily ?? 'sans-serif'}' font-size='40' font-weight='600' fill='${theme.accent}'>${letter}</text>` +
    `</svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
