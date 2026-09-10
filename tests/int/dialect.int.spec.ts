import { describe, it, expect } from 'vitest'

import type { Dialect } from '@/themes/dialect'

import { getDialect } from '@/themes/dialect'

/**
 * The family defaults, pinned here on purpose: changing one is a design
 * decision about how every site reads on an axis it leaves unset, and should
 * have to be stated twice. (`tsc` is what catches an axis with no default at
 * all — `DIALECT_DEFAULTS` has to satisfy `Dialect`.)
 */
const FAMILY_DEFAULTS: Omit<Dialect, 'tagline'> = {
  eyebrow: 'uppercase',
  chrome: 'default',
  heroVariant: 'overlay',
  signature: 'rule',
  testimonials: 'marquee',
}

describe('getDialect', () => {
  // Per-site expectations use `toMatchObject`, so adding an axis doesn't fail
  // every unrelated assertion.
  it('resolves a kitchen its own voice, and fills in the rest', () => {
    expect(getDialect('smagssans')).toMatchObject({
      eyebrow: 'smallcaps',
      heroVariant: 'split',
      signature: 'rule',
      tagline: 'Siden 1980 · sæsonens køkken',
      // Smagssans says nothing about either, so the family answers.
      chrome: FAMILY_DEFAULTS.chrome,
      testimonials: FAMILY_DEFAULTS.testimonials,
    })
  })

  it('gives the parent its bold block signature', () => {
    expect(getDialect('frokost-konsortiet').signature).toBe('block')
  })

  it('lets a site dress its own chrome and quotes', () => {
    expect(getDialect('frajorden')).toMatchObject({
      chrome: 'brand',
      heroVariant: 'wordmark',
      signature: 'sketch',
      testimonials: 'carousel',
    })
  })

  it('falls back to family defaults without a theme to read', () => {
    expect(getDialect('does-not-exist')).toEqual(FAMILY_DEFAULTS)
    expect(getDialect()).toEqual(FAMILY_DEFAULTS)
  })
})
