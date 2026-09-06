import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TeamBlock } from './Component'
import { photos } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Mød køkkenet',
  component: TeamBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Portrætter med navn, titel og en personlig linje. Billede og navn er påkrævet; titel og citat er valgfri.',
      },
    },
  },
} satisfies Meta<typeof TeamBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Menneskene bag maden',
    intro: 'Billede, navn og titel er nok – citatet er valgfrit.',
    members: [
      { image: photos.portraet(), name: 'Steffen Krogh', role: 'Køkkenchef', quote: 'Jeg laver den mad, jeg selv gerne vil have klokken tolv.' },
      { image: photos.anretning(), name: 'Anne Dahl', role: 'Souschef', quote: 'Sæsonen bestemmer, ikke kalenderen.' },
      { image: photos.koekken(), name: 'Peter Foss', role: 'Bager' },
    ],
  } as never,
}
