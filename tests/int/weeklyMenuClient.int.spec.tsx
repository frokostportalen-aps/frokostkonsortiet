import React from 'react'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'

import type { MenuDay, WeeklyMenu } from '@/data/weeklyMenu'

import { WeeklyMenuClient } from '@/blocks/WeeklyMenu/Component.client'

const day = (date: string, weekday: string, dayLabel: string, dish: string): MenuDay => ({
  date,
  weekday,
  dayLabel,
  categories: [
    {
      title: 'Varmt måltid',
      dishes: [
        {
          title: dish,
          subTitle: null,
          variants: ['Klima', 'Standard'],
          carbonPerKg: 2.11,
          allergens: [
            { code: '3', name: 'Æg' },
            { code: 'Gris', name: 'Svinekød' },
          ],
        },
      ],
    },
  ],
  allergens: [
    { code: '3', name: 'Æg' },
    { code: 'Gris', name: 'Svinekød' },
  ],
})

const week37: WeeklyMenu = {
  week: 37,
  year: 2026,
  days: [
    day('2026-09-07', 'Mandag', '7. september', 'Spansk tortilla'),
    day('2026-09-08', 'Tirsdag', '8. september', 'Frikadeller med rodfrugter'),
  ],
}

const week38: WeeklyMenu = {
  week: 38,
  year: 2026,
  days: [day('2026-09-14', 'Mandag', '14. september', 'Chicken Korma')],
}

const props = {
  heading: 'Ugens menu',
  eyebrow: null,
  intro: null,
  note: null,
  emptyMessage: null,
  showAllergens: true,
  showCarbon: true,
  showVariants: true,
  today: '2026-09-08',
  signature: 'rule' as const,
  eyebrowStyle: 'uppercase' as const,
}

const panel = () => screen.getByRole('tabpanel')

afterEach(cleanup)

// The component corrects the server's date against the browser clock, so every
// test here needs a fixed "now" — otherwise the suite quietly starts failing on
// whichever day the fixtures stop being this week. Only Date is faked: React's
// scheduler needs real timers.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-09-08T09:00:00.000Z')) // tirsdag i uge 37
})
afterEach(() => vi.useRealTimers())

describe('WeeklyMenuClient', () => {
  it('opens on today', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    expect(within(panel()).getByText('Frikadeller med rodfrugter')).toBeTruthy()
  })

  it('opens on today even when the cached page was rendered on an older day', () => {
    // The page's HTML can be up to an ISR window old (longer while a stale copy
    // is served), so the server's date is only the first paint — the browser
    // has the last word on which day is "i dag".
    // Rendered Monday, opened Tuesday.
    render(<WeeklyMenuClient {...props} weeks={[week37]} today="2026-09-07" />)
    const tuesday = screen.getByRole('tab', { name: /Tirsdag/ })
    expect(tuesday.getAttribute('aria-selected')).toBe('true')
    expect(tuesday.textContent).toContain('I dag')
    const monday = screen.getByRole('tab', { name: /Mandag/ })
    expect(monday.getAttribute('aria-selected')).toBe('false')
    // …and the stale server date no longer claims to be today.
    expect(monday.textContent).not.toContain('I dag')
  })

  it('follows the browser into a week the server render did not open on', () => {
    vi.useFakeTimers()
    try {
      vi.setSystemTime(new Date('2026-09-14T09:00:00.000Z')) // mandag i uge 38
      render(<WeeklyMenuClient {...props} weeks={[week37, week38]} today="2026-09-08" />)
      const weeks = screen.getByRole('tablist', { name: 'Vælg uge' })
      expect(
        within(weeks)
          .getByRole('tab', { name: /Uge 38/ })
          .getAttribute('aria-selected'),
      ).toBe('true')
      expect(within(panel()).getByText('Chicken Korma')).toBeTruthy()
    } finally {
      vi.useRealTimers()
    }
  })

  it('marks today among the days', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    const tuesday = screen.getByRole('tab', { name: /Tirsdag/ })
    expect(tuesday.textContent).toContain('I dag')
    expect(tuesday.getAttribute('aria-selected')).toBe('true')
  })

  it('shows allergen codes visibly and their names to assistive tech', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    expect(within(panel()).getByText('(3, Gris)')).toBeTruthy()
    // The names carry the meaning, so they are what gets read aloud.
    expect(panel().textContent).toContain('Allergener: Æg, Svinekød.')
    // …and the legend under the day keeps the kitchen's own casing.
    expect(panel().textContent).toContain('3. Æg · Gris. Svinekød')
  })

  it('prints the climate figure with a Danish decimal comma', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    expect(within(panel()).getByText(/2,11 kg CO/)).toBeTruthy()
  })

  it('switches day without touching the server', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    fireEvent.click(screen.getByRole('tab', { name: /Mandag/ }))
    expect(within(panel()).getByText('Spansk tortilla')).toBeTruthy()
    expect(within(panel()).queryByText('Frikadeller med rodfrugter')).toBeNull()
  })

  it('offers no week tabs when only one week is published', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37]} />)
    expect(screen.queryByRole('tablist', { name: 'Vælg uge' })).toBeNull()
  })

  it('switches week and lands on that week’s first day', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37, week38]} />)
    const weeks = screen.getByRole('tablist', { name: 'Vælg uge' })
    expect(within(weeks).getByRole('tab', { name: /Uge 37/ }).textContent).toContain('Denne uge')

    fireEvent.click(within(weeks).getByRole('tab', { name: /Uge 38/ }))
    expect(within(panel()).getByText('Chicken Korma')).toBeTruthy()
  })

  it('says the week is not up yet instead of rendering an empty frame', () => {
    render(<WeeklyMenuClient {...props} weeks={[]} emptyMessage="Ikke lagt op endnu." />)
    expect(screen.getByText('Ikke lagt op endnu.')).toBeTruthy()
    expect(screen.queryByRole('tab')).toBeNull()
  })

  it('distinguishes an unreadable upstream from an unpublished week', () => {
    render(
      <WeeklyMenuClient {...props} weeks={[]} emptyMessage="Ikke lagt op endnu." unavailable />,
    )
    expect(screen.queryByText('Ikke lagt op endnu.')).toBeNull()
    expect(screen.getByText(/kan ikke hentes lige nu/)).toBeTruthy()
  })

  it('points both tab strips at the panel they actually drive', () => {
    render(<WeeklyMenuClient {...props} weeks={[week37, week38]} />)
    const panelId = panel().id
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab.getAttribute('aria-controls')).toBe(panelId)
    }
  })

  it('hides allergens and climate figures when the editor turns them off', () => {
    render(
      <WeeklyMenuClient
        {...props}
        weeks={[week37]}
        showAllergens={false}
        showCarbon={false}
        showVariants={false}
      />,
    )
    expect(panel().textContent).not.toContain('(3, Gris)')
    expect(panel().textContent).not.toContain('Allergener')
    expect(panel().textContent).not.toContain('2,11')
    expect(panel().textContent).not.toContain('Klima')
  })
})
