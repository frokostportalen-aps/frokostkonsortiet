import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContentBlock } from './Component'
import {
  align,
  heading,
  list,
  p,
  photos,
  richText,
  sectionHeader,
  withTenant,
} from '@/stories/mocks'

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
      col(
        'oneThird',
        heading('h3', 'En tredjedel'),
        p('Den smalle sidespalte til en pointe eller en note.'),
      ),
      col('half', heading('h3', 'Halv bredde'), p('To af dem giver en ren totdeling.')),
      col(
        'half',
        heading('h3', 'Halv bredde'),
        p('Samme størrelse, så de flugter hele vejen ned.'),
      ),
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

/**
 * Sektionsoverskriften, som redaktøren indsætter inde i spaltens tekst — samme
 * titel som båndblokkene sætter gennem deres egne felter. Skift site i
 * værktøjslinjen: Smagssans sætter linjen i kapitæler, de to andre i spærrede
 * versaler.
 */
export const Sektionsoverskrift: Story = {
  args: {
    columns: [
      col(
        'full',
        sectionHeader(
          '"Vi tilpasser os jeres hverdag – ikke omvendt"',
          'De fleste frokostordninger går galt af de samme fire grunde. Sådan løser vi dem:',
        ),
        p('Brødteksten fortsætter under overskriften som almindelig tekst i spalten.'),
      ),
    ],
  } as never,
}

/**
 * Den samme blok i et kort. Overskriften tæmmes til kortets skala, og den
 * spærrede linje beholder brandfarven – kortets dæmpning rammer kun brødtekst.
 */
export const SektionsoverskriftIKort: Story = {
  name: 'Sektionsoverskrift i kort',
  args: {
    columns: [
      col('oneThird', sectionHeader('Fast ugeplan', 'Hver mandag'), p('En linje brødtekst under.')),
      col('oneThird', sectionHeader('Egen kok', 'På stedet'), p('En linje brødtekst under.')),
      col(
        'oneThird',
        sectionHeader('Ingen binding', 'Løbende måned'),
        p('En linje brødtekst under.'),
      ),
    ],
  } as never,
}

/** Justering, som redaktøren sætter den fra værktøjslinjen. */
export const Tekstjustering: Story = {
  args: {
    columns: [
      col(
        'full',
        align(heading('h3', 'Midtstillet overskrift'), 'center'),
        align(p('Midtstillet afsnit – til en pointe der skal stå alene.'), 'center'),
        p('Venstrestillet er som altid udgangspunktet.'),
        align(p('Højrestillet, fx til en byline eller en note.'), 'right'),
      ),
    ],
  } as never,
}
