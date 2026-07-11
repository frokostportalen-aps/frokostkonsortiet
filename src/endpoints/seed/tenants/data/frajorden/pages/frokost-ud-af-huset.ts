import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  faq,
  heading,
  hero,
  mediaBlock,
  p,
  priceMenu,
  richText,
  steps,
} from '../../builders'

export const frokostUdAfHuset: PageFactory = ({ tenantID, img }) => ({
  title: 'Frokost ud af huset',
  slug: 'frokost-ud-af-huset',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('frokost-ud-af-huset'),
    richText(
      heading('h1', 'Frokost ud af huset'),
      p(
        'Fra Jorden leverer daglig frokost til jeres arbejdsplads – med variation, sæson og bæredygtighed i centrum.',
      ),
    ),
  ),
  layout: [
    priceMenu({
      heading: 'Menu og priser',
      intro: 'Vælg portionsstørrelsen, der passer til jeres arbejdsplads – alt er 100% økologisk.',
      sections: [
        {
          title: 'Daglig frokost',
          description: 'Varm ret, salater og pålæg – leveret hver morgen inden frokost.',
          items: [
            {
              name: 'Large portion',
              description: 'Varm ret + tilbehør (350 g), 2 salater, 2 slags pålæg. Ost hver mandag, kage om torsdagen.',
              price: '69 kr.',
              unit: 'pr. kuvert',
              featured: true,
            },
            {
              name: 'Medium portion',
              description: 'Varm ret + tilbehør (250 g), 2 salater, 3 slags pålæg. Ost hver mandag, kage om torsdagen.',
              price: '65 kr.',
              unit: 'pr. kuvert',
            },
          ],
        },
        {
          title: 'Grønne tilkøb',
          description: 'Fra samme avlere som frokosten.',
          items: [
            {
              name: 'Økologisk frugtordning',
              description: 'Sæsonens frugt fra danske avlere.',
              price: 'fra 7 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Grøn morgenordning',
              description: 'Friskbagt brød, ost og grøn smoothie.',
              price: 'fra 16 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Kaffe & økologisk mælk',
              description: 'Bønner og mælk, leveret med frokosten.',
              price: 'fra 11 kr.',
              unit: 'pr. person',
            },
          ],
        },
      ],
      note: 'Alle priser er ekskl. moms. Log ind for at se hele menuen.',
    }),
    content(
      [
        column(
          'full',
          heading('h2', 'Buffist-service'),
          p(
            'Som en del af Frokost Konsortiet tilbyder Fra Jorden, at I kan prøve vores kollegaers køkken, når I har brug for forandring. Nem håndtering via KundePortal & App.',
          ),
        ),
      ],
      'Buffist-service',
    ),
    mediaBlock(img('fra-bunden')),
    steps(
      [
        {
          title: 'Fortæl os om jer',
          description: 'Antal, adresse og hvor grønne I vil være – resten finder vi ud af.',
        },
        {
          title: 'Vi planlægger med avlerne',
          description: 'Menuen følger, hvad markerne giver netop nu.',
        },
        {
          title: 'Leveret inden frokost',
          description: 'Hver morgen, så maden står klar, når sulten melder sig.',
        },
        {
          title: 'Tilret frem til dagen før',
          description: 'I betaler kun for det, I faktisk får – det holder spildet nede.',
        },
      ],
      'Sådan foregår det',
      'Fra mark til frokostbord i fire trin.',
    ),
    faq(
      [
        {
          q: 'Hvornår er jeres tilmeldingsfrist?',
          a: 'I tilmelder og tilretter antal i KundePortalen frem til dagen før levering, så I altid betaler for det, I faktisk får.',
        },
        {
          q: 'Hvornår leverer I frokosten?',
          a: 'Vi leverer hver morgen inden frokost, så maden står klar, når sulten melder sig.',
        },
      ],
      'Ofte stillede spørgsmål',
    ),
    cta(
      richText(
        heading('h3', 'Få et tilbud'),
        p('Fortæl os om jeres arbejdsplads, så sammensætter vi en frokostordning, der passer.'),
      ),
      [customLink('Få et tilbud', '/om-os#tilbud')],
    ),
  ],
  meta: {
    title: 'Frokost ud af huset',
    description: 'Daglig frokostordning fra Fra Jorden – leveret til jeres arbejdsplads.',
    image: img('frokost-ud-af-huset'),
  },
})
