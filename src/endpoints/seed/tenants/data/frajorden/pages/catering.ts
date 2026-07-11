import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  faq,
  heading,
  hero,
  p,
  priceMenu,
  richText,
} from '../../builders'

export const catering: PageFactory = ({ tenantID, img }) => ({
  title: 'Catering',
  slug: 'catering',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('catering'),
    richText(
      heading('h1', 'Catering'),
      p('Fra Jorden leverer catering til selskaber, receptioner og mærkedage – mad, der gør dagen til noget særligt.'),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Selskabsmenuer')),
        column(
          'oneThird',
          heading('h3', 'Konfirmation'),
          p('Festmenuer til den store dag, tilpasset både børn og voksne.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Reception'),
          p('Lækre anretninger og snacks til stående arrangementer.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Selskaber'),
          p('Flerretters menuer til fødselsdage, jubilæer og firmafester.'),
        ),
      ],
      'Selskabsmenuer',
    ),
    priceMenu({
      heading: 'Menukort',
      intro: 'Sæsonens råvarer bestemmer detaljerne – priserne her er vejledende udgangspunkter.',
      sections: [
        {
          title: 'Selskabsmenuer',
          description: 'Leveret eller serveret – som I ønsker det.',
          items: [
            {
              name: '3-retters menu',
              description: 'Forret, hovedret og dessert af sæsonens økologiske råvarer.',
              price: 'fra 325 kr.',
              unit: 'pr. person',
              featured: true,
            },
            {
              name: '2-retters menu',
              description: 'Hovedret og dessert – eller forret, hvis I hellere vil starte stærkt.',
              price: 'fra 265 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Grøn buffet',
              description: 'Rigt udvalg af varme og kolde retter, hvor grøntsagen har hovedrollen.',
              price: 'fra 195 kr.',
              unit: 'pr. person',
            },
          ],
        },
        {
          title: 'Reception & mærkedage',
          description: 'Stående arrangementer, hvor maden må gøre indtryk.',
          items: [
            {
              name: 'Receptionsanretninger',
              description: 'Udvalg af anretninger, snacks og finger food – tilpasset antal gæster.',
              price: 'fra 145 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Kagebord',
              description: 'Hjemmebagte kager og sødt til eftermiddagens fejring.',
              price: 'fra 65 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Drikkevarepakke',
              description: 'Økologisk vin, øl og alkoholfrit – afstemt med menuen.',
              price: 'fra 95 kr.',
              unit: 'pr. person',
            },
          ],
        },
      ],
      note: 'Alle priser er ekskl. moms og levering. Endelig pris afhænger af sæson og antal gæster.',
    }),
    faq(
      [
        {
          q: 'Hvor lang tid i forvejen skal vi bestille?',
          a: 'Til større selskaber anbefaler vi at bestille i god tid, men vi løser også gerne opgaver med kort varsel.',
        },
        {
          q: 'Tager I højde for allergier?',
          a: 'Ja. Fortæl os om allergier og særlige hensyn, så tilpasser vi menuen.',
        },
      ],
      'Ofte stillede spørgsmål',
    ),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud?'),
        p('Fortæl os om jeres arrangement, så sammensætter vi en menu, der passer til anledningen.'),
      ),
      [customLink('Få et tilbud', '/om-os#tilbud')],
    ),
  ],
  meta: {
    title: 'Catering',
    description: 'Catering fra Fra Jorden – selskabsmenuer, receptioner og mærkedage.',
    image: img('catering'),
  },
})
