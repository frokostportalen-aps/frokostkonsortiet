import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ClientListBlock } from './Component'

const meta = {
  title: 'Blokke/Kundeliste',
  component: ClientListBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Kundenavne sat typografisk – ingen logoer. Det holder væggen rolig og undgår en samling fremmede grafiske udtryk midt på siden.',
      },
    },
  },
} satisfies Meta<typeof ClientListBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Arbejdspladser der spiser med',
    clients: ['Aveny 4', 'Nordisk Tekstil', 'Bureau Nord', 'Havnens Advokater', 'Studio Vest', 'Klinik Søndre', 'Fonden Vestergade', 'Ingeniørhuset'].map((name) => ({ name })),
  } as never,
}
