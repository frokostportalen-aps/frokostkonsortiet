import type { PageFactory } from '../../types'
import { content, column, heading, hero, mediaBlock, p, richText } from '../../builders'

export const omOs: PageFactory = ({ tenantID, img }) => ({
  title: 'Om Fra Jorden',
  slug: 'om-os',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('om-os'),
    richText(
      heading('h1', 'Om Fra Jorden'),
      p(
        'Fra Jorden begyndte på markerne, ikke i køkkenet. Vi tror på, at den bedste frokost starter med den bedste jord.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Jord til bord'),
          p(
            'Vi arbejder tæt sammen med økologiske avlere og planlægger menuen efter, hvad jorden giver netop nu. Det holder forsyningskæden kort og smagen høj.',
          ),
          p(
            'Hele råvaren kommer i spil – top, skræl og rod – så vi får mest mulig smag ud af mindst muligt spild.',
          ),
          heading('h2', 'Grøn gastronomi'),
          p(
            'Et grønt køkken er ikke et fravalg, men et overflødighedshorn. Med fermentering, ristning og kloge krydringer gør vi grøntsagen til hovedrolleindehaver.',
          ),
        ),
      ],
      'Om os',
    ),
    mediaBlock(img('om-os')),
  ],
  meta: {
    title: 'Om Fra Jorden',
    description:
      'Fra Jorden begyndte på markerne, ikke i køkkenet. Vi tror på, at den bedste frokost starter med den bedste jord.',
    image: img('om-os'),
  },
})
