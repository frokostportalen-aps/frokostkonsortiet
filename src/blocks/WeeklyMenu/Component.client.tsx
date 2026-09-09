'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

import type { WeeklyMenuBlock as WeeklyMenuBlockProps } from '@/payload-types'
import type { MenuDay, WeeklyMenu } from '@/data/weeklyMenu'
import type { Dialect } from '@/themes/dialect'

import { isoWeekOf, todayIsoInCopenhagen } from '@/utilities/isoWeek'
import { SectionHeader } from '@/components/SectionHeader'
import { SignatureCard } from '@/components/SignatureCard'
import { cn } from '@/utilities/ui'

// The block has its own `eyebrow` *text* field, so the dialect's eyebrow
// *casing* comes in under its own name rather than through `Pick<Dialect, …>`.
type Props = Omit<WeeklyMenuBlockProps, 'blockType'> & {
  signature: Dialect['signature']
  eyebrowStyle: Dialect['eyebrow']
  /** The published weeks, in order. Empty when the kitchen has put nothing up. */
  weeks: WeeklyMenu[]
  /** The upstream couldn't be read at all — a different message than an empty week. */
  unavailable?: boolean
  /** Today's date in Danish time, resolved on the server so the first paint
   *  and the hydration agree on which day is "i dag". */
  today: string
}

/** "2026-09-07" → "7/9" — locale-free, so server and client always agree. */
const shortDate = (date: string): string =>
  `${Number(date.slice(8, 10))}/${Number(date.slice(5, 7))}`

/** 2.11 → "2,11" (Danish decimal comma, without pulling in locale data). */
const decimal = (value: number): string => value.toFixed(2).replace('.', ',')

/**
 * The shared geometry of the small rounded labels — the tab badges and the
 * variant chips. Only the shape: the badges are spaced capitals, the chips keep
 * the kitchen's own casing ("Uden gris", not "UDEN GRIS"), so type stays with
 * each caller.
 */
const pill = 'rounded-full px-2 py-0.5'

const DEFAULT_EMPTY = 'Køkkenet har ikke lagt ugens menu op endnu. Prøv igen om et par dage.'
const UNAVAILABLE = 'Menuen kan ikke hentes lige nu. Prøv igen om et øjeblik.'

/**
 * Where to open: today's tab whenever the kitchen has published today, else the
 * next day still to come. Returns both indices together — they have to agree,
 * so nothing should be able to set one without the other.
 */
const opening = (weeks: WeeklyMenu[], today: string): { week: number; day: number } => {
  const week = weeks.findIndex((candidate) => candidate.days.some((day) => day.date >= today))
  const at = week === -1 ? 0 : week
  const day = weeks[at]?.days.findIndex((candidate) => candidate.date >= today) ?? -1
  return { week: at, day: day === -1 ? 0 : day }
}

/**
 * A horizontal tab strip with the keyboard behaviour tabs are expected to have:
 * arrows move between tabs, Home/End jump to the ends, and only the selected
 * tab is in the tab order (roving tabindex) so Tab moves on to the panel.
 */
const TabStrip: React.FC<{
  label: string
  idBase: string
  /** The panel these tabs drive — both strips point at the same one. */
  panelId: string
  selected: number
  onSelect: (index: number) => void
  className?: string
  tabs: { key: string; primary: string; secondary?: string; badge?: string }[]
}> = ({ label, idBase, panelId, selected, onSelect, className, tabs }) => {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (to: number) => {
    const next = (to + tabs.length) % tabs.length
    onSelect(next)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      // Centred with the section header when the tabs fit, and scrollable from
      // the left when they don't — `justify-center` would put the first tab out
      // of reach once the strip overflows.
      className={cn('mx-auto flex w-fit max-w-full gap-2 overflow-x-auto pb-1', className)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') move(selected + 1)
        else if (event.key === 'ArrowLeft') move(selected - 1)
        else if (event.key === 'Home') move(0)
        else if (event.key === 'End') move(tabs.length - 1)
        else return
        event.preventDefault()
      }}
    >
      {tabs.map((tab, index) => {
        const isSelected = index === selected
        return (
          <button
            key={tab.key}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${index}`}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(index)}
            className={cn(
              // Same selectable-chip treatment as the plan picker's choices,
              // including the family's focus ring (ring-4, no offset).
              'flex shrink-0 flex-col items-start rounded-lg border px-4 py-2.5 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:border-primary/50',
            )}
          >
            <span className="flex items-baseline gap-2 text-sm font-semibold leading-tight">
              {tab.primary}
              {tab.badge && (
                <span
                  className={cn(
                    pill,
                    'text-[10px] font-semibold uppercase tracking-smallcaps',
                    isSelected ? 'bg-primary-foreground/20' : 'bg-accent text-accent-foreground',
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
            {tab.secondary && (
              <span className={cn('text-xs', isSelected ? 'opacity-80' : 'text-muted-foreground')}>
                {tab.secondary}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

const DayPanel: React.FC<{
  day: MenuDay
  showAllergens: boolean
  showCarbon: boolean
  showVariants: boolean
  signature: Dialect['signature']
}> = ({ day, showAllergens, showCarbon, showVariants, signature }) => (
  <SignatureCard signature={signature}>
    <h3 className="font-heading text-2xl font-semibold tracking-tight">
      {day.weekday} <span className="text-muted-foreground">{day.dayLabel}</span>
    </h3>

    <div className="mt-6 flex flex-col gap-8">
      {day.categories.map((category) => (
        <section key={category.title}>
          <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
            {category.title}
          </h4>
          <ul className="mt-3 flex flex-col gap-4">
            {category.dishes.map((dish, index) => {
              // Resolved once so each decision is written once: the wrapper and
              // its contents can't drift into rendering an empty line.
              const variants = showVariants ? dish.variants : []
              const carbon = showCarbon ? dish.carbonPerKg : null

              return (
                <li key={`${dish.title}-${index}`}>
                  <p className="font-semibold leading-snug">
                    {dish.title}
                    {showAllergens && dish.allergens.length > 0 && (
                      <>
                        {' '}
                        <span className="whitespace-nowrap text-sm font-normal text-muted-foreground">
                          ({dish.allergens.map((allergen) => allergen.code).join(', ')})
                        </span>
                        {/* The codes mean nothing read aloud, so the names go to
                          assistive tech instead of the numbers. */}
                        <span className="sr-only">
                          {' '}
                          Allergener: {dish.allergens.map((allergen) => allergen.name).join(', ')}.
                        </span>
                      </>
                    )}
                  </p>
                  {dish.subTitle && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {dish.subTitle}
                    </p>
                  )}
                  {(variants.length > 0 || carbon !== null) && (
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      {variants.map((variant) => (
                        <span
                          key={variant}
                          className={cn(pill, 'bg-secondary text-secondary-foreground')}
                        >
                          {variant}
                        </span>
                      ))}
                      {carbon !== null && (
                        <span className="whitespace-nowrap">
                          {decimal(carbon)} kg CO<sub>2</sub>e pr. kg
                        </span>
                      )}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>

    {showAllergens && day.allergens.length > 0 && (
      <p className="mt-8 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold">Allergener: </span>
        {day.allergens.map((allergen) => `${allergen.code}. ${allergen.name}`).join(' · ')}
      </p>
    )}
  </SignatureCard>
)

/**
 * Ugens menu: week tabs (when the kitchen has published more than one), day
 * tabs inside the week, and the day's dishes by category.
 *
 * Interactive, hence a client component — but every week it can show is
 * server-rendered into the page, so switching day or week costs no request and
 * works with the page's ISR caching. The dialect arrives as props for the same
 * reason the plan picker takes it: importing the tenant registry from a
 * `'use client'` module would ship every site's palette to the browser.
 */
export const WeeklyMenuClient: React.FC<Props> = ({
  heading,
  eyebrow,
  intro,
  note,
  emptyMessage,
  showAllergens,
  showCarbon,
  showVariants,
  weeks,
  unavailable,
  today: serverToday,
  signature,
  eyebrowStyle,
}) => {
  const idBase = useId()

  // `serverToday` is the date the page was *rendered*, and the page is cached:
  // with a 10-minute ISR window (longer while a stale copy is served) a visitor
  // can meet HTML generated yesterday, which would open on yesterday's tab and
  // mark it "I dag". So the server's date is only the first paint — the browser
  // corrects it below, and everything that depends on "today" reads this state.
  const [today, setToday] = useState(serverToday)
  const [selected, setSelected] = useState(() => opening(weeks, serverToday))

  // Runs once on mount, before anyone can have clicked: `weeks` and
  // `serverToday` come from the server render and don't change afterwards, so a
  // later re-render never yanks the visitor back to today's tab.
  useEffect(() => {
    // The visitor may sit in another timezone; the menu is Danish either way.
    const now = todayIsoInCopenhagen()
    if (now === serverToday) return
    setToday(now)
    setSelected(opening(weeks, now))
  }, [serverToday, weeks])

  const week = weeks[selected.week] ?? weeks[0]
  const day = week?.days[selected.day] ?? week?.days[0]

  // The block's frame, shared by the populated and the empty state so a change
  // to the section framing lands in one place.
  const frame = (children: React.ReactNode) => (
    <div className="container">
      <SectionHeader
        heading={heading}
        eyebrow={eyebrow}
        intro={intro}
        eyebrowStyle={eyebrowStyle}
      />
      <div className="mx-auto max-w-[52rem]">
        {children}
        {note && <p className="mt-6 text-center text-sm text-muted-foreground">{note}</p>}
      </div>
    </div>
  )

  if (!week || !day) {
    // The kitchen answered, it just has nothing up — say so plainly rather than
    // leaving a heading over a hole in the page.
    return frame(
      <SignatureCard signature={signature}>
        <p className="text-muted-foreground">
          {unavailable ? UNAVAILABLE : emptyMessage || DEFAULT_EMPTY}
        </p>
      </SignatureCard>,
    )
  }

  // The current week is the one holding today — which is not always a week the
  // kitchen published, and on a weekend not a week that holds any menu day.
  const current = isoWeekOf(new Date(today))

  const weekTabs = weeks.map((candidate) => {
    const first = candidate.days[0]
    const last = candidate.days[candidate.days.length - 1]
    return {
      key: `${candidate.year}-${candidate.week}`,
      primary: `Uge ${candidate.week}`,
      secondary:
        first && last && first !== last
          ? `${shortDate(first.date)}–${shortDate(last.date)}`
          : first
            ? shortDate(first.date)
            : undefined,
      badge:
        candidate.week === current.week && candidate.year === current.year
          ? 'Denne uge'
          : undefined,
    }
  })

  return frame(
    <>
      {weekTabs.length > 1 && (
        <TabStrip
          label="Vælg uge"
          idBase={`${idBase}-week`}
          panelId={`${idBase}-panel`}
          selected={selected.week}
          // A new week has its own days; day 0 is the honest landing spot.
          onSelect={(index) => setSelected({ week: index, day: 0 })}
          tabs={weekTabs}
          className="mb-3"
        />
      )}

      <TabStrip
        label={`Vælg dag i uge ${week.week}`}
        idBase={idBase}
        panelId={`${idBase}-panel`}
        selected={selected.day}
        onSelect={(index) => setSelected((prev) => ({ ...prev, day: index }))}
        tabs={week.days.map((candidate) => ({
          key: candidate.date,
          primary: candidate.weekday,
          secondary: shortDate(candidate.date),
          badge: candidate.date === today ? 'I dag' : undefined,
        }))}
        className="mb-6"
      />

      <div
        role="tabpanel"
        id={`${idBase}-panel`}
        aria-labelledby={`${idBase}-tab-${selected.day}`}
        tabIndex={0}
      >
        <DayPanel
          day={day}
          showAllergens={showAllergens !== false}
          showCarbon={showCarbon !== false}
          showVariants={showVariants !== false}
          signature={signature}
        />
      </div>
    </>,
  )
}
