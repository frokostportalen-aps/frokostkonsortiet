import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { getDialect } from '@/themes/dialect'
import { resolveTenantBrand } from '@/themes/resolveTenantBrand'
import { getAllTenants } from '@/utilities/getTenant'
import { getTenantCrossURL } from '@/utilities/getURL'
import { signatureMarkClass } from '@/components/SignatureMark'

// Shared link/heading recipes — used by both footer columns.
const footerHeadingClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'
const footerLinkClass =
  'w-fit py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground md:py-0'

export async function Footer({ tenantSlug }: { tenantSlug: string }) {
  // Independent lookups — run them concurrently.
  const [footerData, tenants, brand] = await Promise.all([
    getCachedGlobal('footer', tenantSlug, 1)() as Promise<FooterType | null>,
    getAllTenants(),
    resolveTenantBrand(tenantSlug),
  ])
  const navItems = footerData?.navItems || []

  const dialect = getDialect(tenantSlug)
  const currentTenant = tenants.find((t) => t.slug === tenantSlug)
  const mainTenant = tenants.find((t) => t.isMain)
  // Main site first, then the kitchens, so the directory reads as one family.
  // A tenant without a public domain yet has no site to link to — leave it
  // out rather than pointing its name at the wrong origin.
  const family = tenants
    .filter((t) => t.slug === tenantSlug || t.domains?.length)
    .sort((a, b) => Number(b.isMain ?? false) - Number(a.isMain ?? false))

  const year = new Date().getFullYear()

  return (
    <footer
      data-theme="dark"
      className="mt-auto border-t border-border bg-background text-foreground"
    >
      <div className="container grid gap-12 py-14 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="flex flex-col items-start gap-5 md:col-span-6 lg:col-span-5">
          <Link href="/">
            <Logo logo={brand.logo} />
          </Link>
          {dialect.tagline && (
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {dialect.tagline}
            </p>
          )}
          <span aria-hidden className={`block ${signatureMarkClass.footer[dialect.signature]}`} />
        </div>

        {/* Shortcuts */}
        {navItems.length > 0 && (
          <nav
            aria-label="Footermenu"
            className="flex flex-col gap-3 md:col-span-3 lg:col-span-3 lg:col-start-7"
          >
            <h2 className={footerHeadingClass}>Genveje</h2>
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="inline" className={footerLinkClass} />
            ))}
          </nav>
        )}

        {/* The family directory — every kitchen on its own domain */}
        {family.length > 1 && (
          <nav aria-label="Køkkener i familien" className="flex flex-col gap-3 md:col-span-3">
            <h2 className={footerHeadingClass}>Familien</h2>
            {family.map((t) =>
              t.slug === tenantSlug ? (
                <span
                  key={t.slug}
                  className="w-fit py-1.5 text-sm font-medium text-foreground md:py-0"
                >
                  {t.name}
                </span>
              ) : (
                <a key={t.slug} href={getTenantCrossURL(t)} className={footerLinkClass}>
                  {t.name}
                </a>
              ),
            )}
          </nav>
        )}
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {currentTenant?.name ?? mainTenant?.name ?? 'Frokost Konsortiet'}
            {currentTenant &&
              !currentTenant.isMain &&
              mainTenant &&
              ` · En del af ${mainTenant.name}`}
          </p>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
