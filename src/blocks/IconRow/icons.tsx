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

import type { IconName } from './options'

/**
 * Name → glyph for the food pictograms, the other half of `ICON_OPTIONS`.
 *
 * It lives here rather than beside the options because `options.ts` is imported
 * by `config.ts`, and the Payload config is built in Node: pulling React icon
 * components into that graph is exactly what `blockConfigs` warns against.
 * Typed as a total `Record<IconName, …>`, so an option added to the list fails
 * to compile until it has a glyph — which is the whole point of keeping the two
 * halves in one place instead of one copy per block that renders them.
 */
export const ICON_COMPONENTS: Record<
  IconName,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
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
