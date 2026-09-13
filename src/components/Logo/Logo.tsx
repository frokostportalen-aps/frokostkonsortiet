import clsx from 'clsx'
import NextImage from 'next/image'
import React from 'react'

import type { TenantLogo } from '@/themes/tenantThemes'

interface Props {
  className?: string
  /**
   * Rendered height in px, when a slot needs another size than the registry's
   * own — the printed menu sheet wants a letterhead, not a nav-bar mark. Given
   * here rather than as a class, because the height is also what `next/image`
   * is asked to optimise for: a class could only fight the inline style with
   * `!important`, and would leave the image requested at the wrong size.
   */
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /**
   * The resolved logo (uploaded image or wordmark), resolved server-side by
   * `resolveTenantBrand` — the single fallback authority, so this component
   * never needs the theme registry (which must stay out of the client bundle).
   */
  logo: TenantLogo
}

const DEFAULT_LOGO_HEIGHT = 34

const imgClass = 'w-auto max-w-[12rem] object-contain'

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logo,
    height: heightFromProps,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Wordmark. Renders in the site's own font (inherited) and inherits the
  // surrounding text color, so it reads on both the header and dark footer.
  const text = logo.text || 'Logo'
  const wordmark = (visibility?: string) => (
    <span
      className={clsx('font-semibold leading-none tracking-tight', visibility, className)}
      // Scaled from the same height the image branch uses, so a tenant without
      // an uploaded logo isn't left with a nav-sized word on the print sheet.
      style={{ fontSize: (props.height ?? DEFAULT_LOGO_HEIGHT) * 0.7 }}
    >
      {text}
    </span>
  )

  if (!logo.src && !logo.srcDark) return wordmark()

  // Rendered size, derived from the upload's own aspect ratio. Passing the real
  // px to `next/image` — rather than the intrinsic size — is what keeps it from
  // shipping a 1200px original for a 56px slot: it optimizes to the size asked
  // for, in a modern format. `sizes` is a fixed px value because the logo never
  // reflows.
  const height = heightFromProps ?? logo.displayHeight ?? DEFAULT_LOGO_HEIGHT
  const ratio = (logo.width || 193) / (logo.height || DEFAULT_LOGO_HEIGHT)
  const shared = {
    alt: text,
    height,
    width: Math.round(height * ratio),
    sizes: `${Math.round(height * ratio)}px`,
    // Pin the rendered height: `w-auto` in the class would otherwise let the
    // intrinsic size win, and the class alone can't (the anchor has no height).
    style: { height },
  }

  // A light-on-dark variant swaps in on dark surfaces (footer, dark heroes) via
  // the `dark:` variant, which this project wires to a `[data-theme='dark']`
  // ancestor. The dark img always loads lazily: it is CSS-hidden on light
  // surfaces (display:none alone does not stop the fetch), so it must not
  // compete with the header's eager, high-priority light logo — and where it is
  // visible it sits in the footer, below the fold.
  const darkImg = logo.srcDark ? (
    <NextImage
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
      <NextImage
        {...shared}
        priority={priority === 'high'}
        loading={priority === 'high' ? undefined : loading}
        className={clsx(imgClass, darkImg && 'dark:hidden', className)}
        src={logo.src}
      />
      {darkImg}
    </>
  )
}
