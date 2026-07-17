import type { Header as HeaderType } from '@/payload-types'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTenantTheme } from '@/themes/tenantThemes'
import { resolveTenantBrand } from '@/themes/resolveTenantBrand'
import React from 'react'

export async function Header({ tenantSlug }: { tenantSlug: string }) {
  // Independent lookups — run them concurrently.
  const [headerData, brand] = await Promise.all([
    getCachedGlobal('header', tenantSlug, 1)() as Promise<HeaderType | null>,
    resolveTenantBrand(tenantSlug),
  ])

  // Resolved server-side so the theme registry stays out of the client bundle.
  const cta = getTenantTheme(tenantSlug)?.headerCta

  return <HeaderClient data={headerData} cta={cta} logo={brand.logo} />
}
