import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

// Root fallback (outside the tenant layout, so no header/footer/theme) — keep
// it calm and in Danish; the tenant-level not-found handles the styled case.
export default function NotFound() {
  return (
    <div className="container flex flex-col items-start gap-6 py-28 md:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Fejl 404
      </p>
      <h1 className="max-w-[36rem] text-balance text-4xl font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl">
        Den side findes ikke
      </h1>
      <p className="max-w-[36rem] text-lg text-muted-foreground">
        Siden er måske flyttet eller taget af menuen.
      </p>
      <Button asChild size="lg" variant="default">
        <Link href="/">Til forsiden</Link>
      </Button>
    </div>
  )
}
