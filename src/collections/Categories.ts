import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { createByTenant, mutateByTenant } from '../access/byTenant'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: createByTenant,
    delete: mutateByTenant,
    read: anyone,
    update: mutateByTenant,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
