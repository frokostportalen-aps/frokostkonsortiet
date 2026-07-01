import { getTenantTheme } from './tenantThemes'
import type { EyebrowStyle, HeroVariant, Signature } from './tenantThemes'

/**
 * A site's **dialect** — the small set of personality axes that make one shared
 * grammar read as three distinct voices ("ét sprog, tre dialekter"). This is the
 * one seam for "what is this kitchen's personality?": components that express it
 * read the dialect here rather than receiving it threaded through props from
 * layers that don't care about it.
 *
 * The dialect is deliberately separate from the CSS/colour theme in
 * `tenantThemes.ts`: colours are injected as CSS variables, whereas the dialect
 * is read in JSX to pick markers, hero layout and eyebrow casing.
 */
export type Dialect = {
  eyebrow: EyebrowStyle
  heroVariant: HeroVariant
  signature: Signature
  tagline?: string
}

export type { EyebrowStyle, HeroVariant, Signature }

/** Family defaults, applied to any axis a site leaves unset. */
const DIALECT_DEFAULTS: Dialect = {
  eyebrow: 'uppercase',
  heroVariant: 'overlay',
  signature: 'rule',
}

/** The resolved dialect for a site, with family defaults filled in. */
export const getDialect = (slug?: string | null): Dialect => {
  const theme = getTenantTheme(slug)
  if (!theme) return DIALECT_DEFAULTS
  return {
    eyebrow: theme.eyebrow ?? DIALECT_DEFAULTS.eyebrow,
    heroVariant: theme.heroVariant ?? DIALECT_DEFAULTS.heroVariant,
    signature: theme.signature ?? DIALECT_DEFAULTS.signature,
    tagline: theme.tagline,
  }
}
