import type { Block } from 'payload'

export const PriceMenu: Block = {
  slug: 'priceMenu',
  interfaceName: 'PriceMenuBlock',
  labels: {
    singular: 'Menukort med priser',
    plural: 'Menukort med priser',
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
      name: 'sections',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Sektion',
        plural: 'Sektioner',
      },
      admin: {
        description:
          'Et menukort i sektioner – fx "Frokostordning", "Tilkøb", "Drikkevarer". Hver sektion har sine egne linjer med pris.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Sektionstitel',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Kort beskrivelse',
        },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          labels: {
            singular: 'Linje',
            plural: 'Linjer',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Navn',
            },
            {
              name: 'description',
              type: 'text',
              label: 'Beskrivelse',
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              label: 'Pris',
              admin: {
                description: 'Fx "58 kr." eller "fra 145 kr."',
              },
            },
            {
              name: 'unit',
              type: 'text',
              label: 'Enhed',
              admin: {
                description: 'Fx "pr. kuvert", "pr. md." eller "pr. person".',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Fremhævet',
              admin: {
                description: 'Fremhæver linjen som det anbefalede valg.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fodnote',
      admin: {
        description: 'Fx "Alle priser er ekskl. moms og levering."',
      },
    },
  ],
}
