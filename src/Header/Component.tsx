import type { Header as HeaderType } from '@/payload-types'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header({ tenantSlug }: { tenantSlug: string }) {
  const headerData = (await getCachedGlobal('header', tenantSlug, 1)()) as HeaderType | null

  return <HeaderClient data={headerData} />
}
