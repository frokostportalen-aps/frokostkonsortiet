import { describe, it, expect } from 'vitest'

import { ownedByTenant, visiblePostsWhere } from '@/data/tenantScope'

describe('tenantScope', () => {
  describe('ownedByTenant', () => {
    it('scopes to exactly the given site', () => {
      expect(ownedByTenant('smagssans')).toEqual({
        'tenant.slug': { equals: 'smagssans' },
      })
    })
  })

  describe('visiblePostsWhere', () => {
    it('aggregates for the main tenant (no constraint)', () => {
      expect(visiblePostsWhere({ isMain: true }, 'frokost-konsortiet')).toEqual({})
    })

    it('scopes a kitchen to its own posts', () => {
      expect(visiblePostsWhere({ isMain: false }, 'smagssans')).toEqual({
        'tenant.slug': { equals: 'smagssans' },
      })
    })

    it('scopes when the tenant is unknown, never leaking across sites', () => {
      expect(visiblePostsWhere(null, 'frajorden')).toEqual({
        'tenant.slug': { equals: 'frajorden' },
      })
    })
  })
})
