import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FlipCardsBlock } from './Component'
import { photos, withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Vendekort',
  component: FlipCardsBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Kort med en forside, man ser, og en bagside, man vender frem: markøren over kortet viser bagsiden, et tryk holder den. Op til tre kort står side om side; fra det fjerde bliver rækken en slider, man kan swipe i. Farverne er sitets egne toner, så den samme række ser forskellig ud fra site til site.',
      },
    },
  },
  render: withTenant(FlipCardsBlock),
} satisfies Meta<typeof FlipCardsBlock>

export default meta
type Story = StoryObj<typeof meta>

/** Layout 1: portionsstørrelserne – foto på forsiden, gramvægt og forklaring bagpå. */
export const Portionsstoerrelser: Story = {
  args: {
    eyebrow: 'Først skal du vælge den bedste løsning for jeres arbejdsplads',
    heading: 'Hvad koster det hos jer?',
    cards: [
      {
        front: 'image',
        image: photos.anretning(),
        label: 'Small – 63,-',
        tone: 'auto',
        title: '450 gram',
        subtitle: 'Pr. person',
        body: 'Arbejdspladsen med et overtal af personer, som spiser begrænset.',
      },
      {
        front: 'image',
        image: photos.buffet(),
        label: 'Medium – 66,-',
        tone: 'auto',
        title: '500 gram',
        subtitle: 'Pr. person',
        body: 'Arbejdspladsen med et bredt gennemsnit i alder og køn.',
      },
      {
        front: 'image',
        image: photos.raavarer(),
        label: 'Large – 69,-',
        tone: 'auto',
        title: '550 gram',
        subtitle: 'Pr. person',
        body: 'Arbejdspladsen, hvor mange betragter frokosten som dagens hovedmåltid.',
      },
    ],
  } as never,
}

/** Layout 2: tilkøbet – stregtegning på forsiden, lille prisskilt bagpå. */
export const Tilkoeb: Story = {
  args: {
    heading: 'Vil I have mere med?',
    intro: 'Vend kortene for at se, hvad der ligger i hver kategori.',
    cards: [
      {
        front: 'icon',
        icon: 'milk',
        label: 'Mælk',
        tone: 'sand',
        title: 'Vores mest populære',
        lines: [
          { name: 'Mælk pr. liter', note: 'Min- og skummetmælk', price: '13,-' },
          { name: 'Let- og sødmælk', note: null, price: '16,-' },
          { name: 'Økologisk mælk pr. liter', note: 'Min- og skummetmælk', price: '16,-' },
          { name: 'Let- og sødmælk', note: null, price: '17,-' },
          { name: 'Minimælk – laktosefri', note: null, price: '22,-' },
          { name: 'Letmælk – laktosefri', note: null, price: '24,-' },
          { name: 'Havre-, soja-, mandel- eller rismælk', note: null, price: '26,-' },
        ],
        note: 'Alle priser er ex moms',
      },
      {
        front: 'icon',
        icon: 'croissant',
        label: 'Brød',
        tone: 'brand',
        title: 'Bagt om morgenen',
        body: 'Rugbrød, surdejsboller og et sødt stykke – leveret samtidig med frokosten.',
        lines: [
          { name: 'Rugbrød pr. stk.', note: null, price: '28,-' },
          { name: 'Surdejsboller pr. stk.', note: null, price: '9,-' },
        ],
        note: 'Alle priser er ex moms',
      },
    ],
  } as never,
}

/** Fra det fjerde kort bliver rækken en slider – swipe på touch, pile på mus. */
export const Slider: Story = {
  args: {
    heading: 'Ugens retter',
    cards: [
      {
        front: 'image',
        image: photos.anretning(),
        label: 'Mandag',
        tone: 'auto',
        title: 'Stegt flæsk',
        body: 'Persillesovs og nye kartofler.',
      },
      {
        front: 'image',
        image: photos.buffet(),
        label: 'Tirsdag',
        tone: 'auto',
        title: 'Grøn lasagne',
        body: 'Spinat, ricotta og ovnbagte tomater.',
      },
      {
        front: 'image',
        image: photos.raavarer(),
        label: 'Onsdag',
        tone: 'auto',
        title: 'Dampet torsk',
        body: 'Brunet smør, kapers og dild.',
      },
      {
        front: 'image',
        image: photos.koekken(),
        label: 'Torsdag',
        tone: 'auto',
        title: 'Kylling i karry',
        body: 'Ris, syltet agurk og ristede nødder.',
      },
      {
        front: 'icon',
        icon: 'salad',
        label: 'Fredag',
        tone: 'auto',
        title: 'Salatbar',
        body: 'Otte skåle, du selv sætter sammen.',
      },
    ],
  } as never,
}
