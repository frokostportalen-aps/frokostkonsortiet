import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const MediaContent: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Content',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'mediaRatio',
      type: 'select',
      defaultValue: 'half',
      label: 'Billedets bredde',
      admin: {
        description:
          'Halvdelen: billedet fylder sin halvdel af båndet fra kant til kant. En tredjedel: et smallere billede med luft omkring og teksten i de resterende to tredjedele – til portrætter og motiver, der ikke skal fylde halvdelen.',
      },
      options: [
        { label: 'Halvdelen', value: 'half' },
        { label: 'En tredjedel', value: 'oneThird' },
      ],
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      label: 'Tekstjustering',
      options: [
        { label: 'Venstrestillet', value: 'left' },
        { label: 'Centreret', value: 'center' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 2 },
    }),
  ],
}
