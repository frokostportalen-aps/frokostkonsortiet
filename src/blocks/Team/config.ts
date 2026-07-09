import type { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: {
    singular: 'Mød køkkenet',
    plural: 'Mød køkkenet',
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
      name: 'members',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Person',
        plural: 'Personer',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Portræt',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Navn',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Rolle',
        },
        {
          name: 'quote',
          type: 'text',
          label: 'Citat',
          admin: {
            description: 'Én sætning i personens egne ord – vises under portrættet.',
          },
        },
      ],
    },
  ],
}
