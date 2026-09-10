import React from 'react'

import type { WeeklyMenuBlock as WeeklyMenuBlockProps } from '@/payload-types'

import { getWeeklyMenuForTenant } from '@/data/weeklyMenu'
import { todayIsoInCopenhagen } from '@/utilities/isoWeek'
import { getDialect } from '@/themes/dialect'
import { WeeklyMenuClient } from './Component.client'

type Props = WeeklyMenuBlockProps & { tenantSlug?: string }

/**
 * Ugens menu, read live from frokostportalen.
 *
 * Which kitchen to ask comes from the *site*, resolved in the data layer from
 * the tenant's `kitchenId`. A site without one (the main Frokost Konsortiet
 * portal, which has no kitchen of its own) renders nothing rather than guessing
 * at a kitchen — aggregating every kitchen's week would be a different feature
 * with a different design, not a fallback.
 *
 * The fetch happens here, on the server, for two reasons: the upstream blocks
 * other origins with CORS, and rendering it server-side keeps the week inside
 * the page's ISR cache instead of costing every visitor a request.
 */
export const WeeklyMenuBlock: React.FC<Props> = async ({
  tenantSlug,
  heading,
  eyebrow,
  intro,
  note,
  emptyMessage,
  showAllergens,
  showCarbon,
  showVariants,
}) => {
  const menu = tenantSlug ? await getWeeklyMenuForTenant(tenantSlug) : null

  if (!menu) return null

  const { signature, eyebrow: eyebrowStyle } = getDialect(tenantSlug)

  return (
    <WeeklyMenuClient
      heading={heading}
      eyebrow={eyebrow}
      intro={intro}
      note={note}
      emptyMessage={emptyMessage}
      showAllergens={showAllergens}
      showCarbon={showCarbon}
      showVariants={showVariants}
      weeks={menu.weeks}
      unavailable={menu.unavailable}
      today={todayIsoInCopenhagen()}
      signature={signature}
      eyebrowStyle={eyebrowStyle}
    />
  )
}
