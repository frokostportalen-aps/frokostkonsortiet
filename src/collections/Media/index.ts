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
    // Media streams through the API route (serverless function → R2) and is
    // served uncached by default, so even a tiny header-logo SVG costs a full
    // function round-trip on every page view. Cache aggressively instead: the
    // frontend's media URLs are cache-busted (`getMediaUrl` appends the doc's
    // `updatedAt`), so a changed upload always gets a fresh URL. The caveat is
    // URLs *without* the tag (the admin's raw file URLs): replacing a file
    // under the same filename (in practice only a `--force` re-seed) can show
    // the old asset in the admin until a hard refresh.
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable')
      return headers
    },
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
