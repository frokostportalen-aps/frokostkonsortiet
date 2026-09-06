import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MediaBlock } from './Component'
import { photos } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Media Block',
  component: MediaBlock,
  parameters: {
    docs: {
      description: {
        component: 'Ét billede i fuld bredde. Ikke andet – til at give siden luft mellem to tekstafsnit.',
      },
    },
  },
} satisfies Meta<typeof MediaBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: { media: photos.koekken() } as never,
}
