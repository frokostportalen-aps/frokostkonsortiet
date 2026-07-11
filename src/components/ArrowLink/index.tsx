import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The shared "read more →" micro-interaction: the gap to the arrow widens on
 * hover. One definition instead of a copy per block.
 */
export const ArrowLink: React.FC<{
  href: string
  children: React.ReactNode
  className?: string
}> = ({ href, children, className }) => (
  <Link
    href={href}
    className={cn(
      'group inline-flex items-center gap-1.5 py-2 font-medium text-primary transition-[gap] hover:gap-2.5',
      className,
    )}
  >
    {children}
    <ArrowRight aria-hidden className="size-4" />
  </Link>
)
