import type { Field } from 'payload'

import { TONE_OPTIONS } from '@/utilities/tones'

/**
 * The colour of a card in a row. Shared for the same reason as the eyebrow:
 * the guidance on "Skiftevis" is the point, and two copies of it drift. Only
 * the first sentence — *what* the colour lands on — is the block's own.
 */
export const toneField = ({
  description,
  condition,
}: {
  /** What the tone colours on this block's card, as one short sentence. */
  description: string
  condition?: NonNullable<Field['admin']>['condition']
}): Field => ({
  name: 'tone',
  type: 'select',
  defaultValue: 'auto',
  label: 'Farve',
  options: [...TONE_OPTIONS],
  admin: {
    condition,
    description: `${description} "Skiftevis" giver kortene rækkens egen rytme – vælg kun en fast farve, hvis et bestemt kort skal skille sig ud.`,
  },
})
