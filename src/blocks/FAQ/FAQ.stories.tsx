import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FAQBlock } from './Component'
import { p, richText } from '@/stories/mocks'

const qa = (question: string, answer: string) => ({ question, answer: richText(p(answer)) })

const meta = {
  title: 'Blokke/FAQ',
  component: FAQBlock,
  parameters: {
    docs: {
      description: {
        component: 'Spørgsmål og svar der folder ud når man klikker. Svaret er rich text, så det kan rumme links og lister.',
      },
    },
  },
} satisfies Meta<typeof FAQBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Det I plejer at spørge om',
    items: [
      qa('Leverer I til os?', 'Vi kører i hele Hovedstaden og på Sjælland. Skriv jeres postnummer i formularen, så bekræfter vi samme hverdag.'),
      qa('Kan vi prøve det først?', 'Ja – en prøvedag for hele huset, uden beregning og uden binding.'),
      qa('Hvad med allergier?', 'Navngivne portioner uden ekstra beregning, og alle 14 lovpligtige allergener er mærket.'),
    ],
  } as never,
}
