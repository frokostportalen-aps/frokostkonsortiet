import type { Block } from 'payload'

import { NEED_OPTIONS } from './options'

export const PlanPicker: Block = {
  slug: 'planPicker',
  interfaceName: 'PlanPickerBlock',
  labels: {
    singular: 'Ordningsvælger',
    plural: 'Ordningsvælgere',
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
      name: 'plans',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Anbefaling',
        plural: 'Anbefalinger',
      },
      admin: {
        description:
          'Vælgeren matcher besøgendes behov + antal mod disse anbefalinger. Ved flere match vælges den med højeste "fra antal"; rammer antallet under alle, vises den nærmeste ordning med en note om minimum.',
      },
      fields: [
        {
          name: 'need',
          type: 'select',
          required: true,
          label: 'Behov',
          options: [...NEED_OPTIONS],
        },
        {
          name: 'minPeople',
          type: 'number',
          required: true,
          defaultValue: 1,
          label: 'Fra antal personer',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Anbefaling',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Beskrivelse',
        },
        {
          name: 'priceLabel',
          type: 'text',
          label: 'Pris',
          admin: {
            description: 'Fx "fra 58 kr. pr. kuvert".',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link',
          admin: {
            description: 'Hvor "Læs mere"-knappen fører hen, fx "/frokost-ud-af-huset".',
          },
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Tilbudsformular',
      admin: {
        description:
          'Formularen besøgende udfylder i sidste trin (typisk "Få et tilbud"). Behov og antal udfyldes automatisk fra deres svar.',
      },
    },
  ],
}
