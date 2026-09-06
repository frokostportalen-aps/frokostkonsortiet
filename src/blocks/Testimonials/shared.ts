import type { TestimonialsBlock } from '@/payload-types'

/** One customer quote. */
export type Item = NonNullable<TestimonialsBlock['items']>[number]

/**
 * What a layout variant is handed. `Component.tsx` does the empty check once
 * and passes the narrowed list on, so neither variant repeats the guard and
 * neither has to treat "no quotes" as a state it can be in.
 */
export type VariantProps = Omit<TestimonialsBlock, 'items'> & { items: Item[] }
