import type { Block } from 'payload'

import { eyebrowField } from '@/fields/eyebrow'

/**
 * The centred section title — heading plus the site's spaced underline — as a
 * block an editor can drop into a Content column's rich text.
 *
 * Deliberately absent from `blockConfigs`: this one belongs *inside* an editor,
 * like Banner and Code, not on the page-layout picker. And deliberately without
 * an intro field — running text under the title is what the rich text around it
 * is already for.
 */
export const SectionHeader: Block = {
  slug: 'sectionHeader',
  interfaceName: 'SectionHeaderBlock',
  labels: {
    singular: 'Sektionsoverskrift',
    plural: 'Sektionsoverskrifter',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Overskrift',
    },
    eyebrowField,
  ],
}
