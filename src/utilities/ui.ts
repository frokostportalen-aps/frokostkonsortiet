/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * `twMerge`, taught the theme's own scale keys.
 *
 * tailwind-merge only knows Tailwind's built-in scales, so a custom key falls
 * outside its class group and stops cancelling the built-in one: `cn('rounded-lg',
 * 'rounded-band')` kept *both*, and CSS source order — not the caller — decided
 * the corner. Every token added to `@theme` that shares a property with a
 * built-in scale has to be registered here, or a `className` passthrough
 * silently stops working.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: ['rounded-band'],
      tracking: [
        'tracking-eyebrow',
        'tracking-label',
        'tracking-caps',
        'tracking-smallcaps',
        'tracking-display',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
