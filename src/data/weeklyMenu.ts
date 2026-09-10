import type { IsoWeek } from '@/utilities/isoWeek'

import { addWeeks, currentIsoWeek } from '@/utilities/isoWeek'
import { getTenantBySlug } from '@/utilities/getTenant'

/**
 * The one seam for reading a site's published week menu from frokostportalen.
 *
 * Like every other read in `src/data`, the entry point takes a `tenantSlug` and
 * nothing else — a caller never has to know that a site maps to a kitchen id.
 *
 * The upstream endpoint is public and unauthenticated, but it only answers
 * server-to-server: CORS blocks other origins, so this module must never be
 * imported from a `'use client'` module. Everything below is either a pure
 * transform (testable without the network — see tests/int/weeklyMenu.int.spec.ts)
 * or the single `fetch` that talks to the upstream.
 *
 * Two failure modes are deliberately kept apart, because they mean different
 * things to a visitor and read differently on the page:
 *   • *not published* — the API answers fine, the week is simply empty. This is
 *     the normal state for a kitchen that hasn't put the week up yet.
 *   • *unavailable* — the request failed or came back unusable. Nothing is
 *     claimed about the menu in that case.
 */

const DEFAULT_ENDPOINT = 'https://backend.frokostportal.dk/api/public/menu'

/** How long a fetched week may be reused. Matches the pages' own ISR window. */
const REVALIDATE_SECONDS = 600

/**
 * How far ahead to look. The kitchens publish roughly a week in advance, so a
 * visitor on a Friday still has something to look at.
 */
const WEEKS_AHEAD = 1

/** A slow upstream must not hold a page render open indefinitely. */
const TIMEOUT_MS = 8_000

// ---------------------------------------------------------------------------
// The upstream shape (only the fields we actually read)
// ---------------------------------------------------------------------------

type ApiDish = {
  title?: string | null
  subTitle?: string | null
  /** Comma-separated menu variations, e.g. "Uden gris, halal". */
  label?: string | null
  carbonFootprintPerKg?: number | null
  /** Allergen *codes*, e.g. ["3", "Gris"] — resolved against the day's legend. */
  allergens?: string[] | null
}

type ApiCategory = {
  title?: string | null
  items?: ApiDish[] | null
}

type ApiDay = {
  /** Local ISO timestamp without offset, e.g. "2026-09-07T00:00:00". */
  date?: string | null
  /** Upstream's own label for the menu plan. Unreliable (week 37 came back as
   *  "01.08.2026"), so it is read but never rendered. */
  menuTitle?: string | null
  categories?: ApiCategory[] | null
  /** The day's legend, e.g. ["1. Gluten", "Gris. Svinekød"]. */
  allergens?: string[] | null
}

// ---------------------------------------------------------------------------
// What the block renders
// ---------------------------------------------------------------------------

export type Allergen = {
  /** The code as it appears on a dish ("1", "Gris"). */
  code: string
  /** The resolved name ("Gluten", "Svinekød"), or the code if unresolvable. */
  name: string
}

export type MenuDish = {
  title: string
  subTitle: string | null
  /** The menu variations this dish covers ("Vegansk", "Uden gris", "Halal"). */
  variants: string[]
  /** kg CO2e per kg of food, as published by the kitchen. */
  carbonPerKg: number | null
  allergens: Allergen[]
}

export type MenuCategory = {
  title: string
  dishes: MenuDish[]
}

export type MenuDay = {
  /** Calendar date, `YYYY-MM-DD`. */
  date: string
  /** "Mandag" — pre-formatted server-side so the browser needs no locale data. */
  weekday: string
  /** "7. september" */
  dayLabel: string
  categories: MenuCategory[]
  /** The day's full legend, for the dish codes above. */
  allergens: Allergen[]
}

export type WeeklyMenu = IsoWeek & {
  /** Weekdays that actually have dishes; an unpublished week has none. */
  days: MenuDay[]
}

/** What a block gets back: the weeks it may show, and why there are none. */
export type WeeklyMenuResult = {
  weeks: WeeklyMenu[]
  /** Set when the upstream couldn't be read at all (as opposed to being empty). */
  unavailable: boolean
}

// ---------------------------------------------------------------------------
// Pure transforms
// ---------------------------------------------------------------------------

const daFormat = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('da-DK', { ...options, timeZone: 'UTC' })

const weekdayFormat = daFormat({ weekday: 'long' })
const dayLabelFormat = daFormat({ day: 'numeric', month: 'long' })

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

/**
 * One legend line → its code and name.
 *
 * The numbered allergens read "1. Gluten", but pork breaks the pattern with
 * "Gris. Svinekød". Splitting on the first ". " instead of parsing a number
 * covers both without a special case, and anything unsplittable keeps the whole
 * string as its own name rather than being dropped.
 */
export const parseAllergen = (line: string): Allergen => {
  const trimmed = line.trim()
  const at = trimmed.indexOf('. ')
  if (at < 1) return { code: trimmed, name: trimmed }
  return { code: trimmed.slice(0, at), name: trimmed.slice(at + 2).trim() }
}

/**
 * A day's legend, keyed by lower-cased code so a dish's "gris" and a legend's
 * "Gris" still meet — while the entry keeps the kitchen's own casing for
 * rendering.
 */
export const allergenLegend = (lines: string[] | null | undefined): Map<string, Allergen> => {
  const legend = new Map<string, Allergen>()
  for (const line of lines ?? []) {
    if (typeof line !== 'string' || !line.trim()) continue
    const allergen = parseAllergen(line)
    legend.set(allergen.code.toLowerCase(), allergen)
  }
  return legend
}

/**
 * Dish allergen codes → resolved allergens, scoped to *this day's* legend.
 * A code with no entry keeps itself as the name: better an honest "3" on the
 * page than a silently dropped allergen.
 */
const resolveAllergens = (
  codes: string[] | null | undefined,
  legend: Map<string, Allergen>,
): Allergen[] =>
  (codes ?? [])
    .filter((code): code is string => typeof code === 'string' && code.trim().length > 0)
    .map((code) => {
      const trimmed = code.trim()
      return { code: trimmed, name: legend.get(trimmed.toLowerCase())?.name ?? trimmed }
    })

/** "Klima, Standard" → ["Klima", "Standard"]. */
const parseVariants = (label: string | null | undefined): string[] =>
  (label ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map(capitalize)

const normalizeDish = (dish: ApiDish, legend: Map<string, Allergen>): MenuDish | null => {
  const title = dish?.title?.trim()
  if (!title) return null
  return {
    title,
    subTitle: dish.subTitle?.trim() || null,
    variants: parseVariants(dish.label),
    carbonPerKg: typeof dish.carbonFootprintPerKg === 'number' ? dish.carbonFootprintPerKg : null,
    allergens: resolveAllergens(dish.allergens, legend),
  }
}

const normalizeDay = (day: ApiDay): MenuDay | null => {
  // The upstream sends a local timestamp with no offset; only the date part is
  // meaningful, and reading it as UTC keeps it from sliding a day either way.
  const date = day?.date?.slice(0, 10)
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null

  const legend = allergenLegend(day.allergens)

  const categories = (day.categories ?? [])
    .map((category): MenuCategory | null => {
      const dishes = (category?.items ?? [])
        .map((dish) => normalizeDish(dish, legend))
        .filter((dish): dish is MenuDish => dish !== null)
      const title = category?.title?.trim()
      // A category with no dishes says nothing worth a heading.
      if (!title || dishes.length === 0) return null
      return { title, dishes }
    })
    .filter((category): category is MenuCategory => category !== null)

  // A day the kitchen hasn't filled in is not a day off — it's simply absent
  // from the week, and the caller decides what an empty week means.
  if (categories.length === 0) return null

  const used = new Set(
    categories.flatMap((category) =>
      category.dishes.flatMap((dish) => dish.allergens.map((a) => a.code.toLowerCase())),
    ),
  )

  const at = new Date(`${date}T00:00:00.000Z`)

  return {
    date,
    weekday: capitalize(weekdayFormat.format(at)),
    dayLabel: dayLabelFormat.format(at),
    categories,
    // Only the codes actually used this day belong in the legend under it.
    allergens: [...legend.values()].filter((allergen) => used.has(allergen.code.toLowerCase())),
  }
}

/** An upstream week payload → the days worth rendering, in date order. */
export const normalizeWeek = (payload: unknown, week: IsoWeek): WeeklyMenu => {
  const days = (Array.isArray(payload) ? (payload as ApiDay[]) : [])
    .map(normalizeDay)
    .filter((day): day is MenuDay => day !== null)
    .sort((a, b) => a.date.localeCompare(b.date))

  return { ...week, days }
}

// ---------------------------------------------------------------------------
// The network edge
// ---------------------------------------------------------------------------

/**
 * The upstream URL for one kitchen's week. Exported for the tests.
 *
 * The endpoint also serves `language=en`; every site here is Danish, so that
 * stays a constant until one of them isn't.
 */
export const menuRequestUrl = ({
  kitchenId,
  week,
  year,
}: IsoWeek & { kitchenId: string }): string => {
  const url = new URL(process.env.FROKOSTPORTAL_MENU_URL || DEFAULT_ENDPOINT)
  url.searchParams.set('week', String(week))
  url.searchParams.set('year', String(year))
  url.searchParams.set('kitchenId', kitchenId)
  url.searchParams.set('language', 'da')
  return url.toString()
}

/** One week from the upstream, or `null` when it couldn't be read. */
async function fetchWeek(kitchenId: string, week: IsoWeek): Promise<WeeklyMenu | null> {
  const url = menuRequestUrl({ kitchenId, ...week })

  try {
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: {
        revalidate: REVALIDATE_SECONDS,
        // Tags for a future invalidator to bust one kitchen (or every kitchen)
        // on demand; nothing busts them today, so the window above is what
        // actually refreshes the menu.
        tags: ['weekly-menu', `weekly-menu-${kitchenId}`],
      },
    })

    if (!res.ok) {
      console.error(`Ugemenu: ${res.status} fra frokostportalen for uge ${week.week}/${week.year}`)
      return null
    }

    return normalizeWeek(await res.json(), week)
  } catch (error) {
    console.error(`Ugemenu: kunne ikke hente uge ${week.week}/${week.year}`, error)
    return null
  }
}

/**
 * The weeks a kitchen has published, starting from the current one.
 *
 * Fetching a fixed window (rather than reading a week off the URL) keeps the
 * pages statically renderable: no search params, no dynamic render, and the ISR
 * window is what refreshes the menu.
 *
 * Weeks with nothing published are dropped, so an empty `weeks` means "nothing
 * published"; `unavailable` means the upstream itself couldn't be read.
 */
export async function getWeeklyMenu(kitchenId: string): Promise<WeeklyMenuResult> {
  const start = currentIsoWeek()
  const wanted = Array.from({ length: WEEKS_AHEAD + 1 }, (_, i) => addWeeks(start, i))

  const results = await Promise.all(wanted.map((week) => fetchWeek(kitchenId, week)))

  return {
    weeks: results.filter((week): week is WeeklyMenu => week !== null && week.days.length > 0),
    // Only a failure on the current week is worth telling the visitor about;
    // a next week that didn't answer is indistinguishable from one not yet up.
    unavailable: results[0] === null,
  }
}

/**
 * The menu for a *site*, or `null` when the site has no kitchen of its own —
 * which is the main Frokost Konsortiet portal, and the reason this returns a
 * nullable rather than an empty result: "no kitchen here" and "this kitchen has
 * published nothing" are different facts and read differently on the page.
 */
export async function getWeeklyMenuForTenant(tenantSlug: string): Promise<WeeklyMenuResult | null> {
  const tenant = await getTenantBySlug(tenantSlug)
  const kitchenId = tenant?.kitchenId?.trim()
  return kitchenId ? getWeeklyMenu(kitchenId) : null
}
