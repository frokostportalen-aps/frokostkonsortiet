import { describe, it, expect } from 'vitest'

import { allergenLegend, menuRequestUrl, normalizeWeek, parseAllergen } from '@/data/weeklyMenu'

const WEEK = { week: 37, year: 2026 }

/**
 * A trimmed but otherwise verbatim day from the Smagssans kitchen (week 37,
 * 2026) — including the "Gris" allergen that breaks the numbering pattern and
 * the unpublished day that the same endpoint returns for a kitchen that hasn't
 * put the week up.
 */
const day = (overrides: Record<string, unknown> = {}) => ({
  date: '2026-09-07T00:00:00',
  menuTitle: '01.08.2026',
  categories: [
    {
      title: 'Varmt måltid',
      items: [
        {
          title: 'Spansk tortilla med chorizo',
          subTitle: null,
          label: 'Klima, Standard',
          carbonFootprintPerKg: 2.11,
          allergens: ['3', 'Gris'],
        },
      ],
    },
    {
      title: 'Vegansk måltid',
      items: [
        {
          title: 'Catalan coca',
          subTitle: null,
          label: 'Vegansk',
          carbonFootprintPerKg: 1.07,
          allergens: ['1'],
        },
      ],
    },
  ],
  allergens: ['1. Gluten', '3. Æg', '7. Mælk', 'Gris. Svinekød'],
  ...overrides,
})

describe('parseAllergen', () => {
  it('splits a numbered allergen into code and name', () => {
    expect(parseAllergen('1. Gluten')).toEqual({ code: '1', name: 'Gluten' })
  })

  it('handles pork, which is named rather than numbered', () => {
    expect(parseAllergen('Gris. Svinekød')).toEqual({ code: 'Gris', name: 'Svinekød' })
  })

  it('keeps an unsplittable line as its own name rather than dropping it', () => {
    expect(parseAllergen('Sesam')).toEqual({ code: 'Sesam', name: 'Sesam' })
  })
})

describe('allergenLegend', () => {
  it('maps codes to names, case-insensitively', () => {
    const legend = allergenLegend(['1. Gluten', 'Gris. Svinekød'])
    expect(legend.get('1')).toEqual({ code: '1', name: 'Gluten' })
    // Keyed lower-case so codes match, but the kitchen's own casing survives
    // for the legend printed under the day.
    expect(legend.get('gris')).toEqual({ code: 'Gris', name: 'Svinekød' })
  })

  it('survives a missing legend', () => {
    expect(allergenLegend(undefined).size).toBe(0)
    expect(allergenLegend(['', '  ']).size).toBe(0)
  })
})

describe('normalizeWeek', () => {
  it('resolves a dish’s allergen codes against the day’s own legend', () => {
    const { days } = normalizeWeek([day()], WEEK)
    expect(days).toHaveLength(1)
    expect(days[0].categories[0].dishes[0].allergens).toEqual([
      { code: '3', name: 'Æg' },
      { code: 'Gris', name: 'Svinekød' },
    ])
  })

  it('keeps an unknown code visible instead of silently dropping an allergen', () => {
    const { days } = normalizeWeek([day({ allergens: ['1. Gluten'] })], WEEK)
    expect(days[0].categories[0].dishes[0].allergens).toEqual([
      { code: '3', name: '3' },
      { code: 'Gris', name: 'Gris' },
    ])
  })

  it('lists only the allergens the day actually uses', () => {
    const { days } = normalizeWeek([day()], WEEK)
    // 7. Mælk is in the legend but on none of the dishes.
    expect(days[0].allergens).toEqual([
      { code: '1', name: 'Gluten' },
      { code: '3', name: 'Æg' },
      { code: 'Gris', name: 'Svinekød' },
    ])
  })

  it('splits the label into menu variations', () => {
    const { days } = normalizeWeek([day()], WEEK)
    expect(days[0].categories[0].dishes[0].variants).toEqual(['Klima', 'Standard'])
  })

  it('formats the day in Danish', () => {
    const { days } = normalizeWeek([day()], WEEK)
    expect(days[0]).toMatchObject({
      date: '2026-09-07',
      weekday: 'Mandag',
      dayLabel: '7. september',
    })
  })

  it('treats a week with no dishes as unpublished', () => {
    // What Fra Jorden's kitchen returns today: five days, no categories.
    const payload = [1, 2, 3, 4, 5].map((d) => ({
      date: `2026-09-0${d + 6}T00:00:00`,
      menuTitle: '07.07.2026',
      categories: [],
      allergens: [],
    }))
    expect(normalizeWeek(payload, WEEK).days).toEqual([])
  })

  it('drops a category with no dishes and a day left with none', () => {
    const empty = day({ categories: [{ title: 'Varmt måltid', items: [] }] })
    expect(normalizeWeek([empty], WEEK).days).toEqual([])
  })

  it('drops a dish with no title but keeps the rest of its category', () => {
    const partial = day({
      categories: [
        {
          title: 'Varmt måltid',
          items: [{ title: '  ' }, { title: 'Frikadeller', allergens: ['1'] }],
        },
      ],
    })
    const { days } = normalizeWeek([partial], WEEK)
    expect(days[0].categories[0].dishes.map((dish) => dish.title)).toEqual(['Frikadeller'])
  })

  it('orders the days, whatever order they arrive in', () => {
    const payload = [day({ date: '2026-09-09T00:00:00' }), day({ date: '2026-09-07T00:00:00' })]
    expect(normalizeWeek(payload, WEEK).days.map((d) => d.date)).toEqual([
      '2026-09-07',
      '2026-09-09',
    ])
  })

  it('carries the week it was asked for', () => {
    expect(normalizeWeek([day()], WEEK)).toMatchObject(WEEK)
  })

  it('treats an unusable payload as an empty week', () => {
    expect(normalizeWeek(null, WEEK).days).toEqual([])
    expect(normalizeWeek({ error: 'nope' }, WEEK).days).toEqual([])
    expect(normalizeWeek([{ date: 'ikke en dato' }], WEEK).days).toEqual([])
  })
})

describe('menuRequestUrl', () => {
  it('addresses one kitchen’s week, in Danish', () => {
    const url = new URL(
      menuRequestUrl({
        kitchenId: 'f5d2e585-baff-4f7b-b464-08dddfc5c258',
        week: 37,
        year: 2026,
      }),
    )
    expect(url.origin + url.pathname).toBe('https://backend.frokostportal.dk/api/public/menu')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      week: '37',
      year: '2026',
      kitchenId: 'f5d2e585-baff-4f7b-b464-08dddfc5c258',
      language: 'da',
    })
  })
})
