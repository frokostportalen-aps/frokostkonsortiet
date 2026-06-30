import type { PageFactory } from '../../types'
import { column, content, cta, customLink, faq, heading, hero, list, p, richText } from '../../builders'

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
    content(
      [
        column(
          'oneThird',
          heading('h3', '3-retters menu'),
          list([
            'Forret, hovedret og dessert',
            'Sæsonens råvarer',
            'Leveret eller serveret',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Reception'),
          list([
            'Udvalg af anretninger',
            'Snacks og finger food',
            'Tilpasset antal gæster',
          ]),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
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
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Catering',
    description: 'Catering fra Fra Jorden – selskabsmenuer, receptioner og mærkedage.',
    image: img('catering'),
  },
})
