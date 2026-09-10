import { describe, it, expect } from 'vitest'

import {
  addWeeks,
  currentIsoWeek,
  isoWeekOf,
  mondayOfIsoWeek,
  todayInCopenhagen,
} from '@/utilities/isoWeek'

const utc = (iso: string) => new Date(`${iso}T00:00:00.000Z`)

describe('isoWeekOf', () => {
  it('numbers a midweek day', () => {
    // Tuesday 8 September 2026 is in ISO week 37.
    expect(isoWeekOf(utc('2026-09-08'))).toEqual({ week: 37, year: 2026 })
  })

  it('keeps Sunday in the week that just ended', () => {
    expect(isoWeekOf(utc('2026-09-13'))).toEqual({ week: 37, year: 2026 })
    expect(isoWeekOf(utc('2026-09-14'))).toEqual({ week: 38, year: 2026 })
  })

  it('puts early January in the previous week-numbering year', () => {
    // 1 January 2027 is a Friday, so it belongs to week 53 of 2026 — the case
    // that breaks any code deriving the year from the calendar.
    expect(isoWeekOf(utc('2027-01-01'))).toEqual({ week: 53, year: 2026 })
  })

  it('puts late December in the next week-numbering year', () => {
    // 29 December 2025 is a Monday opening week 1 of 2026.
    expect(isoWeekOf(utc('2025-12-29'))).toEqual({ week: 1, year: 2026 })
  })
})

describe('mondayOfIsoWeek', () => {
  it('resolves the Monday a week opens on', () => {
    expect(mondayOfIsoWeek({ week: 37, year: 2026 }).toISOString()).toBe('2026-09-07T00:00:00.000Z')
  })

  it('round-trips with isoWeekOf, including week 53', () => {
    for (const week of [1, 2, 26, 52, 53]) {
      const value = { week, year: 2026 }
      expect(isoWeekOf(mondayOfIsoWeek(value))).toEqual(value)
    }
  })
})

describe('addWeeks', () => {
  it('steps forward inside a year', () => {
    expect(addWeeks({ week: 37, year: 2026 }, 1)).toEqual({ week: 38, year: 2026 })
  })

  it('rolls over the year boundary instead of asking for week 54', () => {
    expect(addWeeks({ week: 53, year: 2026 }, 1)).toEqual({ week: 1, year: 2027 })
  })

  it('steps backwards into the previous week-numbering year', () => {
    expect(addWeeks({ week: 1, year: 2026 }, -1)).toEqual({ week: 52, year: 2025 })
  })
})

describe('todayInCopenhagen', () => {
  it('reads the Danish date, not the UTC one', () => {
    // 22:30 UTC on a Sunday is already Monday in Copenhagen (CEST, +02:00) —
    // a UTC-only server would serve last week's menu all Monday night.
    expect(todayInCopenhagen(new Date('2026-09-06T22:30:00.000Z')).toISOString()).toBe(
      '2026-09-07T00:00:00.000Z',
    )
  })

  it('holds the previous day before Danish midnight', () => {
    expect(todayInCopenhagen(new Date('2026-09-06T21:30:00.000Z')).toISOString()).toBe(
      '2026-09-06T00:00:00.000Z',
    )
  })
})

describe('currentIsoWeek', () => {
  it('follows the Danish clock across the week rollover', () => {
    expect(currentIsoWeek(new Date('2026-09-06T21:30:00.000Z'))).toEqual({ week: 36, year: 2026 })
    expect(currentIsoWeek(new Date('2026-09-06T22:30:00.000Z'))).toEqual({ week: 37, year: 2026 })
  })
})
