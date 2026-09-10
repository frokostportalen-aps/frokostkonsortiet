'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, use, useEffect, useState } from 'react'

export interface ContextType {
  headerTheme: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: null,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Nothing is claimed until a hero (or a route) claims it. Seeding this from
  // `<html data-theme>` (as the Payload template does) would make the very
  // first client render disagree with the server's, which is what used to push
  // the header into keeping a copy of this value in state.
  const [headerTheme, setHeaderTheme] = useState<Theme | null>(null)

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)

/**
 * Declare the theme the header should adopt while the calling component is
 * mounted — e.g. an overlay hero the header floats over, which needs the logo
 * and nav to flip for contrast against the photo. This is the one seam for that
 * coordination: the effect (with correct deps) and the reset-on-unmount live
 * here, so heroes stay declarative (`useHeaderThemeSync('dark')`) instead of
 * each hand-writing an effect that pokes shared state. Unmounting returns the
 * header to the ambient theme automatically.
 */
export const useHeaderThemeSync = (theme: Theme | null): void => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(theme)
    return () => setHeaderTheme(null)
  }, [theme, setHeaderTheme])
}
