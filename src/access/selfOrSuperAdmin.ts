import type { Access } from 'payload'

import { isSuperAdmin } from './isSuperAdmin'

/**
 * The multi-tenant plugin already wraps this collection's access with
 * `{ or: [ self, sameTenant ] }`, which is why editors never saw the
 * super-admins — those have no tenant assigned. It does leave editors on the
 * same tenant able to change each other's password, so narrow it to self:
 * managing the roster is a super-admin job.
 */
export const selfOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdmin(user)) return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/** Creating and deleting users stays with super-admins. */
export const superAdminOnly: Access = ({ req: { user } }) => isSuperAdmin(user)
