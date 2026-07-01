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
      heading('h1', 'Catering og arrangementer'),
      p(
        'Maden er en vigtig del af ethvert selskab. Alle har en mening om den, og det er ofte over maden, gæsterne mødes. Det handler om at være glad for mad.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Vores cateringudvalg')),
        column(
          'oneThird',
          heading('h3', 'Morgenmad & brunch'),
          p('En lækker start på dagen – fra friske morgenborde til en mættende brunch.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Snack, sundt & kage'),
          p('Små lækkerier, sunde bidder og hjemmebag til mødet eller pausen.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Grab & Go'),
          p('Færdigpakket og nemt at gribe – perfekt til dagen i farten.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Buffet'),
          p('Et rigt udvalg af varme og kolde retter til den store forsamling.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Middag'),
          p('Flerretters middage til selskaber, receptioner og mærkedage.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Julehygge'),
          p('Julens klassikere og hyggelige anretninger til årets bedste sæson.'),
        ),
      ],
      'Cateringudvalg',
    ),
    mediaContent(
      img('efteraarets-smage'),
      'right',
      richText(
        heading('h2', 'Se vores kvalitet med egne øjne'),
        p(
          'Vi går op i, at maden ser lige så indbydende ud, som den smager. Fra det forfinede til det mættende klassiske selskabsmad – vi sammensætter det, der passer til jeres anledning.',
        ),
      ),
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Kokke og tjenere'),
          p(
            'Vi har hænderne til at servere maden. Vores tjenere og kokke kan komme ud og hjælpe, så I kan koncentrere jer om gæsterne, mens vi sørger for resten.',
          ),
        ),
      ],
      'Kokke og tjenere',
    ),
    faq(
      [
        {
          q: 'Kan I lave mad til firmafest eller reception?',
          a: 'Ja, vi har stor erfaring med selskaber og receptioner og finder en menu, der passer til anledningen.',
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
    title: 'Catering og arrangementer – Smagssans',
    description:
      'Catering fra Smagssans – morgenmad & brunch, snacks, Grab & Go, buffet, middag og julehygge. Kokke og tjenere kan hjælpe ved selskabet.',
    image: img('catering'),
  },
})
