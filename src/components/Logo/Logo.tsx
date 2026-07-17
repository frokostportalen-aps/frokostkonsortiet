import clsx from 'clsx'
import React from 'react'

import type { TenantLogo } from '@/themes/tenantThemes'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /**
   * The resolved logo (uploaded image or wordmark), resolved server-side by
   * `resolveTenantBrand` — the single fallback authority, so this component
   * never needs the theme registry (which must stay out of the client bundle).
   */
  logo: TenantLogo
}

const imgClass = 'h-[34px] w-auto max-w-[12rem] object-contain'

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Wordmark. Renders in the site's own font (inherited) and inherits the
  // surrounding text color, so it reads on both the header and dark footer.
  const text = logo.text || 'Logo'
  const wordmark = (visibility?: string) => (
    <span
      className={clsx('text-2xl font-semibold leading-none tracking-tight', visibility, className)}
    >
      {text}
    </span>
  )

  if (!logo.src && !logo.srcDark) return wordmark()

  const shared = {
    alt: text,
    width: logo.width || 193,
    height: logo.height || 34,
    decoding: 'async' as const,
  }

  // A light-on-dark variant swaps in on dark surfaces (footer, dark heroes) via
  // the `dark:` variant, which this project wires to a `[data-theme='dark']`
  // ancestor. The dark img always loads lazily: it is CSS-hidden on light
  // surfaces (display:none alone does not stop the fetch), so it must not
  // compete with the header's eager, high-priority light logo — and where it is
  // visible it sits in the footer, below the fold.
  const darkImg = logo.srcDark ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      {...shared}
      loading="lazy"
      className={clsx(imgClass, 'hidden dark:block', className)}
      src={logo.srcDark}
    />
  ) : null

  // Only a dark variant uploaded: the wordmark carries light surfaces, the
  // image takes over on dark ones.
  if (!logo.src) {
    return (
      <>
        {wordmark('dark:hidden')}
        {darkImg}
      </>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...shared}
        loading={loading}
        fetchPriority={priority}
        className={clsx(imgClass, darkImg && 'dark:hidden', className)}
        src={logo.src}
      />
      {darkImg}
    </>
  )
}
