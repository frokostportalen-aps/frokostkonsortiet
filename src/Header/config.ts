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
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          admin: { layout: 'horizontal' },
        },
        // A plain link. Hidden (and not validated) for dropdown items.
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.type !== 'dropdown',
            },
          },
        }),
        // A dropdown only needs a label — the destinations live in its sub items.
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub items',
          minRows: 1,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/RowLabel#RowLabel',
            },
          },
        },
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
