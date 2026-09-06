import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isSuperAdmin } from '../../access/isSuperAdmin'
import { selfOrSuperAdmin, superAdminOnly } from '../../access/selfOrSuperAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Every logged-in user reaches the admin panel; what they see there is
    // scoped per collection.
    admin: authenticated,
    create: superAdminOnly,
    delete: superAdminOnly,
    read: selfOrSuperAdmin,
    update: selfOrSuperAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only super-admins may grant or revoke roles.
        create: ({ req: { user } }) => isSuperAdmin(user),
        update: ({ req: { user } }) => isSuperAdmin(user),
      },
      admin: {
        description: 'Super Admins manage all sites; editors are limited to their assigned tenants.',
      },
    },
  ],
  // The multi-tenant plugin injects the `tenants` array field here, linking
  // each editor to the site(s) they may manage.
  timestamps: true,
}
