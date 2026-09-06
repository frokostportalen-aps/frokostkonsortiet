import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContentBlock } from './Component'
import { heading, list, p, photos, richText, withTenant } from '@/stories/mocks'

const col = (size: string, ...nodes: object[]) => ({
  size,
  enableLink: false,
  richText: richText(...(nodes as never[])),
})

const meta = {
  title: 'Blokke/Content',
  component: ContentBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Tekst i spalter. En spalte kan fylde hele bredden, en halv, en tredjedel eller to tredjedele – bland dem frit. Spalterne kan gøres klikbare som kort, og hele sektionen kan lægges på et foto.',
      },
    },
  },
  render: withTenant(ContentBlock),
} satisfies Meta<typeof ContentBlock>

export default meta
type Story = StoryObj<typeof meta>

/** De fire spaltebredder. */
export const Spalter: Story = {
  args: {
    columns: [
      col(
        'twoThirds',
        heading('h3', 'To tredjedele'),
        p('Den brede spalte til brødtekst – her er plads til at forklare noget ordentligt.'),
        list(['Punktopstilling virker også', 'Og fylder pænt i spalten']),
      ),
      col('oneThird', heading('h3', 'En tredjedel'), p('Den smalle sidespalte til en pointe eller en note.')),
      col('half', heading('h3', 'Halv bredde'), p('To af dem giver en ren totdeling.')),
      col('half', heading('h3', 'Halv bredde'), p('Samme størrelse, så de flugter hele vejen ned.')),
    ],
  } as never,
}

/** Klikbare kort – fx til at pege videre til de andre sites. */
export const LinkKort: Story = {
  name: 'Link-kort',
  args: {
    columns: ['Smagssans', 'Fra Jorden', 'Frokostportalen'].map((navn) => ({
      size: 'oneThird',
      enableLink: true,
      link: { type: 'custom', appearance: 'default', label: `Besøg ${navn}`, url: '#' },
      richText: richText(heading('h3', navn), p('En linje om hvad stedet er kendt for.')),
    })),
  } as never,
}

/** Hele sektionen på et foto, med læseslør over. Brug det sparsomt. */
export const PåFoto: Story = {
  name: 'På foto',
  args: {
    background: photos.raavarer(),
    columns: [
      col(
        'full',
        heading('h3', 'Tekst oven på et billede'),
        p('Stærkt virkemiddel – det virker bedst når der er luft omkring det.'),
      ),
    ],
  } as never,
}
