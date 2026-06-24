import type { User } from '@/payload-types'

/**
 * Super-admins are not bound to a single tenant — they can read/write content
 * across every site and see all tenants in the admin tenant selector.
 */
export const isSuperAdmin = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}
