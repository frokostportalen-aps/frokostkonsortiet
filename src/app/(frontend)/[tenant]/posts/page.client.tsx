'use client'
import React from 'react'

import { useHeaderThemeSync } from '@/providers/HeaderTheme'

/**
 * Claims the header's theme for as long as this route is mounted — there is no
 * hero here to claim it instead. The hook owns the release, so leaving the
 * route hands the header back to the ambient theme without anyone else having
 * to reset it.
 */
const PageClient: React.FC = () => {
  useHeaderThemeSync('light')
  return <React.Fragment />
}

export default PageClient
