import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: {
    singular: 'Sådan foregår det',
    plural: 'Sådan foregår det',
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
      maxRows: 5,
      labels: {
        singular: 'Trin',
        plural: 'Trin',
      },
      admin: {
        description: 'En nummereret proces – fx "I ringer → vi smager til → frokosten lander".',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Beskrivelse',
        },
      ],
    },
  ],
}
