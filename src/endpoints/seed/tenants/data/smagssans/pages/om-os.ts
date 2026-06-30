import type { PageFactory } from '../../types'
import { content, column, heading, hero, mediaBlock, p, richText } from '../../builders'

export const omOs: PageFactory = ({ tenantID, img }) => ({
  title: 'Om Smagssans',
  slug: 'om-os',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('om-os'),
    richText(
      heading('h1', 'Om Smagssans'),
      p(
        'Smagssans blev født ud af en simpel overbevisning: at en frokost kan vække alle sanser, hvis man tør give den opmærksomhed.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Håndværket'),
          p(
            'Vores kokke arbejder som komponister. En ret skal have kontraster – det sprøde mod det bløde, det syrlige mod det fede – og en duft, der lover det, smagen holder.',
          ),
          p(
            'Vi smager til hele vejen og justerer efter dagens råvarer, for to gulerødder er aldrig helt ens.',
          ),
          heading('h2', 'Råvarerne'),
          p(
            'Vi vælger leverandører, der brænder for det samme som os, og lader sæsonen sætte rammen. Det betyder en menu i konstant bevægelse – og en frokost, der smager af året, lige nu.',
          ),
        ),
      ],
      'Om os',
    ),
    mediaBlock(img('om-os')),
  ],
  meta: {
    title: 'Om Smagssans',
    description:
      'Smagssans blev født ud af en simpel overbevisning: at en frokost kan vække alle sanser, hvis man tør give den opmærksomhed.',
    image: img('om-os'),
  },
})
