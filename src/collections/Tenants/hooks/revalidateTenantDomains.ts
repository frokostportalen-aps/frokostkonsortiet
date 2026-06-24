import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * The domain→tenant map consumed by `middleware.ts` (via `/api/tenant-domains`)
 * is cached under the `tenant-domains` tag. Busting the tag whenever a tenant's
 * domains change lets editors add/move sites without a redeploy.
 */
export const revalidateTenantDomains: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating tenant-domains after change to tenant: ${doc?.slug}`)
    revalidateTag('tenant-domains', 'max')
  }
  return doc
}

export const revalidateTenantDomainsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('tenant-domains', 'max')
  }
  return doc
}
