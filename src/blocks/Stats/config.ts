import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Nøgletal',
    plural: 'Nøgletal',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
    },
    {
      name: 'intro',
      type: 'text',
      label: 'Underoverskrift',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      labels: {
        singular: 'Tal',
        plural: 'Tal',
      },
      admin: {
        description: 'Vises som store nøgletal i et bånd – fx "1980", "5 køkkener", "100% grøn strøm".',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Tal / værdi',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Tekst',
        },
      ],
    },
  ],
}
