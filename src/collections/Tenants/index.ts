import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { isSuperAdmin } from '../../access/isSuperAdmin'
import {
  revalidateTenantDomains,
  revalidateTenantDomainsAfterDelete,
} from './hooks/revalidateTenantDomains'

/**
 * A tenant is one site: the main "Frokost Konsortiet" plus each kitchen
 * (smagssans, frajorden, …). Every tenant-scoped document points at one of
 * these. The `domains` array is the editable source of truth that the Next.js
 * middleware uses to resolve an incoming host to a site.
 */
export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    // Only super-admins manage the list of sites and their domains.
    create: ({ req: { user } }) => isSuperAdmin(user),
    delete: ({ req: { user } }) => isSuperAdmin(user),
    update: ({ req: { user } }) => isSuperAdmin(user),
    // Read stays open: the public domain-resolution endpoint and frontend
    // tenant lookups need to read tenant slugs/domains without a user.
    read: anyone,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domains'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ position: undefined }),
    {
      name: 'domains',
      type: 'array',
      admin: {
        description:
          'Hostnames that resolve to this site, e.g. "smagssans.dk". Add "www." and any aliases as separate rows. Editing this updates routing without a redeploy.',
      },
      fields: [
        {
          name: 'domain',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isMain',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'The main Frokost Konsortiet site. It acts as the fallback for unknown hosts and may aggregate content across all kitchens.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTenantDomains],
    afterDelete: [revalidateTenantDomainsAfterDelete],
  },
}
