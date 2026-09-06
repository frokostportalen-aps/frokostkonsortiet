import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CallToActionBlock } from './Component'
import { cta, heading, p, richText, withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Call to Action',
  component: CallToActionBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Den afsluttende opfordring. Båndet står i sitets primærfarve i fuld styrke, så siden ender på brandet i stedet for at fade ud. Hører typisk nederst på en side.',
      },
    },
  },
  render: withTenant(CallToActionBlock),
} satisfies Meta<typeof CallToActionBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    richText: richText(
      heading('h3', 'Skal vi tage en snak?'),
      p('Vi vender tilbage inden for én hverdag med et tilbud, der passer til jer.'),
    ),
    links: [cta('Få et tilbud'), cta('Ring til os', 'outline')],
  } as never,
}

/** Med én knap – når der kun er én rigtig næste handling. */
export const ÉnKnap: Story = {
  name: 'Én knap',
  args: {
    richText: richText(heading('h3', 'Klar til at smage?')),
    links: [cta('Book en prøvedag')],
  } as never,
}
