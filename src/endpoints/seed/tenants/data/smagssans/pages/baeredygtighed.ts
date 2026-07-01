import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  heading,
  hero,
  mediaContent,
  p,
  richText,
  stats,
} from '../../builders'

export const baeredygtighed: PageFactory = ({ tenantID, img }) => ({
  title: 'Bæredygtighed',
  slug: 'baeredygtighed',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('baeredygtighed'),
    richText(
      heading('h1', 'Bæredygtighed'),
      p(
        'Som produktionsvirksomhed har vi et stort ansvar for at værne om vores miljø. Derfor indgår bæredygtighed som en naturlig del af måden, vi arbejder og tænker på – fra planlægning af menuer til valg af råvarer og produktion.',
      ),
    ),
  ),
  layout: [
    mediaContent(
      img('forside-2'),
      'left',
      richText(
        heading('h2', '100% grøn strøm'),
        p(
          'Vi anvender 100 % miljøvenlig strøm i vores produktion. Med DAKA refood sørger vi for, at vores madrester genanvendes til biogas – et grønt og CO₂-venligt alternativ til forbrænding.',
        ),
      ),
    ),
    mediaContent(
      img('efteraarets-smage'),
      'right',
      richText(
        heading('h2', 'Mindre madspild'),
        p(
          'Madspild er spild af ressourcer og penge. Som en af de første i frokostbranchen har vi sat fokus på de mængder mad, der hver dag havner i skraldespanden.',
        ),
        p(
          'Ved at sælge vores frokostordninger i gram hjælper vi kunderne til at blive mere bevidste om deres behov. Det gavner både miljøet og bundlinjen.',
        ),
      ),
    ),
    stats([
      { value: '100%', label: 'grøn strøm i produktionen' },
      { value: 'I gram', label: 'sælger vi maden' },
      { value: 'Biogas', label: 'madrester via DAKA refood' },
      { value: 'Sæson', label: 'danske råvarer i fokus' },
    ]),
    content(
      [
        column('full', heading('h2', 'Hvad står vi for?')),
        column(
          'half',
          heading('h3', 'Mindre miljøpåvirkning'),
          p('Vi implementerer løbende processer, der reducerer virksomhedens aftryk på miljøet.'),
        ),
        column(
          'half',
          heading('h3', 'Sund og smagfuld mad'),
          p(
            'Vi tager ansvar for at levere mad, der ikke kun er velsmagende, men også sund og holder hjernen skarp.',
          ),
        ),
        column(
          'half',
          heading('h3', 'Den rigtige næring'),
          p(
            'Menuerne sammensættes, så medarbejderne får næring, der styrker immunforsvaret og koncentrationsevnen – og skaber glæde og energi.',
          ),
        ),
        column(
          'half',
          heading('h3', 'Glade medarbejdere'),
          p(
            'Det betyder noget at arbejde med noget, der giver mening. Det øger motivationen og driver os til at gøre os umage.',
          ),
        ),
      ],
      'Hvad står vi for',
    ),
    cta(
      richText(
        heading('h3', 'Vil I have bæredygtig frokost på menuen?'),
        p('Ring til os på 72 10 88 10, så fortæller vi, hvordan en uge med Smagssans smager.'),
      ),
      [customLink('Se vores frokostordning', '/frokost-ud-af-huset')],
    ),
  ],
  meta: {
    title: 'Bæredygtighed – Smagssans',
    description:
      'Bæredygtighed hos Smagssans – 100% grøn strøm, madrester til biogas via DAKA refood, salg i gram og mindre madspild.',
    image: img('baeredygtighed'),
  },
})
