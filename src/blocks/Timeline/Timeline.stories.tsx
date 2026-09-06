import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TimelineBlock } from './Component'

const meta = {
  title: 'Blokke/Tidslinje',
  component: TimelineBlock,
  parameters: {
    docs: {
      description: {
        component: 'Lodret tidslinje med årstal – til historie og milepæle.',
      },
    },
  },
} satisfies Meta<typeof TimelineBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Vejen hertil',
    items: [
      { year: '2014', title: 'Første køkken', description: 'Vi begyndte med ét køkken og fire kunder.' },
      { year: '2019', title: 'Eget bageri', description: 'Brødet holdt op med at komme udefra.' },
      { year: '2024', title: 'Tre huse', description: 'Konsortiet samler i dag tre selvstændige køkkener.' },
    ],
  } as never,
}
