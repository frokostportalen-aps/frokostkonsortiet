import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Tidslinje',
    plural: 'Tidslinjer',
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
      labels: {
        singular: 'Milepæl',
        plural: 'Milepæle',
      },
      admin: {
        description: 'Vises som en lodret tidslinje – fx virksomhedens historie år for år.',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          label: 'År / tidspunkt',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Overskrift',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Tekst',
        },
      ],
    },
  ],
}
