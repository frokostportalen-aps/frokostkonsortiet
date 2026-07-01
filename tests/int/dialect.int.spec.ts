import { describe, it, expect } from 'vitest'

import { getDialect } from '@/themes/dialect'

describe('getDialect', () => {
  it('resolves a kitchen its own voice', () => {
    expect(getDialect('smagssans')).toEqual({
      eyebrow: 'smallcaps',
      heroVariant: 'split',
      signature: 'rule',
      tagline: 'Siden 1980 · sæsonens køkken',
    })
  })

  it('gives the parent its bold block signature', () => {
    expect(getDialect('frokost-konsortiet').signature).toBe('block')
  })

  it('falls back to family defaults for an unknown site', () => {
    expect(getDialect('does-not-exist')).toEqual({
      eyebrow: 'uppercase',
      heroVariant: 'overlay',
      signature: 'rule',
      tagline: undefined,
    })
  })

  it('falls back to family defaults when no slug is given', () => {
    expect(getDialect()).toEqual({
      eyebrow: 'uppercase',
      heroVariant: 'overlay',
      signature: 'rule',
      tagline: undefined,
    })
  })
})
