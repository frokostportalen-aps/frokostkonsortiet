'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import type { PlanPickerBlock as PlanPickerBlockProps } from '@/payload-types'

import { needLabel } from './options'

import { ArrowLink } from '@/components/ArrowLink'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Plan = NonNullable<PlanPickerBlockProps['plans']>[number]

/**
 * Interactive plan finder: pick a need and a headcount, get the matching
 * offering with a from-price and a straight line to the quote form. Matching
 * is client-side against the CMS-defined recommendations — the best match is
 * the one with the highest `minPeople` the headcount still clears.
 */
export const PlanPickerBlock: React.FC<PlanPickerBlockProps> = ({
  heading,
  intro,
  plans,
  ctaLabel,
  ctaUrl,
}) => {
  const needs = Array.from(new Set((plans || []).map((plan) => plan.need)))
  const [need, setNeed] = useState<string>(needs[0] ?? 'frokost')
  const [people, setPeople] = useState<number>(25)

  // Cheap derivation over a handful of CMS plans — no memo ceremony needed.
  const candidates = (plans || []).filter((plan) => plan.need === need)
  const cleared = candidates.filter((plan) => people >= (plan.minPeople ?? 1))
  const pool = cleared.length ? cleared : candidates
  const match = pool.length
    ? pool.reduce<Plan>(
        (best, plan) => ((plan.minPeople ?? 1) > (best.minPeople ?? 1) ? plan : best),
        pool[0],
      )
    : null

  if (!plans?.length) return null

  return (
    <div className="container">
      <div className="rounded-[calc(var(--radius)*1.5)] bg-secondary/70 p-6 md:p-12">
        <SectionHeader heading={heading} intro={intro} className="mb-8" />

        <div className="mx-auto grid max-w-[52rem] items-start gap-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
          {/* Inputs */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="plan-need">Hvad har I brug for?</Label>
              <select
                id="plan-need"
                value={need}
                onChange={(event) => setNeed(event.target.value)}
                className="border-input h-10 w-full cursor-pointer rounded-[var(--radius)] border bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-4 focus-visible:ring-ring/10"
              >
                {needs.map((value) => (
                  <option key={value} value={value}>
                    {needLabel(value)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="plan-people">Hvor mange er I?</Label>
              <Input
                id="plan-people"
                type="number"
                min={1}
                value={people}
                onChange={(event) => setPeople(Math.max(1, Number(event.target.value) || 1))}
              />
            </div>
          </div>

          {/* Recommendation */}
          {match && (
            <div className="flex flex-col rounded-[var(--radius)] border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Vores anbefaling til jer
              </p>
              <h3 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                {match.title}
              </h3>
              {match.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {match.description}
                </p>
              )}
              {match.priceLabel && (
                <p className="font-heading mt-4 text-xl font-semibold text-primary">
                  {match.priceLabel}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {ctaUrl && (
                  <Button asChild size="lg">
                    <Link href={ctaUrl}>{ctaLabel || 'Få et tilbud'}</Link>
                  </Button>
                )}
                <ArrowLink href={match.url}>Læs mere</ArrowLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
