import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../../access/anyone'
import { createByTenant, mutateByTenant } from '../../access/byTenant'
import { setTenantPrefix } from './hooks/setTenantPrefix'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: false,
  access: {
    create: createByTenant,
    delete: mutateByTenant,
    read: anyone,
    update: mutateByTenant,
  },
  hooks: {
    beforeChange: [setTenantPrefix],
  },
  fields: [
    {
      // Folder prefix in the storage bucket, set from the tenant slug by the
      // beforeChange hook above. The S3 storage plugin detects this existing
      // field and uses it as the per-document object-key prefix.
      name: 'prefix',
      type: 'text',
      admin: { hidden: true, readOnly: true },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
