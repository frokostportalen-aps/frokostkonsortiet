/**
 * ISO-8601 week arithmetic, kept as pure functions with no I/O so the week
 * rollover can be unit tested without waiting for a Monday — see
 * tests/int/isoWeek.int.spec.ts.
 *
 * The frokostportal menu API is addressed by ISO week and year, and those two
 * numbers don't always agree with the calendar year: 1 January 2027 is a Friday
 * and belongs to ISO week 53 of 2026. Any code that derives `week` and `year`
 * separately gets that week wrong, which is why they are always resolved and
 * carried as a pair here.
 */

export type IsoWeek = {
  /** 1–53. */
  week: number
  /** The ISO week-numbering year, which may differ from the calendar year. */
  year: number
}

const DAY_MS = 86_400_000

/** Denmark's timezone — where both the kitchens and their customers live. */
const TZ = 'Europe/Copenhagen'

// Built once: constructing an Intl formatter is the expensive part, and this one
// is asked the same question on every render. 'en-CA' formats as YYYY-MM-DD.
const ymdFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TZ })

/** Day-of-week as ISO numbers it: Monday = 1 … Sunday = 7 (UTC clock). */
const isoDayOfWeek = (date: Date): number => date.getUTCDay() || 7

/**
 * Today's date as seen in Copenhagen, as `YYYY-MM-DD`.
 *
 * The server may well run in UTC, and between midnight and 02:00 Danish time
 * that is still *yesterday* in UTC — which on a Monday morning would serve last
 * week's menu. Reading the day through the Danish timezone fixes that.
 *
 * The string is the form callers actually pass around and compare (the upstream
 * menu dates are `YYYY-MM-DD` too), so it is the primitive here and the Date
 * below is derived from it.
 */
export const todayIsoInCopenhagen = (now: Date = new Date()): string => ymdFormat.format(now)

/**
 * The same day as a UTC midnight Date, so all the arithmetic below stays free
 * of daylight-saving offsets.
 */
export const todayInCopenhagen = (now?: Date): Date =>
  new Date(`${todayIsoInCopenhagen(now)}T00:00:00.000Z`)

/**
 * The Monday that opens a given ISO week, as UTC midnight.
 *
 * Anchored on 4 January, which by definition always falls in ISO week 1 —
 * the standard trick, and the reason this needs no lookup table.
 */
export const mondayOfIsoWeek = ({ week, year }: IsoWeek): Date => {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const week1Monday = jan4.getTime() - (isoDayOfWeek(jan4) - 1) * DAY_MS
  return new Date(week1Monday + (week - 1) * 7 * DAY_MS)
}

/** The ISO week and week-numbering year a date falls in. */
export const isoWeekOf = (date: Date): IsoWeek => {
  // The Thursday of this week decides the week-numbering year: an ISO week
  // belongs to whichever year holds the majority of its days, and Thursday is
  // always on the majority side.
  const thursday = new Date(date.getTime() + (4 - isoDayOfWeek(date)) * DAY_MS)
  const year = thursday.getUTCFullYear()
  const jan1 = Date.UTC(year, 0, 1)
  const week = Math.floor((thursday.getTime() - jan1) / DAY_MS / 7) + 1
  return { week, year }
}

/** The ISO week `delta` weeks after (or before) another one. */
export const addWeeks = (from: IsoWeek, delta: number): IsoWeek =>
  isoWeekOf(new Date(mondayOfIsoWeek(from).getTime() + delta * 7 * DAY_MS))

/** The ISO week containing today, in Danish time. */
export const currentIsoWeek = (now?: Date): IsoWeek => isoWeekOf(todayInCopenhagen(now))
