import React from 'react'

import type { PriceMenuBlock as PriceMenuBlockProps } from '@/payload-types'
import type { TenantDesign } from '@/themes/tenantThemes'

import { SectionHeader } from '@/components/SectionHeader'
import { SignatureCard } from '@/components/SignatureCard'
import { cn } from '@/utilities/ui'

type Props = PriceMenuBlockProps & { design?: TenantDesign }

/**
 * A restaurant-style menu with prices: sections as signature cards, each line
 * with a dotted leader running from dish to price — the classic menukort
 * gesture. Prices render in the tenant's heading face, so a serif site gets
 * elegant figures and a sans site confident ones.
 */
export const PriceMenuBlock: React.FC<Props> = ({ heading, intro, sections, note, design }) => {
  if (!sections?.length) return null

  const single = sections.length === 1

  return (
    <div className="container">
      <SectionHeader heading={heading} intro={intro} className="mb-10" />

      <div
        className={cn(
          'grid items-start gap-6 md:gap-8',
          single ? 'mx-auto max-w-[44rem]' : 'md:grid-cols-2',
        )}
      >
        {sections.map((section, i) => (
          <SignatureCard key={i} signature={design?.signature}>
            <h3 className="font-heading text-2xl font-semibold tracking-tight">
              {section.title}
            </h3>
            {section.description && (
              <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
            )}

            <ul className="mt-6 flex flex-col gap-5">
              {(section.items || []).map((item, j) => (
                <li
                  key={j}
                  className={cn(
                    item.featured &&
                      '-mx-3 rounded-[var(--radius)] bg-accent px-3 py-3 text-accent-foreground md:-mx-4 md:px-4',
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold leading-snug">{item.name}</span>
                    {item.featured && (
                      <span className="hidden shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary-foreground sm:inline-block">
                        Anbefalet
                      </span>
                    )}
                    {/* The dotted leader — the line your eye follows on a real
                        menukort. */}
                    <span
                      aria-hidden
                      className="min-w-8 flex-1 -translate-y-0.5 border-b border-dotted border-foreground/30"
                    />
                    <span className="font-heading whitespace-nowrap text-lg font-semibold leading-none text-primary">
                      {item.price}
                    </span>
                  </div>
                  {(item.description || item.unit) && (
                    <div className="mt-1 flex items-baseline gap-4">
                      {item.description && (
                        <p className="max-w-[34rem] text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      {item.unit && (
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                          {item.unit}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </SignatureCard>
        ))}
      </div>

      {note && <p className="mt-6 text-center text-sm text-muted-foreground">{note}</p>}
    </div>
  )
}
