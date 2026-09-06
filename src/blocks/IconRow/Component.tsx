import React from 'react'
import {
  Apple,
  Beef,
  Carrot,
  ChefHat,
  Croissant,
  Egg,
  Fish,
  Ham,
  Heart,
  Leaf,
  Milk,
  Salad,
  Soup,
  Sprout,
  Truck,
  UtensilsCrossed,
  Wheat,
} from 'lucide-react'

import type { IconRowBlock as IconRowBlockProps } from '@/payload-types'
import type { IconName } from './options'

import { getDialect } from '@/themes/dialect'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

const icons: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  leaf: Leaf,
  sprout: Sprout,
  wheat: Wheat,
  milk: Milk,
  ham: Ham,
  beef: Beef,
  fish: Fish,
  egg: Egg,
  carrot: Carrot,
  salad: Salad,
  soup: Soup,
  apple: Apple,
  croissant: Croissant,
  'chef-hat': ChefHat,
  heart: Heart,
  truck: Truck,
  'utensils-crossed': UtensilsCrossed,
}

/**
 * A row of pictograms with a label under each — the section that answers "what
 * do you cover?" at a glance, before anyone reads a word.
 *
 * The badges cycle through the site's own surfaces rather than one repeated
 * fill: three quiet tones, then the brand colour, then the ink. That rhythm is
 * what keeps a row of similar marks from reading as a wall, and because the
 * tones are theme tokens every site gets the cycle in its own palette.
 */
const badgeTones = [
  'bg-secondary text-secondary-foreground',
  'bg-accent text-accent-foreground',
  'bg-muted text-foreground',
  'bg-primary text-primary-foreground',
  'bg-foreground text-background',
]

export const IconRowBlock: React.FC<IconRowBlockProps & { tenantSlug?: string }> = ({
  heading,
  eyebrow,
  intro,
  items,
  note,
  tenantSlug,
}) => {
  if (!items?.length) return null

  const { eyebrow: eyebrowStyle } = getDialect(tenantSlug)

  return (
    <div className="container">
      <SectionHeader
        heading={heading}
        eyebrow={eyebrow}
        intro={intro}
        eyebrowStyle={eyebrowStyle}
        className="mb-12"
      />

      <ul className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 md:gap-x-14">
        {items.map((item, i) => {
          const Icon = icons[item.icon]
          return (
            <li key={i} className="flex w-32 flex-col items-center text-center md:w-36">
              <span
                aria-hidden
                className={cn(
                  'flex size-20 items-center justify-center rounded-full',
                  badgeTones[i % badgeTones.length],
                )}
              >
                {Icon && <Icon className="size-9" strokeWidth={1.25} />}
              </span>
              <span className="mt-4 text-xs font-semibold uppercase tracking-eyebrow">
                {item.label}
              </span>
              {item.note && (
                <span className="mt-1.5 text-sm text-muted-foreground">{item.note}</span>
              )}
            </li>
          )
        })}
      </ul>

      {note && (
        <p className="mx-auto mt-12 max-w-[52rem] rounded-full bg-primary px-8 py-6 text-center text-primary-foreground md:px-12">
          {note}
        </p>
      )}
    </div>
  )
}
