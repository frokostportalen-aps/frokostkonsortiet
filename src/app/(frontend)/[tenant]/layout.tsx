import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { TenantTheme } from '@/components/TenantTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getTenantBySlug } from '@/utilities/getTenant'
import { getServerSideURL, getTenantServerURL } from '@/utilities/getURL'
import { getTenantTheme } from '@/themes/tenantThemes'
import { getTenantFont } from '@/themes/fonts'

type Args = {
  children: React.ReactNode
  params: Promise<{ tenant: string }>
}

export default async function TenantLayout({ children, params }: Args) {
  const { tenant } = await params
  const font = getTenantFont(tenant)

  // `display: contents` so this wrapper carries the font (className defines the
  // var; --font-sans + font-family cascade to children) without adding a box
  // that would break the footer's `mt-auto` against the body flex column.
  const fontStyle = {
    display: 'contents',
    ...(font ? { '--font-sans': font.sansVar, fontFamily: 'var(--font-sans)' } : {}),
    ...(font?.headingVar ? { '--font-heading': font.headingVar } : {}),
  } as React.CSSProperties

  // Both font classNames so the body var AND the heading var are defined.
  const fontClassName = [font?.className, font?.headingClassName].filter(Boolean).join(' ')

  return (
    <div className={fontClassName} style={fontStyle}>
      <TenantTheme theme={getTenantTheme(tenant)} />
      <Header tenantSlug={tenant} />
      <main id="main-content">{children}</main>
      <Footer tenantSlug={tenant} />
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenantBySlug(tenantSlug)

  return {
    metadataBase: new URL(tenant ? getTenantServerURL(tenant) : getServerSideURL()),
    title: tenant?.name ? { default: tenant.name, template: `%s | ${tenant.name}` } : undefined,
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
