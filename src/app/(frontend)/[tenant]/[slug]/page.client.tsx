'use client'
import React from 'react'

import { useHeaderThemeSync } from '@/providers/HeaderTheme'

/**
 * The header theme this route falls back to. A high-impact hero claims the same
 * slot and mounts after this one, so where there is one its claim wins; this is
 * what stands when the hero is `none`, low or medium impact.
 */
const PageClient: React.FC = () => {
  useHeaderThemeSync('light')
  return <React.Fragment />
}

export default PageClient
