import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'type'>

/**
 * Forwards ref + rest props (onClick, aria-*, …) to the underlying anchor, so
 * the component works inside Radix `asChild` slots (e.g. `SheetClose` in the
 * mobile menu) — a Slot injects its close-handler as props, and dropping them
 * leaves dead buttons.
 */
export const CMSLink = React.forwardRef<HTMLAnchorElement, CMSLinkType>((props, ref) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    ...rest
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} ref={ref} {...newTabProps} {...rest}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} ref={ref} {...newTabProps} {...rest}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
})
CMSLink.displayName = 'CMSLink'
