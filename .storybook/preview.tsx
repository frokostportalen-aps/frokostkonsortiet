import type { Decorator, Preview } from '@storybook/nextjs-vite'
import React, { useEffect } from 'react'

import '../src/app/(frontend)/globals.css'

import { TenantTheme } from '../src/components/TenantTheme'
import { getTenantFont } from '../src/themes/fonts'
import { getTenantTheme } from '../src/themes/tenantThemes'

/**
 * The sites in the family. Switching between them in the toolbar is the point
 * of this Storybook: every block below is one shared component, and what makes
 * it look like Smagssans rather than Fra Jorden is only the theme and the font
 * — "ét sprog, tre dialekter".
 */
const TENANTS = [
  { value: 'frokost-konsortiet', title: 'Frokost Konsortiet' },
  { value: 'smagssans', title: 'Smagssans' },
  { value: 'frajorden', title: 'Fra Jorden' },
] as const

/**
 * The palette keys off `data-theme` on the document element, same as the site
 * sets it. A component and not the decorator body, because only a component may
 * call hooks — Storybook renders the decorator as one, but its name says
 * otherwise.
 */
const ThemeMode: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])
  return null
}

/**
 * Wraps every story exactly the way `app/(frontend)/[tenant]/layout.tsx` wraps a
 * page: the real `TenantTheme` injecting the real CSS variables, and the real
 * next/font classNames. Nothing about the look is mocked, so what a block does
 * here is what it does on the site.
 */
const withTenantTheme: Decorator = (Story, context) => {
  const tenant = context.globals.tenant as string
  const mode = context.globals.mode as 'light' | 'dark'
  const font = getTenantFont(tenant)

  const fontStyle = {
    ...(font ? { '--font-sans': font.sansVar, fontFamily: 'var(--font-sans)' } : {}),
    ...(font?.headingVar ? { '--font-heading': font.headingVar } : {}),
  } as React.CSSProperties

  const fontClassName = [font?.className, font?.headingClassName].filter(Boolean).join(' ')

  return (
    <div className={`${fontClassName} bg-background text-foreground`} style={fontStyle}>
      <ThemeMode mode={mode} />
      <TenantTheme theme={getTenantTheme(tenant)} />
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [withTenantTheme],

  globalTypes: {
    tenant: {
      description: 'Hvilket af de tre sites blokken vises i',
      toolbar: {
        title: 'Site',
        icon: 'globe',
        items: TENANTS.map(({ value, title }) => ({ value, title })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Lys eller mørk baggrund',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Lys' },
          { value: 'dark', title: 'Mørk' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    tenant: 'frokost-konsortiet',
    mode: 'light',
  },

  parameters: {
    // Every block here comes from the App Router side of the app, and some of
    // them (the form's redirect, a post card's link) call `useRouter`. Without
    // this the adapter mounts no router and those stories throw.
    nextjs: { appDirectory: true },
    // The blocks are full-width bands; a padded canvas would misrepresent them.
    layout: 'fullscreen',
    controls: { expanded: true },
    options: {
      // The block order is the one from `blocks/blockConfigs.ts`, which is also
      // the order of Payload's block picker — so the list an editor scrolls
      // here is the list they scroll in the admin.
      storySort: {
        order: [
          'Introduktion',
          'Designtokens',
          // Hero types in the order of Payload's own Type field.
          'Hero',
          ['High Impact', 'Medium Impact', 'Low Impact'],
          'Blokke',
          ['Call to Action', 'Content', 'Media Block', 'Media + Content', 'Archive', 'Form Block', 'FAQ', 'Ikonrække', 'Testimonials', 'Nøgletal', 'Menukort med priser', 'Sådan foregår det', 'Mød køkkenet', 'Ordningsvælger', 'Kundeliste', 'Tidslinje'],
          '*',
        ],
      },
    },
  },
}

export default preview
