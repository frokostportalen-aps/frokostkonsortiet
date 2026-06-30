import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText } from '../../builders'

export const services: PageFactory = ({ tenantID, img }) => ({
  title: 'Services',
  slug: 'services',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('services'),
    richText(
      heading('h1', 'Det vi står for'),
      p(
        'Frokost Konsortiet samler en række selvstændige køkkener under ét fællesskab. Sammen dækker vi hele paletten – fra den daglige frokost til store selskaber.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Vores services'),
          p('Uanset behov finder vi den løsning, der passer til jeres arbejdsplads.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Frokost ud af huset'),
          p(
            'Daglig frokostordning leveret til jeres adresse – med variation, sæson og bæredygtighed i centrum.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Kantinedrift'),
          p('Vi driver jeres kantine med friske buffeter og faste menuer, tilpasset jeres rammer og budget.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Catering & selskaber'),
          p(
            'Selskabsmenuer, receptioner og events – store som små – med mad, der gør dagen til noget særligt.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Mødeforplejning'),
          p('Tapas, platter og smørrebrød til møder, samt inhouse mødeservice med opdækning og afrydning.'),
        ),
        column(
          'oneThird',
          heading('h3', 'FrokostPortalen'),
          p('Ét digitalt sted til bestilling, tilretning og overblik over den daglige økonomi.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Bæredygtig drift'),
          p('Lavt CO₂-aftryk, reduceret madspild og friske råvarer fra danske producenter i sæson.'),
        ),
      ],
      'Vores services',
    ),
    cta(
      richText(
        heading('h3', 'Skal vi forplejne jer?'),
        p('Tag fat i os, så finder vi det køkken og den løsning, der passer til jeres arbejdsplads.'),
      ),
      [customLink('Kontakt os', '/kontakt')],
    ),
  ],
  meta: {
    title: 'Services',
    description:
      'Frokost ud af huset, kantinedrift, catering, mødeforplejning og bæredygtig drift – samlet i Frokost Konsortiet.',
    image: img('services'),
  },
})
