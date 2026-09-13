import type { CollectionConfig } from 'payload'

import { link } from '@/fields/link'
import { createByTenant, mutateByTenant } from '@/access/byTenant'
import { revalidateHeader } from './hooks/revalidateHeader'

/**
 * Formerly a global. Now a tenant-scoped collection (one document per tenant,
 * enforced by the multi-tenant plugin's `isGlobal` option) so each site has its
 * own navigation and its own standing call-to-action. The plugin hides the list
 * view and injects the `tenant` field.
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
    {
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Knap i menuen',
          admin: {
            width: '50%',
            description:
              'Teksten på sitets faste knap i menulinjen – fx "Få et tilbud". Står feltet tomt, bruges sitets standardknap.',
          },
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'Knappens link',
          admin: {
            width: '50%',
            description: 'Hvor knappen fører hen, fx "/kontakt" eller "/om-os#tilbud".',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
