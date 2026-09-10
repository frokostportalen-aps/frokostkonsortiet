import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../shared'

/**
 * Stamps `data-theme` on `<html>` before the first paint, so a visitor who
 * prefers dark never sees a light flash. Rendered into the root layout's
 * `<head>`, where the browser runs it while parsing.
 *
 * A plain `<script>` and not `next/script`: that component is a client
 * component, so the tag became part of the React tree — serialised into the
 * flight payload, shipped a second time, and re-rendered in the browser, where
 * React refuses to execute inline scripts and warns about it ("Encountered a
 * script tag while rendering React component"). This component is a server
 * component, so the tag is only ever HTML.
 *
 * `localStorage` throws in Safari's private mode and with cookies blocked, so
 * the read is guarded — without it the attribute never arrives, and the
 * no-flash rule in globals.css would have to fall back on its 400ms safety net.
 */
export const InitTheme: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
  (function () {
    function implicitPreference() {
      var mql = window.matchMedia('(prefers-color-scheme: dark)')
      return typeof mql.matches === 'boolean' ? (mql.matches ? 'dark' : 'light') : null
    }

    function isValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var stored = null
    try {
      stored = window.localStorage.getItem('${themeLocalStorageKey}')
    } catch (e) {}

    var theme = isValid(stored) ? stored : implicitPreference() || '${defaultTheme}'
    document.documentElement.setAttribute('data-theme', theme)
  })();
  `,
    }}
  />
)
