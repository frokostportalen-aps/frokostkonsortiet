/**
 * The two facts both readers of the theme need: the blocking script in
 * `./InitTheme` (a server component, so it can't import the client-only store)
 * and `./store`. Nothing here touches `window`, so either side may import it.
 */

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'
