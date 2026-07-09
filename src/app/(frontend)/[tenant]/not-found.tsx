import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

// Rendered inside the tenant layout, so header/footer/theme all apply — the
// 404 stays "on brand" instead of falling back to a bare system page.
export default function NotFound() {
  return (
    <div className="container flex flex-col items-start gap-6 py-28 md:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Fejl 404</p>
      <h1 className="max-w-[36rem] text-balance text-4xl font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl">
        Den side findes ikke
      </h1>
      <p className="max-w-[36rem] text-lg text-muted-foreground">
        Siden er måske flyttet eller taget af menuen. Prøv forsiden, eller kig i vores nyheder.
      </p>
      <div className="mt-2 flex flex-wrap gap-4">
        <Button asChild size="lg" variant="default">
          <Link href="/">Til forsiden</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/posts">Se nyheder</Link>
        </Button>
      </div>
    </div>
  )
}
