import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FormBlock } from './Component'
import { heading, p, quoteForm, richText } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Form Block',
  component: FormBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Indlejrer en formular fra Formularer. Felterne, knapteksten og kvitteringen styres på selve formularen, ikke på blokken – så den samme formular kan ligge flere steder og stadig kun rettes ét sted.',
      },
    },
  },
} satisfies Meta<typeof FormBlock>

export default meta
type Story = StoryObj<typeof meta>

export const MedIntro: Story = {
  name: 'Med intro',
  args: {
    form: quoteForm(),
    enableIntro: true,
    introContent: richText(heading('h3', 'Få et tilbud'), p('Introteksten over formularen er valgfri.')),
  } as never,
}

export const UdenIntro: Story = {
  name: 'Uden intro',
  args: { form: quoteForm(), enableIntro: false } as never,
}
