import type { Block } from 'payload'

export const ClientList: Block = {
  slug: 'clientList',
  interfaceName: 'ClientListBlock',
  labels: {
    singular: 'Kundeliste',
    plural: 'Kundelister',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
      defaultValue: 'Arbejdspladser der spiser med',
    },
    {
      name: 'clients',
      type: 'array',
      minRows: 3,
      labels: {
        singular: 'Kunde',
        plural: 'Kunder',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Virksomhedsnavn',
        },
      ],
    },
  ],
}
