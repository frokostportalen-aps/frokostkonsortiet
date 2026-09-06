import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { StepsBlock } from './Component'

const meta = {
  title: 'Blokke/Sådan foregår det',
  component: StepsBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Nummererede trin til en proces – hvad der sker fra første opkald til maden står på bordet. Hold det ved tre til fem trin.',
      },
    },
  },
} satisfies Meta<typeof StepsBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    heading: 'Fra første opkald til første frokost',
    intro: 'Tre trin, ikke mere.',
    items: [
      { title: 'I ringer', description: 'Vi tager en snak om hvor mange I er, og hvad I mangler.' },
      { title: 'Vi smager til', description: 'I får en prøvedag, hvor hele huset spiser med.' },
      { title: 'Frokosten lander', description: 'Første levering aftaler vi sammen.' },
    ],
  } as never,
}
