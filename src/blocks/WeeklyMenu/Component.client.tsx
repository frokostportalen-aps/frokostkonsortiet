'use client'

import React, { useId, useRef, useState, useSyncExternalStore } from 'react'

import type { WeeklyMenuBlock as WeeklyMenuBlockProps } from '@/payload-types'
import type { MenuDay, WeeklyMenu } from '@/data/weeklyMenu'
import type { Dialect } from '@/themes/dialect'

import { isoWeekOf, todayIsoInCopenhagen } from '@/utilities/isoWeek'
import { SectionHeader } from '@/components/SectionHeader'
import { SignatureCard } from '@/components/SignatureCard'
import { signatureMarkClass } from '@/components/SignatureMark'
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

/** "Mandag" → "man". The rail is a printed line, so it wants the short form. */
const shortWeekday = (weekday: string): string => weekday.slice(0, 3).toLowerCase()

const DEFAULT_EMPTY = 'Køkkenet har ikke lagt ugens menu op endnu. Prøv igen om et par dage.'
const UNAVAILABLE = 'Menuen kan ikke hentes lige nu. Prøv igen om et øjeblik.'

/**
 * `useSyncExternalStore` wants a subscribe function; the date has nothing to
 * notify us about within a page view, so this registers nothing.
 */
const dateNeverNotifies = () => () => {}

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
 * The days, set as one printed line in the card's head rather than as a row of
 * buttons: the open day stands in the site's own capitals over its signature
 * mark, the rest lie quiet in lower case.
 *
 * It is still a real tablist underneath — arrows move between days, Home/End
 * jump to the ends, and only the open day is in the tab order — and each day's
 * accessible name is the full date, since "man 7/9" is a printed abbreviation,
 * not something to read aloud.
 */
const DayRail: React.FC<{
  days: MenuDay[]
  today: string
  selected: number
  onSelect: (index: number) => void
  idBase: string
  panelId: string
  signature: Dialect['signature']
  weekLabel: string
}> = ({ days, today, selected, onSelect, idBase, panelId, signature, weekLabel }) => {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (to: number) => {
    const next = (to + days.length) % days.length
    onSelect(next)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={`Vælg dag i ${weekLabel}`}
      className="-mx-2 flex flex-wrap items-end justify-center gap-x-1 gap-y-2 px-2"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') move(selected + 1)
        else if (event.key === 'ArrowLeft') move(selected - 1)
        else if (event.key === 'Home') move(0)
        else if (event.key === 'End') move(days.length - 1)
        else return
        event.preventDefault()
      }}
    >
      {days.map((day, index) => {
        const isSelected = index === selected
        return (
          <button
            key={day.date}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${index}`}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            // The full date is the name; the rail shows the printer's short form.
            aria-label={`${day.weekday} ${day.dayLabel}`}
            onClick={() => onSelect(index)}
            className={cn(
              'group/day flex min-w-16 flex-col items-center gap-0.5 rounded-sm px-2 py-1',
              'transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20',
              isSelected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {/* Always the short form: letting the open day spell itself out
                changes the rail's widths on every click, so the line shuffles
                under the reader's finger. Case and weight carry the selection. */}
            <span
              aria-hidden
              className={cn(
                'text-sm leading-none tracking-smallcaps',
                isSelected ? 'font-heading font-semibold uppercase' : 'lowercase',
              )}
            >
              {shortWeekday(day.weekday)}
            </span>
            <span aria-hidden className="text-[11px] leading-none opacity-70">
              {shortDate(day.date)}
            </span>
            {day.date === today && (
              <span
                aria-hidden
                className="text-[10px] uppercase leading-none tracking-smallcaps text-primary"
              >
                i dag
              </span>
            )}
            {/* The site's own mark carries "this one is open" — a rule, a bar or
                a sketched underline, depending on whose menu card it is. */}
            <span
              aria-hidden
              className={cn(
                'mt-1',
                signatureMarkClass.menuDay[signature],
                !isSelected && 'invisible',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

/**
 * One dish: name with its allergen numbers, then a quiet line of details.
 *
 * No dotted leader here, though the price menu's menukort has one: these dish
 * names run to seventy characters and wrap, and a leader on a wrapped line
 * becomes a stub beside the first line with the numbers stranded next to it.
 * Set tight to the title instead, the numbers stay with the dish they belong to
 * however the name breaks.
 */
const Dish: React.FC<{
  dish: MenuDay['categories'][number]['dishes'][number]
  showAllergens: boolean
  showCarbon: boolean
  showVariants: boolean
}> = ({ dish, showAllergens, showCarbon, showVariants }) => {
  // Resolved once so each decision is written once: the wrapper and its
  // contents can't drift into rendering an empty line.
  const allergens = showAllergens ? dish.allergens : []
  const variants = showVariants ? dish.variants : []
  const carbon = showCarbon ? dish.carbonPerKg : null

  return (
    <li>
      <p className="font-semibold leading-snug">
        {dish.title}
        {allergens.length > 0 && (
          <>
            {' '}
            <span aria-hidden className="whitespace-nowrap font-normal text-muted-foreground">
              ({allergens.map((allergen) => allergen.code).join(', ')})
            </span>
            {/* The codes mean nothing read aloud, so the names go to assistive
                tech instead of the numbers. */}
            <span className="sr-only">
              Allergener: {allergens.map((allergen) => allergen.name).join(', ')}.
            </span>
          </>
        )}
      </p>
      {dish.subTitle && (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dish.subTitle}</p>
      )}
      {(variants.length > 0 || carbon !== null) && (
        <p className="mt-1 text-xs text-muted-foreground">
          {variants.join(' · ')}
          {variants.length > 0 && carbon !== null && <span aria-hidden> · </span>}
          {carbon !== null && (
            <span className="whitespace-nowrap">
              {decimal(carbon)} kg CO<sub>2</sub>e pr. kg
            </span>
          )}
        </p>
      )}
    </li>
  )
}

const DayPanel: React.FC<{
  day: MenuDay
  showAllergens: boolean
  showCarbon: boolean
  showVariants: boolean
}> = ({ day, showAllergens, showCarbon, showVariants }) => (
  <>
    <div className="flex flex-col gap-8">
      {day.categories.map((category) => (
        <section key={category.title}>
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
            {category.title}
          </h3>
          <ul className="mt-3 flex flex-col gap-4">
            {category.dishes.map((dish, index) => (
              <Dish
                key={`${dish.title}-${index}`}
                dish={dish}
                showAllergens={showAllergens}
                showCarbon={showCarbon}
                showVariants={showVariants}
              />
            ))}
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
  </>
)

/**
 * Ugens menu as one printed sheet: the week is the card's dateline, the days
 * are set as a line under it, and the dishes fill the page below. Nothing here
 * is dressed as a button — the open day is marked the way a printer would mark
 * it, in capitals over the site's own signature rule.
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
  // mark it "i dag".
  //
  // The browser's own date is therefore read as the external fact it is: the
  // server's value is what hydration matches against, and the real one arrives
  // right after, without a state copy being corrected from an effect. (The
  // visitor may sit in another timezone; the menu is Danish either way.)
  const today = useSyncExternalStore(dateNeverNotifies, todayIsoInCopenhagen, () => serverToday)

  // Only the visitor's own choice lives in state. Until they pick something the
  // open tab is derived from `today`, so correcting the date corrects the tab
  // with it — and once they have clicked, nothing yanks them back.
  const [chosen, setChosen] = useState<{ week: number; day: number } | null>(null)
  const selected = chosen ?? opening(weeks, today)

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
      <div className="mx-auto max-w-[46rem]">
        <SignatureCard signature={signature} mark={false} className="px-6 py-8 md:px-10 md:py-10">
          {children}
        </SignatureCard>
        {note && <p className="mt-6 text-center text-sm text-muted-foreground">{note}</p>}
      </div>
    </div>
  )

  if (!week || !day) {
    // The kitchen answered, it just has nothing up — say so plainly rather than
    // leaving a heading over a hole in the page.
    return frame(
      <p className="text-center text-muted-foreground">
        {unavailable ? UNAVAILABLE : emptyMessage || DEFAULT_EMPTY}
      </p>,
    )
  }

  // The current week is the one holding today — which is not always a week the
  // kitchen published, and on a weekend not a week that holds any menu day.
  const current = isoWeekOf(new Date(today))
  const isCurrentWeek = week.week === current.week && week.year === current.year
  const weekLabel = `uge ${week.week}`
  const span =
    week.days.length > 1
      ? `${shortDate(week.days[0].date)}–${shortDate(week.days[week.days.length - 1].date)}`
      : shortDate(week.days[0].date)

  // Turning to another week is turning the card over, not pressing a tab.
  const turn = (delta: number) => setChosen({ week: selected.week + delta, day: 0 })
  const hasPrevious = selected.week > 0
  const hasNext = selected.week < weeks.length - 1

  return frame(
    <>
      {/* The dateline: which week this sheet is, with the page turns beside it. */}
      <div className="flex items-center justify-center gap-2">
        <PageTurn
          direction="previous"
          disabled={!hasPrevious}
          onClick={() => turn(-1)}
          label="Forrige uge"
        />
        <p className="min-w-40 text-center">
          <span className="font-heading text-lg font-semibold uppercase tracking-smallcaps">
            Uge {week.week}
          </span>
          <span className="block text-xs text-muted-foreground">
            {span}
            {isCurrentWeek && <span className="text-primary"> · denne uge</span>}
          </span>
        </p>
        <PageTurn direction="next" disabled={!hasNext} onClick={() => turn(1)} label="Næste uge" />
      </div>

      <div className="mt-6">
        <DayRail
          days={week.days}
          today={today}
          selected={selected.day}
          onSelect={(index) => setChosen({ week: selected.week, day: index })}
          idBase={idBase}
          panelId={`${idBase}-panel`}
          signature={signature}
          weekLabel={weekLabel}
        />
      </div>

      {/* The rule that separates the card's head from the menu itself. */}
      <hr className="mt-4 border-t border-border" />

      <div
        role="tabpanel"
        id={`${idBase}-panel`}
        aria-labelledby={`${idBase}-tab-${selected.day}`}
        tabIndex={0}
        className="mt-8"
      >
        {/* Day over date, stacked: the weekday is what the reader came for,
            the date confirms it. */}
        <p className="mb-6 text-center font-heading text-2xl font-semibold leading-tight tracking-tight">
          {day.weekday}
          <span className="mt-1 block text-sm font-normal tracking-normal text-muted-foreground">
            {day.dayLabel}
          </span>
        </p>
        <DayPanel
          day={day}
          showAllergens={showAllergens !== false}
          showCarbon={showCarbon !== false}
          showVariants={showVariants !== false}
        />
      </div>
    </>,
  )
}

/** A quiet page-turn beside the dateline. Disabled at the ends, honestly: there
 *  is no week beyond the ones the kitchen published. */
const PageTurn: React.FC<{
  direction: 'previous' | 'next'
  disabled: boolean
  onClick: () => void
  label: string
}> = ({ direction, disabled, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={cn(
      'rounded-sm px-2 py-1 text-lg leading-none text-muted-foreground transition-colors',
      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20',
      disabled ? 'cursor-default opacity-25' : 'hover:text-primary',
    )}
  >
    <span aria-hidden>{direction === 'previous' ? '‹' : '›'}</span>
  </button>
)
