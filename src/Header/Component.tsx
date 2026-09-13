import type { Header as HeaderType } from '@/payload-types'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getDialect } from '@/themes/dialect'
import { getTenantTheme } from '@/themes/tenantThemes'
import { resolveTenantBrand } from '@/themes/resolveTenantBrand'
import React from 'react'

export async function Header({ tenantSlug }: { tenantSlug: string }) {
  // Independent lookups — run them concurrently.
  const [headerData, brand] = await Promise.all([
    getCachedGlobal('header', tenantSlug, 1)() as Promise<HeaderType | null>,
    resolveTenantBrand(tenantSlug),
  ])

  // The editor's button (Header → Knap i menuen), falling back to the site's own
  // from the registry. Resolved server-side either way, so the theme registry
  // stays out of the client bundle.
  const registryCta = getTenantTheme(tenantSlug)?.headerCta
  const cta =
    headerData?.ctaLabel && headerData?.ctaUrl
      ? { label: headerData.ctaLabel, url: headerData.ctaUrl }
      : registryCta
  const brandChrome = getDialect(tenantSlug).chrome === 'brand'

  return (
    <HeaderClient data={headerData} cta={cta} logo={brand.logo} brandChrome={brandChrome} />
  )
}
