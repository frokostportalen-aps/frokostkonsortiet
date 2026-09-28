import type { Block } from 'payload'

import { eyebrowField } from '@/fields/eyebrow'
import { toneField } from '@/fields/tone'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Billedgalleri',
    plural: 'Billedgallerier',
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
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 24,
      labels: {
        singular: 'Billede',
        plural: 'Billeder',
      },
      admin: {
        description:
          'Samme kort som vendekortene: op til tre står side om side, fra det fjerde bliver rækken en slider. Et klik åbner billedet i stor størrelse.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Billede',
          // Only pictures: a video's controls would sit under the card's press
          // target, and the lightbox is drawn for a still.
          filterOptions: { mimeType: { contains: 'image' } },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Billedtekst',
          admin: {
            description:
              'Valgfri. Står i et farvet bånd under billedet og under det store billede. Uden tekst fylder billedet hele kortet.',
          },
        },
        toneField({
          description: 'Farven på båndet under billedet.',
          condition: (_, siblingData) => Boolean(siblingData?.caption),
        }),
      ],
    },
  ],
}
