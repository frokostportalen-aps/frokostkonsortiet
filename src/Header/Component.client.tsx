'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'
import type { TenantLogo } from '@/themes/tenantThemes'

import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header | null
  /** The site's standing CTA (resolved server-side from the tenant tokens). */
  cta?: { label: string; url: string }
  /** The resolved logo (uploaded image or wordmark), resolved server-side. */
  logo: TenantLogo
  /** This site dresses its chrome as a fixed light surface (see `Chrome`). */
  brandChrome?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, cta, logo, brandChrome }) => {
  const { headerTheme } = useHeaderTheme()

  return (
    // Brand chrome pins the light palette: the header keeps the page's own paper
    // surface in both modes rather than following the theme or borrowing the
    // hero's, which a logo drawn for light backgrounds needs. It is then opaque,
    // so the background spans the full width and the container sits inside.
    <header
      className={cn('relative z-20', brandChrome && 'bg-background text-foreground')}
      data-theme={brandChrome ? 'light' : (headerTheme ?? undefined)}
    >
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          {/* text-foreground re-resolves under the header's data-theme, so the
              logo turns light on dark heroes and dark on light heroes. */}
          <Logo loading="eager" priority="high" logo={logo} className="text-foreground" />
        </Link>
        <HeaderNav data={data} cta={cta} />
      </div>
    </header>
  )
}
