'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header | null
  tenantSlug?: string
  /** The site's standing CTA (resolved server-side from the tenant tokens). */
  cta?: { label: string; url: string }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, tenantSlug, cta }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex items-center justify-between">
        <Link href="/">
          {/* text-foreground re-resolves under the header's data-theme, so the
              logo turns light on dark heroes and dark on light heroes. */}
          <Logo
            loading="eager"
            priority="high"
            tenantSlug={tenantSlug}
            className="text-foreground"
          />
        </Link>
        <HeaderNav data={data} cta={cta} />
      </div>
    </header>
  )
}
