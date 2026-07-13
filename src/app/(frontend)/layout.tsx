import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// The per-tenant Header/Footer and metadata live in `[tenant]/layout.tsx`.
// This root layout only owns the document shell shared by every site.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      // Tells Next the smooth scrolling is ours (globals.css, anchor jumps),
      // so it can force instant scroll resets on route changes.
      data-scroll-behavior="smooth"
      lang="da"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <ScrollReveal />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  // Shared fallback icons — the tenant layout overrides these with a
  // per-tenant SVG mark, so these only cover non-tenant routes.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
