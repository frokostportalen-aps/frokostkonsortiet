import type { ThemeVars } from '@/themes/tenantThemes'

import React from 'react'

/**
 * Injects per-site CSS variable overrides. Rendered inside the tenant layout
 * (after globals.css in document order), so its `:root` rules win. Brand colors
 * are also applied under `[data-theme='dark']` so they hold in dark mode;
 * background/foreground intentionally only affect light mode.
 */

// Strip anything that could break out of the CSS rule or inject markup.
const sanitize = (value?: string | null): string =>
  (value || '').replace(/[<>{};]/g, '').trim()

// [themeFieldName, cssVariable]
// The brand hue holds in both light and dark mode: `primary` is a mid-dark
// colour that works as a button fill against either background. `accent` is
// NOT here — across the family it's a pale warm *surface* (~92% lightness), so
// it belongs with the light-only surfaces below; carried into dark mode it
// produced pale islands and white-on-cream headings.
const BRAND_VARS = [
  ['primary', '--primary'],
  ['primaryForeground', '--primary-foreground'],
] as const

// Surfaces + shape only tint light mode, so dark mode stays a calm shared
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
  ['radius', '--radius'],
] as const

type ThemeFieldKey = (typeof BRAND_VARS)[number][0] | (typeof LIGHT_ONLY_VARS)[number][0]

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

  if (!brandDecls && !lightOnlyDecls) return null

  // Brand vars hold in both modes, so one combined selector covers `:root`
  // (light) and `[data-theme='dark']`; both have equal specificity, so listing
  // them together is identical to two separate rules. Surfaces/shape, by
  // contrast, are guarded by `:not([data-theme='dark'])` rather than a plain
  // `:root`: this <style> is injected after globals.css, and a bare `:root`
  // rule would match in dark mode too (equal specificity, later in source) and
  // clobber globals' dark surfaces (light background + light text = invisible).
  const css = [
    brandDecls ? `:root,[data-theme='dark']{${brandDecls}}` : '',
    lightOnlyDecls ? `:root:not([data-theme='dark']){${lightOnlyDecls}}` : '',
  ].join('')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
