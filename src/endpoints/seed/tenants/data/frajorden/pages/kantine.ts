import type { PageFactory } from '../../types'
import { column, content, cta, customLink, faq, heading, hero, list, p, richText } from '../../builders'

export const kantine: PageFactory = ({ tenantID, img }) => ({
  title: 'Kantine',
  slug: 'kantine',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('kantine'),
    richText(
      heading('h1', 'Kantinedrift'),
      p('Lad Fra Jorden drive jeres kantine – med friske buffeter og faste menuer, tilpasset jeres rammer.'),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Eksempel på buffetudvalg'),
          p(
            'Vores buffeter veksler dagligt med varme retter, salater, pålæg og friske grøntsager – altid med noget for enhver smag.',
          ),
        ),
      ],
      'Eksempel på buffetudvalg',
    ),
    content(
      [
        column(
          'oneThird',
          heading('h3', 'Management-aftale'),
          list([
            'Vi driver kantinen for jer',
            'Fast månedligt honorar',
            'Fuldt overblik via FrokostPortalen',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Kuvertpris-aftale'),
          list([
            'I betaler pr. kuvert',
            'Skalerer med antal spisende',
            'Ingen faste omkostninger',
          ]),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
    faq(
      [
        {
          q: 'Kan vi selv være med til at sammensætte menuen?',
          a: 'Ja. Vi planlægger menuen i tæt dialog med jer, så den passer til jeres medarbejdere og ønsker.',
        },
        {
          q: 'Hvor mange skal vi være for at få egen kantine?',
          a: 'Vi finder en model, der passer til jeres størrelse – fra mindre arbejdspladser til store kantiner.',
        },
      ],
      'Ofte stillede spørgsmål',
    ),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud?'),
        p('Vi kigger gerne forbi og giver et bud på, hvordan jeres kantine kan drives.'),
      ),
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Kantine',
    description: 'Kantinedrift fra Fra Jorden – friske buffeter og faste menuer tilpasset jeres rammer.',
    image: img('kantine'),
  },
})
