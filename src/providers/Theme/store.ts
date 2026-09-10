'use client'

import type { Theme } from './types'

import { defaultTheme, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

/**
 * The theme as the browser knows it: a module-level store, since there is
 * exactly one theme per tab.
 *
 * Neither fact behind a theme exists on the server — the visitor's stored
 * choice and the OS preference are both browser state — so React reads them
 * through `useSyncExternalStore` and no component has to copy them into state
 * from an effect. `InitTheme` applies the same rule in a blocking script before
 * the first paint; this module is how it is read and changed afterwards.
 */

/** An explicit choice, or `auto` when the visitor has never made one. */
type Preference = Theme | 'auto'

/** One live media query for the process, created on first use (never on the server). */
let darkQuery: MediaQueryList | undefined
const prefersDark = (): MediaQueryList =>
  (darkQuery ??= window.matchMedia('(prefers-color-scheme: dark)'))

/** `localStorage` throws in Safari's private mode and with cookies blocked. */
const storedPreference = (): Preference => {
  try {
    const stored = window.localStorage.getItem(themeLocalStorageKey)
    return themeIsValid(stored) ? stored : 'auto'
  } catch {
    return 'auto'
  }
}

/** Memory is the truth: a browser that won't remember the visitor must still honour a click. */
let preference: Preference | undefined

export const readPreference = (): Preference => (preference ??= storedPreference())

/** What the page should be dressed in: the choice, else the OS, else ours. */
export const readTheme = (): Theme => {
  const chosen = readPreference()
  if (chosen !== 'auto') return chosen
  // `matches` is false both for "prefers light" and for a browser with no
  // opinion at all, so the family default stands in for the second case.
  return prefersDark().matches ? 'dark' : defaultTheme
}

/** A server render knows neither fact, so it reports nothing rather than guessing. */
export const unknownOnServer = (): undefined => undefined

const listeners = new Set<() => void>()

const announce = () => listeners.forEach((notify) => notify())

/**
 * Keep `<html data-theme>` — the attribute the CSS keys off — in step with the
 * store, and hand back the teardown so it drops straight into an effect. The
 * document is a subscriber like React is, rather than something a component has
 * to remember to write.
 *
 * It is applied once up front as well, as a backstop: `InitTheme` normally
 * stamps the value before the first paint, but a CSP without a nonce for it (or
 * anything else that drops inline scripts) would leave the attribute unset, and
 * a visitor who chose dark would then be stuck in light for the whole session.
 * The write is skipped when the value already matches, so the normal path
 * touches nothing.
 */
export const syncDocumentTheme = (): (() => void) => {
  const apply = () => {
    const theme = readTheme()
    const root = document.documentElement
    if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme)
  }

  apply()
  return subscribe(apply)
}

/** Another tab's choice; re-read rather than trust the event's payload. */
const onStorage = () => {
  preference = storedPreference()
  announce()
}

/** Record a choice (or clear it back to `auto`) and tell every reader. */
export const writePreference = (theme: Theme | null): void => {
  preference = theme ?? 'auto'
  try {
    if (theme === null) window.localStorage.removeItem(themeLocalStorageKey)
    else window.localStorage.setItem(themeLocalStorageKey, theme)
  } catch {
    // Not remembered for next time, but still in force for this visit.
  }
  announce()
}

/**
 * The two listeners are the store's, not each subscriber's: one `storage`
 * handler and one media-query handler for the page, attached while anyone is
 * listening. While the choice is `auto`, the OS flipping changes the answer
 * without a click, which is why the query is watched at all.
 */
export const subscribe = (onChange: () => void): (() => void) => {
  if (listeners.size === 0) {
    window.addEventListener('storage', onStorage)
    prefersDark().addEventListener('change', announce)
  }
  listeners.add(onChange)

  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0) {
      window.removeEventListener('storage', onStorage)
      prefersDark().removeEventListener('change', announce)
    }
  }
}
