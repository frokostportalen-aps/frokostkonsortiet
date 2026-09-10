import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import React from 'react'

import type { MenuDay, WeeklyMenu } from '@/data/weeklyMenu'

import { getDialect } from '@/themes/dialect'
import { WeeklyMenuClient } from './Component.client'

/**
 * Storybook renders the *client* half of the block: the server half fetches
 * from frokostportalen, which Storybook has no business reaching. The weeks
 * below are fixtures in the shape `normalizeWeek` produces — including the
 * "Gris" allergen that breaks the numbering and the CO2 figures the kitchens
 * publish.
 */
const dish = (
  title: string,
  variants: string[],
  carbonPerKg: number | null,
  allergens: [string, string][],
) => ({
  title,
  subTitle: null,
  variants,
  carbonPerKg,
  allergens: allergens.map(([code, name]) => ({ code, name })),
})

const day = (date: string, weekday: string, dayLabel: string): MenuDay => ({
  date,
  weekday,
  dayLabel,
  categories: [
    {
      title: 'Varmt måltid',
      dishes: [
        dish(
          'Spansk tortilla med chorizo, løg, peberfrugt, kartofler og rosmarin',
          ['Klima', 'Standard'],
          2.11,
          [
            ['3', 'Æg'],
            ['Gris', 'Svinekød'],
          ],
        ),
        dish('Spansk tortilla med kalkun-chorizo', ['Uden gris', 'Halal'], 3.04, [['3', 'Æg']]),
      ],
    },
    {
      title: 'Vegetarisk måltid',
      dishes: [
        dish('Spansk tortilla med gedeost, løg og cherrytomater', ['Pescetar', 'Vegetar'], 1.51, [
          ['3', 'Æg'],
          ['7', 'Mælk'],
        ]),
      ],
    },
    {
      title: 'Vegansk måltid',
      dishes: [
        dish('Catalan coca – spansk pizza med peberfrugt, zucchini og rødløg', ['Vegansk'], 1.07, [
          ['1', 'Gluten'],
        ]),
      ],
    },
  ],
  allergens: [
    { code: '1', name: 'Gluten' },
    { code: '3', name: 'Æg' },
    { code: '7', name: 'Mælk' },
    { code: 'Gris', name: 'Svinekød' },
  ],
})

const week37: WeeklyMenu = {
  week: 37,
  year: 2026,
  days: [
    day('2026-09-07', 'Mandag', '7. september'),
    day('2026-09-08', 'Tirsdag', '8. september'),
    day('2026-09-09', 'Onsdag', '9. september'),
    day('2026-09-10', 'Torsdag', '10. september'),
    day('2026-09-11', 'Fredag', '11. september'),
  ],
}

const week38: WeeklyMenu = {
  week: 38,
  year: 2026,
  days: [
    day('2026-09-14', 'Mandag', '14. september'),
    day('2026-09-15', 'Tirsdag', '15. september'),
    day('2026-09-16', 'Onsdag', '16. september'),
  ],
}

type Args = React.ComponentProps<typeof WeeklyMenuClient>

/** Resolves the dialect from the toolbar's site, the way the server half does. */
const Preview = (args: Args, { globals }: { globals: { tenant?: string } }) => {
  const { signature, eyebrow } = getDialect(globals.tenant)
  return <WeeklyMenuClient {...args} signature={signature} eyebrowStyle={eyebrow} />
}

const meta = {
  title: 'Blokke/Ugens menu',
  component: WeeklyMenuClient,
  parameters: {
    docs: {
      description: {
        component:
          'Ugens menu hentet fra frokostportalen: faner for uge og dag, retterne grupperet som køkkenet har grupperet dem, med menuvariationer, allergener og CO2e pr. kg. Retterne kommer fra sitets eget køkken-ID – de skrives ikke i blokken.',
      },
    },
  },
  render: Preview,
} satisfies Meta<typeof WeeklyMenuClient>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  heading: 'Ugens menu',
  eyebrow: '– hver ret med allergener og CO2e',
  intro: null,
  note: 'Menuen lægges en uge frem. Der kan forekomme ændringer.',
  emptyMessage: null,
  showAllergens: true,
  showCarbon: true,
  showVariants: true,
  today: '2026-09-08',
} satisfies Partial<Args>

/** Den uge, der er i gang – tirsdag åbner, fordi det er "i dag". */
export const DenneUge: Story = {
  args: { ...base, weeks: [week37] } as never,
}

/** Køkkenet har lagt næste uge op, så der er to faner at vælge mellem. */
export const ToUger: Story = {
  args: { ...base, weeks: [week37, week38] } as never,
}

/** Køkkenet har ikke lagt ugen op endnu – blokken siger det frem for at stå tom. */
export const IkkeLagtOp: Story = {
  args: {
    ...base,
    weeks: [],
    emptyMessage: 'Ugens menu er ikke lagt op endnu. Prøv igen om et par dage.',
  } as never,
}

/** Uden allergener og klimatal – for et køkken, der ikke oplyser dem. */
export const KunRetter: Story = {
  args: {
    ...base,
    weeks: [week37],
    showAllergens: false,
    showCarbon: false,
    showVariants: false,
  } as never,
}
