'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

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
