import type { CollectionConfig } from 'payload'

import { link } from '@/fields/link'
import { createByTenant, mutateByTenant } from '@/access/byTenant'
import { revalidateFooter } from './hooks/revalidateFooter'

/**
 * Formerly a global. Now a tenant-scoped collection (one document per tenant,
 * enforced by the multi-tenant plugin's `isGlobal` option) so each site has its
 * own footer navigation.
 */
export const Footer: CollectionConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    create: createByTenant,
    update: mutateByTenant,
    delete: mutateByTenant,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
