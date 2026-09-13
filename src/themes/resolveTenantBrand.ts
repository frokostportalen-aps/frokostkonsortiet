import { cache } from 'react'

import type { Brand, Media } from '@/payload-types'
import type { TenantLogo } from './tenantThemes'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getTenantBySlug } from '@/utilities/getTenant'
import { getTenantLogo, getTenantTheme } from './tenantThemes'
import { getTenantFavicon } from './favicon'

export type TenantBrand = {
  /** The logo to render, with a text wordmark fallback baked into `text`. */
  logo: TenantLogo
  /** A favicon URL (uploaded image or the generated letter-mark data URI). */
  favicon: string | null
  /** The standing line the heroes carry above their headings, if the site has one. */
  tagline?: string
}

/** A populated upload field → its cache-busted media URL (or undefined). */
const mediaUrl = (value: Media | string | null | undefined): string | undefined =>
  value && typeof value === 'object' && value.url
    ? getMediaUrl(value.url, value.updatedAt)
    : undefined

/**
 * Resolve a tenant's brand assets (logo + favicon) for rendering, with a
 * deterministic fallback chain at every step:
 *
 *   logo  → uploaded image (+ optional light-on-dark variant)
 *         → the theme registry's logo image, if configured in code
 *         → a text wordmark (registry `logo.text`, else the tenant name)
 *
 *   favicon → uploaded image
 *           → the generated letter-mark from the theme colours
 *
 *   tagline → the editor's own line
 *           → the theme registry's, so a site that has never been edited still
 *             speaks in its own voice
 *
 * So a site always has something to show, whether or not its editors have
 * uploaded anything.
 *
 * Wrapped in React cache() so the layout's metadata, the header and the footer
 * share one resolution per request instead of four.
 */
export const resolveTenantBrand = cache(async (tenantSlug: string): Promise<TenantBrand> => {
  const [brand, tenant] = await Promise.all([
    getCachedGlobal('brand', tenantSlug, 1)() as Promise<Brand | null>,
    getTenantBySlug(tenantSlug),
  ])

  const registry = getTenantLogo(tenantSlug)
  // Text fallback: theme wordmark → tenant name → family default.
  const text = registry?.text || tenant?.name || 'Frokost Konsortiet'

  const src = mediaUrl(brand?.logo)
  const srcDark = mediaUrl(brand?.logoDark)
  const uploadedAlt =
    brand?.logo && typeof brand.logo === 'object' ? brand.logo.alt || undefined : undefined

  const logo: TenantLogo = src
    ? {
        src,
        srcDark,
        text: uploadedAlt || text,
        width:
          brand?.logo && typeof brand.logo === 'object'
            ? (brand.logo.width ?? undefined)
            : undefined,
        height:
          brand?.logo && typeof brand.logo === 'object'
            ? (brand.logo.height ?? undefined)
            : undefined,
        // Render size stays a design decision in the registry, even when the
        // image itself comes from an upload.
        displayHeight: registry?.displayHeight,
      }
    : // No uploaded logo → keep any registry image, but always carry the text —
      // and an uploaded dark variant, so dark surfaces can still show it.
      { ...registry, ...(srcDark ? { srcDark } : {}), text }

  const favicon = mediaUrl(brand?.favicon) ?? getTenantFavicon(tenantSlug)
  const tagline = brand?.tagline?.trim() || getTenantTheme(tenantSlug)?.tagline

  return { logo, favicon, tagline }
})
