import clsx from 'clsx'
import React from 'react'

import { getTenantLogo } from '@/themes/tenantThemes'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  tenantSlug?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, tenantSlug } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const logo = getTenantLogo(tenantSlug)

  // Image logo, when a tenant provides one.
  if (logo?.src) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        alt={logo.text || 'Logo'}
        width={logo.width || 193}
        height={logo.height || 34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[34px] w-auto max-w-[12rem] object-contain', className)}
        src={logo.src}
      />
    )
  }

  // Wordmark. Renders in the site's own font (inherited) and inherits the
  // surrounding text color, so it reads on both the header and dark footer.
  const text = logo?.text || 'Frokost Konsortiet'
  return (
    <span className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}>
      {text}
    </span>
  )
}
