import { afterEach, describe, it, expect, vi } from 'vitest'

import type { Tenant } from '@/payload-types'
import { getTenantCrossURL, getTenantServerURL, isTenantIndexable } from '@/utilities/getURL'

const tenant = (domains: { domain: string; primary?: boolean }[]) => ({ domains }) as Tenant

describe('tenant URL', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses the primary domain and marks the site indexable', () => {
    vi.stubEnv('NODE_ENV', 'production')
    const t = tenant([
      { domain: 'frajorden.localhost' },
      { domain: 'frajorden.dk', primary: true },
      { domain: 'new.frajorden.dk' },
    ])
    expect(getTenantServerURL(t)).toBe('https://frajorden.dk')
    expect(isTenantIndexable(t)).toBe(true)
  })

  it('never emits a *.localhost origin in production when no domain is primary', () => {
    vi.stubEnv('NODE_ENV', 'production')
    const t = tenant([
      { domain: 'smagssans.localhost' },
      { domain: 'smagssans.dk' },
      { domain: 'new.smagssans.dk' },
    ])
    expect(getTenantServerURL(t)).toBe('https://new.smagssans.dk')
    expect(isTenantIndexable(t)).toBe(false)
  })

  it('links to the primary domain across sites, but stays on *.localhost in dev', () => {
    const t = tenant([
      { domain: 'frajorden.localhost' },
      { domain: 'frajorden.dk', primary: true },
      { domain: 'new.frajorden.dk' },
    ])
    vi.stubEnv('NODE_ENV', 'production')
    expect(getTenantCrossURL(t)).toBe('https://frajorden.dk/')

    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'http://localhost:3000')
    expect(getTenantCrossURL(t)).toBe('http://frajorden.localhost:3000/')
  })
})
