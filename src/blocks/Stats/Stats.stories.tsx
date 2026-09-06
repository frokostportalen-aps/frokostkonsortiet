import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { StatsBlock } from './Component'
import { withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Nøgletal',
  component: StatsBlock,
  parameters: {
    docs: {
      description: {
        component:
          'To til fire tal der skal huskes. Findes i tre toner: brandfarve, klima (sitets grønne) og sand. Overskrift og underrubrik er valgfri.',
      },
    },
  },
  render: withTenant(StatsBlock),
} satisfies Meta<typeof StatsBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Brandfarve: Story = {
  args: {
    heading: 'Tallene der tæller',
    intro: 'Underrubrikken er valgfri.',
    tone: 'brand',
    items: [
      { value: '98%', label: 'Leveret til tiden' },
      { value: '14', label: 'Allergener mærket' },
      { value: '12', label: 'Faste avlere' },
    ],
  } as never,
}

export const Klima: Story = {
  args: {
    tone: 'eco',
    items: [
      { value: '100%', label: 'Økologi' },
      { value: '0,9 kg', label: 'CO2e pr. kuvert' },
    ],
  } as never,
}

export const Sand: Story = {
  args: {
    tone: 'sand',
    items: [
      { value: '2014', label: 'Første køkken' },
      { value: '3', label: 'Køkkener i dag' },
      { value: '450', label: 'Kuverter om dagen' },
      { value: '1', label: 'Hverdag til svar' },
    ],
  } as never,
}
