import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PriceMenuBlock } from './Component'
import { withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Menukort med priser',
  component: PriceMenuBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Retter med priser og prikkede linjer, som på en spisekarte. Priserne sættes i sitets overskriftsskrift, så et serif-site får elegante tal og et sans-site kontante.',
      },
    },
  },
  render: withTenant(PriceMenuBlock),
} satisfies Meta<typeof PriceMenuBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    eyebrow: 'Priser',
    heading: 'Hvad koster det',
    intro: 'Alle priser er ekskl. moms og pr. kuvert.',
    sections: [
      {
        title: 'Frokostordning',
        description: 'Leveret færdiglavet hver morgen.',
        items: [
          { name: 'Klassisk', description: 'Varm ret, salater, pålæg og sødt', price: '63', unit: 'kr.', featured: true },
          { name: 'Grøn', description: 'Samme opstilling, uden kød', price: '58', unit: 'kr.' },
        ],
      },
      {
        title: 'Mødeforplejning',
        items: [
          { name: 'Morgenbord', price: '45', unit: 'kr.' },
          { name: 'Sandwich', price: '75', unit: 'kr.' },
          { name: 'Eftermiddagskage', price: '25', unit: 'kr.' },
        ],
      },
    ],
    note: 'Minimum 15 kuverter. Levering er med i prisen.',
  } as never,
}
