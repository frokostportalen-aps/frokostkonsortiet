import type { PageFactory } from '../../types'
import {
  content,
  column,
  formBlock,
  heading,
  hero,
  mediaBlock,
  p,
  richText,
  timeline,
  team,
} from '../../builders'

export const omOs: PageFactory = ({ tenantID, img, tilbudsFormID }) => ({
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
    timeline(
      [
        {
          year: '2016',
          title: 'Begyndte på marken',
          description:
            'Fra Jorden starter som et samarbejde med to økologiske avlere på Sjælland – og fire kunder.',
        },
        {
          year: '2018',
          title: 'Spisemærke i guld',
          description:
            'Det Økologiske Spisemærke i guld: 90–100% økologi i alt, hvad vi laver – og det har vi holdt siden.',
        },
        {
          year: '2022',
          title: 'Hele høsten i brug',
          description:
            'Vi begynder at aftage avlernes fulde høst – også de skæve – og halverer spildet på marken.',
        },
        {
          year: '2024',
          title: 'Del af Frokost Konsortiet',
          description: 'Fra Jorden bliver en del af familien – samme jord, større bord.',
        },
      ],
      'Vores rejse',
      'Fra to avlere og fire kunder til det grønne køkken i familien.',
    ),
    team(
      [
        {
          image: img('koekkenchef'),
          name: 'Steffen Krog',
          role: 'Køkkenchef & medstifter',
          quote: 'Jeg ringer til avlerne, før jeg skriver menuen – aldrig omvendt.',
        },
      ],
      'Mød køkkenet',
      'Manden bag menuen – og bindeleddet til markerne.',
    ),
    mediaBlock(img('koekkenet')),
    formBlock(
      tilbudsFormID,
      richText(
        heading('h2', 'Få et tilbud'),
        p('Fortæl os om jeres arbejdsplads, så vender vi tilbage med et grønt tilbud inden for én hverdag.'),
      ),
    ),
  ],
  meta: {
    title: 'Om Fra Jorden',
    description:
      'Fra Jorden begyndte på markerne, ikke i køkkenet. Vi tror på, at den bedste frokost starter med den bedste jord.',
    image: img('om-os'),
  },
})
