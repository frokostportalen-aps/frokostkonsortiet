import type { Block } from 'payload'

import { eyebrowField } from '@/fields/eyebrow'
import { ICON_OPTIONS } from '@/blocks/IconRow/options'
import { TONE_OPTIONS } from './options'

export const FlipCards: Block = {
  slug: 'flipCards',
  interfaceName: 'FlipCardsBlock',
  labels: {
    singular: 'Vendekort',
    plural: 'Vendekort',
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
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: 'Kort',
        plural: 'Kort',
      },
      admin: {
        description:
          'Op til tre kort står side om side. Fra det fjerde bliver rækken en slider, man kan swipe eller pile sig igennem. Hvert kort har en forside (billede eller ikon) og en bagside, der vendes frem.',
      },
      fields: [
        {
          name: 'front',
          type: 'select',
          required: true,
          defaultValue: 'image',
          label: 'Forside',
          options: [
            { label: 'Billede', value: 'image' },
            { label: 'Ikon', value: 'icon' },
          ],
          admin: {
            description:
              'Et billede fylder kortet ud med et farvet bånd nederst. Et ikon giver et roligt kort med stregtegning – til det, der ikke er et foto værd (fx "Mælk").',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Billede',
          admin: {
            condition: (_, siblingData) => siblingData?.front === 'image',
          },
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Ikon',
          options: [...ICON_OPTIONS],
          admin: {
            condition: (_, siblingData) => siblingData?.front === 'icon',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Forsidetekst',
          admin: { description: 'Kort – fx "Small" eller "Mælk". Sættes i sitets versaler.' },
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'auto',
          label: 'Farve',
          options: [...TONE_OPTIONS],
          admin: {
            description:
              'Farven på bagsiden og på forsidens bånd. "Skiftevis" giver kortene rækkens egen rytme – vælg kun en fast farve, hvis et bestemt kort skal skille sig ud.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Bagsidens overskrift',
          admin: { description: 'Fx "450 gram" eller "Vores mest populære".' },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Bagsidens underlinje',
          admin: { description: 'Én kort linje under overskriften – fx "Pr. person".' },
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Bagsidens tekst',
        },
        {
          name: 'lines',
          type: 'array',
          label: 'Prislinjer',
          labels: {
            singular: 'Linje',
            plural: 'Linjer',
          },
          admin: {
            description:
              'Til de kort, der er et lille prisskilt. Står under teksten, med prikket linje ud til prisen. Lad feltet være tomt, hvis kortet bare fortæller noget.',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Navn',
            },
            {
              name: 'note',
              type: 'text',
              label: 'Uddybning',
              admin: { description: 'Valgfri linje under navnet – fx "Min- og skummetmælk".' },
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              label: 'Pris',
              admin: { description: 'Fx "13,-" eller "fra 22,-".' },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
          label: 'Fodnote',
          admin: { description: 'Lille linje nederst på bagsiden – fx "Alle priser er ex moms".' },
        },
      ],
    },
  ],
}
