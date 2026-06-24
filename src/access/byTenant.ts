import type { Access } from 'payload'

import { getTenantAccess, getUserTenantIDs } from '@payloadcms/plugin-multi-tenant/utilities'

import { isSuperAdmin } from './isSuperAdmin'

/**
 * Create: super-admins always; other users only if assigned to at least one tenant.
 */
export const createByTenant: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdmin(user)) return true
  return getUserTenantIDs(user).length > 0
}

/**
 * Update/delete: super-admins always; other users constrained to their tenant(s).
 */
export const mutateByTenant: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdmin(user)) return true
  return getTenantAccess({ fieldName: 'tenant', user })
}

/**
 * Read for draft-enabled collections (pages/posts):
 * - anonymous → only published docs (the frontend further scopes by host)
 * - super-admins → everything
 * - other users → their tenant(s), drafts included
 */
export const readByTenantOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    if (isSuperAdmin(user)) return true
    return getTenantAccess({ fieldName: 'tenant', user })
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
