import type { ThemeVars } from '@/themes/tenantThemes'

import React from 'react'

/**
 * Injects per-site CSS variable overrides. Rendered inside the tenant layout
 * (after globals.css in document order), so its `:root` rules win. Brand colors
 * are also applied under `[data-theme='dark']` so they hold in dark mode;
 * background/foreground intentionally only affect light mode.
 */

// Strip anything that could break out of the CSS rule or inject markup.
const sanitize = (value?: string | null): string => (value || '').replace(/[<>{};]/g, '').trim()

// [themeFieldName, cssVariable]
// The brand hue holds in both light and dark mode: `primary` is a mid-dark
// colour that works as a button fill against either background. `accent` is
// NOT here — across the family it's a pale warm *surface* (~92% lightness), so
// it belongs with the light-only surfaces below; carried into dark mode it
// produced pale islands and white-on-cream headings.
// The wordmark hero's panel is a fixed brand surface rather than an ambient
// one, so it and its two text colours hold in both modes (see `ThemeVars`).
const BRAND_VARS = [
  // Not a colour, but like the brand colours it holds in both modes: a site's
  // type scale is the same after dark.
  ['displayScale', '--display-scale'],
  ['textInset', '--text-inset'],
  ['primary', '--primary'],
  ['eco', '--eco'],
  ['ecoForeground', '--eco-foreground'],
  ['primaryForeground', '--primary-foreground'],
  ['heroPanel', '--hero-panel'],
  ['heroWordmark', '--hero-wordmark'],
  ['heroScrim', '--hero-scrim'],
  ['heroPanelForeground', '--hero-panel-foreground'],
  // Shape, like the scale above: a site's corners are its corners after dark
  // too. Filed with the surfaces it would silently revert to the family
  // default in dark mode — sharp corners turning round at night.
  ['radius', '--radius'],
] as const

// Optional dark-mode overrides for the brand vars — for brands whose primary
// is too dark to read against the shared dark surfaces (e.g. FK's ink, which
// flips to its curry accent after dark).
const DARK_ONLY_VARS = [
  ['primaryDark', '--primary'],
  ['primaryForegroundDark', '--primary-foreground'],
  ['backgroundDark', '--background'],
  ['cardDark', '--card'],
  ['secondaryDark', '--secondary'],
  ['borderDark', '--border'],
] as const

// The ambient surfaces only tint light mode, so dark mode stays a calm shared
// neutral across the family while each site keeps its own daylight identity.
const LIGHT_ONLY_VARS = [
  ['accent', '--accent'],
  ['accentForeground', '--accent-foreground'],
  ['secondary', '--secondary'],
  ['secondaryForeground', '--secondary-foreground'],
  ['card', '--card'],
  ['cardForeground', '--card-foreground'],
  ['muted', '--muted'],
  ['mutedForeground', '--muted-foreground'],
  ['border', '--border'],
  ['background', '--background'],
  ['foreground', '--foreground'],
] as const

type ThemeFieldKey =
  | (typeof BRAND_VARS)[number][0]
  | (typeof LIGHT_ONLY_VARS)[number][0]
  | (typeof DARK_ONLY_VARS)[number][0]

export function TenantTheme({ theme }: { theme?: ThemeVars | null }) {
  if (!theme) return null

  const declarations = (pairs: ReadonlyArray<readonly [ThemeFieldKey, string]>): string =>
    pairs
      .map(([key, cssVar]) => {
        const value = sanitize((theme as Record<string, string | null | undefined>)[key])
        return value ? `${cssVar}:${value};` : ''
      })
      .join('')

  const brandDecls = declarations(BRAND_VARS)
  const lightOnlyDecls = declarations(LIGHT_ONLY_VARS)
  const darkOnlyDecls = declarations(DARK_ONLY_VARS)

  if (!brandDecls && !lightOnlyDecls && !darkOnlyDecls) return null

  // Brand vars hold in both modes, so one combined selector covers `:root`
  // (light), `[data-theme='dark']` and `[data-theme='light']` — the last so a
  // subtree pinned to the light palette keeps *this site's* brand colours
  // rather than falling back to the family defaults in globals.css. They have
  // equal specificity, so listing them together is identical to separate rules. Surfaces/shape, by
  // contrast, are guarded by `:not([data-theme='dark'])` rather than a plain
  // `:root`: this <style> is injected after globals.css, and a bare `:root`
  // rule would match in dark mode too (equal specificity, later in source) and
  // clobber globals' dark surfaces (light background + light text = invisible).
  // They also target `[data-theme='light']`, so a subtree pinned to the light
  // palette gets this site's surfaces rather than the family defaults.
  const css = [
    brandDecls ? `:root,[data-theme='dark'],[data-theme='light']{${brandDecls}}` : '',
    lightOnlyDecls ? `:root:not([data-theme='dark']),[data-theme='light']{${lightOnlyDecls}}` : '',
    // Emitted last, so it wins over the combined brand rule after dark.
    darkOnlyDecls ? `[data-theme='dark']{${darkOnlyDecls}}` : '',
  ].join('')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
