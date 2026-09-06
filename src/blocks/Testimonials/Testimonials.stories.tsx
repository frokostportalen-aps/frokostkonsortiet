import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TestimonialsBlock } from './Component'

const meta = {
  title: 'Blokke/Testimonials',
  component: TestimonialsBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Citater fra kunder med navn og titel. Layoutet følger sitets dialekt: enten et ' +
          'marquee-bånd, der ruller dem forbi (initialerne sættes som fallback-avatar), ' +
          'eller kort side om side i et bånd, der skubbes ét kort ad gangen. Skift tenant i ' +
          'værktøjslinjen for at se forskellen.',
      },
    },
  },
  // The block picks its layout from the tenant's dialect, so the stories hand it
  // the tenant the toolbar is set to — the same slug the theme decorator uses.
  render: (args, { globals }) => (
    <TestimonialsBlock {...args} tenantSlug={globals.tenant as string} />
  ),
} satisfies Meta<typeof TestimonialsBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Tre: Story = {
  args: {
    heading: 'Hvad kunderne siger',
    intro: 'Tre citater fylder pænt; ét står også fint alene.',
    items: [
      {
        quote: 'Vi skiftede for et år siden og har ikke haft en eneste dårlig dag siden.',
        author: 'Mette Holm',
        role: 'Kontorchef, Aveny 4',
      },
      {
        quote: 'Maden er god, men det er leveringssikkerheden der gør forskellen.',
        author: 'Jonas Bech',
        role: 'Facility manager',
      },
      {
        quote: 'De fangede vores allergier fra dag ét uden at vi skulle minde om det.',
        author: 'Sara Lind',
        role: 'HR-partner',
      },
    ],
  } as never,
}

export const Ét: Story = {
  name: 'Ét citat',
  args: {
    items: [
      {
        quote: 'Det er den eneste leverandør vi aldrig har skullet rykke for noget.',
        author: 'Mette Holm',
        role: 'Kontorchef',
      },
    ],
  } as never,
}
