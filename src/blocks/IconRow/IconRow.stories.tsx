import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { IconRowBlock } from './Component'
import { withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Ikonrække',
  component: IconRowBlock,
  parameters: {
    docs: {
      description: {
        component:
          'En række runde pictogrammer med tekst under – til hensyn, mærkninger og den slags. Ikonerne kommer fra en fast liste, så rækken læses som ét sæt; de skifter tone på skift, så den får rytme.',
      },
    },
  },
  render: withTenant(IconRowBlock),
} satisfies Meta<typeof IconRowBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Hensyn vi tager',
    eyebrow: 'Allergener',
    intro: 'Alle retter er mærket – både online og på skiltene ved buffeten.',
    items: [
      { icon: 'leaf', label: 'Vegetar', note: 'Mindst én varm ret hver dag' },
      { icon: 'sprout', label: 'Vegansk' },
      { icon: 'wheat', label: 'Glutenfri' },
      { icon: 'milk', label: 'Laktosefri' },
      { icon: 'fish', label: 'Fisk' },
    ],
    note: 'Fodnoten står i et fremhævet felt under rækken.',
  } as never,
}
