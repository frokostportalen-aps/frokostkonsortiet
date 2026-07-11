import type { Header as HeaderType } from '@/payload-types'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTenantTheme } from '@/themes/tenantThemes'
import React from 'react'

export async function Header({ tenantSlug }: { tenantSlug: string }) {
  const headerData = (await getCachedGlobal('header', tenantSlug, 1)()) as HeaderType | null

  // Resolved server-side so the theme registry stays out of the client bundle.
  const cta = getTenantTheme(tenantSlug)?.headerCta

  return <HeaderClient data={headerData} tenantSlug={tenantSlug} cta={cta} />
}
