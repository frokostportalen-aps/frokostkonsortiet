import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PlanPickerBlock } from './Component'
import { quoteForm, withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Ordningsvælger',
  component: PlanPickerBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Interaktiv guide: to spørgsmål – hvad har I brug for, og hvor mange er I – og så peger den på den rigtige ordning og åbner tilbudsformularen med svarene udfyldt. Prøv den; den virker her.',
      },
    },
  },
  render: withTenant(PlanPickerBlock),
} satisfies Meta<typeof PlanPickerBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Hvilken ordning passer jer?',
    intro: 'To spørgsmål – så peger vi jer i den rigtige retning.',
    plans: [
      { need: 'frokost', minPeople: 15, title: 'Frokostordning', description: 'Leveret færdiglavet hver dag.', priceLabel: 'fra 63 kr. pr. kuvert', url: '#' },
      { need: 'kantine', minPeople: 40, title: 'Kantineordning', description: 'Vores kok står for frokosten hos jer.', priceLabel: 'Aftalepris', url: '#' },
      { need: 'catering', minPeople: 1, title: 'Catering', description: 'Til møder, receptioner og fester.', priceLabel: 'Efter opgave', url: '#' },
    ],
    form: quoteForm(),
  } as never,
}
