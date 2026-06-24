import type { CollectionConfig } from 'payload'

import { link } from '@/fields/link'
import { createByTenant, mutateByTenant } from '@/access/byTenant'
import { revalidateHeader } from './hooks/revalidateHeader'

/**
 * Formerly a global. Now a tenant-scoped collection (one document per tenant,
 * enforced by the multi-tenant plugin's `isGlobal` option) so each site has its
 * own navigation. The plugin hides the list view and injects the `tenant` field.
 */
export const Header: CollectionConfig = {
  slug: 'header',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
