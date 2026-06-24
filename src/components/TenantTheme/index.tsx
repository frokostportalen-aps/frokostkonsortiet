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
const BRAND_VARS = [
  ['primary', '--primary'],
  ['primaryForeground', '--primary-foreground'],
  ['accent', '--accent'],
  ['accentForeground', '--accent-foreground'],
] as const

const LIGHT_ONLY_VARS = [
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

  const rootDecls = declarations([...BRAND_VARS, ...LIGHT_ONLY_VARS])
  const darkDecls = declarations(BRAND_VARS)

  if (!rootDecls && !darkDecls) return null

  const css = [
    rootDecls ? `:root{${rootDecls}}` : '',
    darkDecls ? `[data-theme='dark']{${darkDecls}}` : '',
  ].join('')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
