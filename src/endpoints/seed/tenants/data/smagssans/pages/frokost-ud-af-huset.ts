import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  faq,
  heading,
  hero,
  list,
  mediaContent,
  p,
  richText,
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
    content(
      [
        column(
          'full',
          heading('h2', 'Priseksempler'),
          p('Vi tilpasser frokostordningen efter jeres behov og budget. Her er tre populære menuer.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Den mest populære'),
          heading('h4', 'Fra 63 kr.'),
          list([
            'Varm ret med tilbehør',
            'Friske salater',
            'Pålæg og brød',
            'Frugt eller sødt',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Den lette'),
          heading('h4', 'Fra 58 kr.'),
          list([
            'Lettere varm ret',
            'Friske salater',
            'Pålæg og brød',
            'Færre kalorier, fuld smag',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Vegetar'),
          heading('h4', 'Fra 63 kr.'),
          list([
            'Grøn varm ret',
            'Friske salater',
            'Grønt pålæg og brød',
            'Frugt eller sødt',
          ]),
        ),
        column('full', p('Log ind for at se hele menuen. Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
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
