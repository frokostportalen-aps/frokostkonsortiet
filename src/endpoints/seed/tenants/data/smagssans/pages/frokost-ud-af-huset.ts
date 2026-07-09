import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  faq,
  heading,
  hero,
  mediaContent,
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
      heading('h1', 'Frokostordning'),
      p(
        'Maden laver vi helt færdig og sender den med chauffør i termo- og transportkasser til jer. I stiller bare frem – så er frokosten klar, når sulten melder sig.',
      ),
    ),
  ),
  layout: [
    priceMenu({
      heading: 'Menuer og priser',
      intro:
        'Vi tilpasser frokostordningen efter jeres behov og budget. Alle menuer leveres færdiglavet med chauffør.',
      sections: [
        {
          title: 'Frokostordning',
          description: 'Daglig frokost, klar til at stille frem.',
          items: [
            {
              name: 'Den mest populære',
              description: 'Varm ret med tilbehør, friske salater, pålæg og brød – og frugt eller sødt.',
              price: 'fra 63 kr.',
              unit: 'pr. kuvert',
              featured: true,
            },
            {
              name: 'Den lette',
              description: 'Lettere varm ret, friske salater, pålæg og brød. Færre kalorier, fuld smag.',
              price: 'fra 58 kr.',
              unit: 'pr. kuvert',
            },
            {
              name: 'Vegetar',
              description: 'Grøn varm ret, friske salater, grønt pålæg og brød – og frugt eller sødt.',
              price: 'fra 63 kr.',
              unit: 'pr. kuvert',
            },
          ],
        },
        {
          title: 'Tilkøb',
          description: 'Gør frokosten komplet – leveres sammen med maden.',
          items: [
            {
              name: 'Frugtordning',
              description: 'Sæsonens frugt, klar i skålen.',
              price: 'fra 6 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Morgenbrød',
              description: 'Friskbagt brød med smør og marmelade.',
              price: 'fra 14 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Mælk & plantedrikke',
              description: 'Økologisk, kølet og klar i jeres køleskab.',
              price: 'fra 9 kr.',
              unit: 'pr. liter',
            },
            {
              name: 'Fredagskage',
              description: 'Hjemmebagt kage til ugens sidste time.',
              price: 'fra 18 kr.',
              unit: 'pr. person',
            },
          ],
        },
      ],
      note: 'Alle priser er ekskl. moms og baseret på levering fem dage om ugen. Log ind for at se hele menuen.',
    }),
    mediaContent(
      img('forside-2'),
      'right',
      richText(
        heading('h2', 'Sådan kommer maden ud til jer'),
        p(
          'Vi henter maden i vores køkken kl. 10.00 og sender den med chauffør i termo- og transportkasser, så den typisk er hos jer tidligst kl. 10.30. Deadline for bestilling er 2 hverdage før inden kl. 10.00 – det holder madspildet nede.',
        ),
      ),
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Mad til alle på arbejdspladsen'),
          p(
            'Via medarbejderappen vælger hver enkelt selv kostønsker – fisk, vegetar, vegansk, pescetar, glutenfri, laktosefri eller uden gris. Medarbejderne kan tilføje gæster og melde ferie, så I undgår tung administration og madspild.',
          ),
        ),
      ],
      'Mad til alle',
    ),
    steps(
      [
        {
          title: 'Ring eller skriv',
          description: 'Fortæl os om jeres arbejdsplads – antal, ønsker og eventuelle hensyn.',
        },
        {
          title: 'Vi smager til sammen',
          description: 'I prøver menuen, og vi justerer, til den rammer jeres smag.',
        },
        {
          title: 'Chaufføren leverer',
          description: 'Maden er typisk hos jer kl. 10.30 – i termo- og transportkasser.',
        },
        {
          title: 'Tilret i appen',
          description: 'Gæster, ferie og kostønsker klarer hver medarbejder selv.',
        },
      ],
      'Sådan foregår det',
      'Fire trin – så er frokosten på plads.',
    ),
    faq(
      [
        {
          q: 'Har I et minimum bestillingsantal?',
          a: 'Ja, som udgangspunkt 15 personer. Men giv os et kald, så ser vi, om vi ikke kan løse det alligevel.',
        },
        {
          q: 'Hvad tid leverer I frokosten?',
          a: 'Frokosten hentes i vores køkken kl. 10.00, så typisk er den hos jer tidligst kl. 10.30.',
        },
        {
          q: 'Kan vi nøjes med frokost 3-4 dage om ugen?',
          a: 'Det er muligt, men priserne stiger, da de er baseret på 5-dages levering.',
        },
      ],
      'Ofte stillede spørgsmål',
    ),
    cta(
      richText(
        heading('h3', 'Få et tilbud'),
        p('Fortæl os om jeres arbejdsplads, så sammensætter vi en frokostordning, der passer til jeres behov og budget.'),
      ),
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Frokostordning – Smagssans',
    description:
      'Daglig frokostordning fra Smagssans – maden laver vi helt færdig og sender den med chauffør i termo- og transportkasser til jer. Fra 58 kr. pr. kuvert.',
    image: img('frokost-ud-af-huset'),
  },
})
