import type { PageFactory } from '../../types'
import { column, content, cta, customLink, faq, heading, hero, list, p, richText } from '../../builders'

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
    content(
      [
        column(
          'full',
          heading('h2', 'Priseksempler'),
          p('Vælg portionsstørrelsen, der passer til jeres arbejdsplads.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Large portion'),
          heading('h4', '69 kr.'),
          list([
            'Varm ret + tilbehør (350 g)',
            '2 salater',
            '2 slags pålæg',
            'Ost hver mandag',
            'Kage om torsdagen',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Medium portion'),
          heading('h4', '65 kr.'),
          list([
            'Varm ret + tilbehør (250 g)',
            '2 salater',
            '3 slags pålæg',
            'Ost hver mandag',
            'Kage om torsdagen',
          ]),
        ),
        column('full', p('Log ind for at se hele menuen. Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
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
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Frokost ud af huset',
    description: 'Daglig frokostordning fra Fra Jorden – leveret til jeres arbejdsplads.',
    image: img('frokost-ud-af-huset'),
  },
})
