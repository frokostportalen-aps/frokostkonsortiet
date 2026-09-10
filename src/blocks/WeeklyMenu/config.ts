import type { Block } from 'payload'

import { eyebrowField } from '@/fields/eyebrow'

/**
 * Ugens menu, hentet direkte fra frokostportalen.
 *
 * The block holds only the framing — the dishes are never typed in here. Which
 * kitchen it reads comes from the site itself (Tenants → Køkken-ID), so an
 * editor can't point one site's page at another kitchen's food by accident.
 */
export const WeeklyMenu: Block = {
  slug: 'weeklyMenu',
  interfaceName: 'WeeklyMenuBlock',
  labels: {
    singular: 'Ugens menu',
    plural: 'Ugens menu',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
      defaultValue: 'Ugens menu',
    },
    eyebrowField,
    {
      name: 'intro',
      type: 'text',
      label: 'Underoverskrift',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showAllergens',
          type: 'checkbox',
          label: 'Vis allergener',
          defaultValue: true,
          admin: {
            width: '50%',
            description: 'Numre på retten og forklaringen nederst under dagen.',
          },
        },
        {
          name: 'showCarbon',
          type: 'checkbox',
          label: 'Vis klimaaftryk',
          defaultValue: true,
          admin: {
            width: '50%',
            description: 'CO2e pr. kg på hver ret, som køkkenet har oplyst det.',
          },
        },
      ],
    },
    {
      name: 'showVariants',
      type: 'checkbox',
      label: 'Vis menuvariationer',
      defaultValue: true,
      admin: {
        description:
          'Hvilke variationer retten dækker – fx "Vegansk", "Uden gris", "Halal". Kommer fra køkkenets egen mærkning i portalen.',
      },
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fodnote',
      admin: {
        description: 'Fx "Menuen lægges en uge frem. Der kan forekomme ændringer."',
      },
    },
    {
      name: 'emptyMessage',
      type: 'text',
      label: 'Tekst når ugen ikke er lagt op',
      admin: {
        description:
          'Vises, hvis køkkenet endnu ikke har publiceret nogen uge. Står feltet tomt, bruges en standardtekst.',
      },
    },
  ],
}
