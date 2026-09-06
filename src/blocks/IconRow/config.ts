import type { Block } from 'payload'

import { eyebrowField } from '@/fields/eyebrow'
import { ICON_OPTIONS } from './options'

export const IconRow: Block = {
  slug: 'iconRow',
  interfaceName: 'IconRowBlock',
  labels: {
    singular: 'Ikonrække',
    plural: 'Ikonrækker',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
    },
    eyebrowField,
    {
      name: 'intro',
      type: 'text',
      label: 'Underoverskrift',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      labels: {
        singular: 'Punkt',
        plural: 'Punkter',
      },
      admin: {
        description:
          'Vises som en række runde ikoner med tekst under. Ikonerne skifter tone på skift, så rækken får rytme – vælg dem, der faktisk viser noget forskelligt.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Ikon',
          options: [...ICON_OPTIONS],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Tekst',
          admin: { description: 'Kort – fx "Vegetar" eller "Levering til tiden".' },
        },
        {
          name: 'note',
          type: 'text',
          label: 'Uddybning',
          admin: { description: 'Valgfri linje under teksten – fx "Mindst én varm ret hver dag".' },
        },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Fodnote',
      admin: {
        description: 'Valgfri tekst i et fremhævet felt under rækken – fx hvordan hensynene håndteres i praksis.',
      },
    },
  ],
}
