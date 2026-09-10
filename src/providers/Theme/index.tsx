'use client'

import React, { useEffect } from 'react'

import { syncDocumentTheme } from './store'

/**
 * Keeps the document dressed in the theme the store holds.
 *
 * There is no context here on purpose: the theme is one value per tab, so the
 * store in `./store` is the seam — components that need it read it there
 * (`ThemeSelector` does), and nothing has to be threaded through a provider.
 * What still needs a mounted component is the subscription: a choice made in
 * another tab, or the OS flipping while the choice is `auto`, has to repaint
 * without a click.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(syncDocumentTheme, [])

  return children
}
