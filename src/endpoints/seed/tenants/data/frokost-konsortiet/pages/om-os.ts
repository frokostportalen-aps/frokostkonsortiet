import type { PageFactory } from '../../types'
import { content, column, heading, hero, mediaBlock, p, richText, timeline } from '../../builders'

export const omOs: PageFactory = ({ tenantID, img }) => ({
  title: 'Om Frokost Konsortiet',
  slug: 'om-os',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('om-os'),
    richText(
      heading('h1', 'Om Frokost Konsortiet'),
      p(
        'Frokost Konsortiet startede som en idé om, at god frokost ikke skal være et kompromis mellem smag, sundhed og bæredygtighed.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Idéen bag'),
          p(
            'Frokost Konsortiet startede med en ambition om at gøre frokostpausen til dagens højdepunkt. I dag betyder det, at en arbejdsplads kan få sæsonens grøntsager den ene uge og sanselige smagskompositioner den næste.',
          ),
          p(
            'Vi udvikler os løbende og holder fast i vores værdier om kvalitet, åbenhed og respekt for råvarerne.',
          ),
          heading('h2', 'Sådan arbejder vi'),
          p(
            'Vi står for menuplanlægning, levering og den daglige kontakt, så I altid har ét sted at henvende jer. Det giver jer det bedste fra begge verdener: passion for håndværket og driftssikkerhed i hverdagen.',
          ),
        ),
      ],
      'Om os',
    ),
    timeline(
      [
        {
          year: '1980',
          title: 'Det første køkken',
          description:
            'Smagssans åbner i København – måske Danmarks ældste catering og fundamentet under familien.',
        },
        {
          year: '2016',
          title: 'Det grønne køkken',
          description:
            'Fra Jorden gror frem med 100% økologi, faste avlere og korte forsyningskæder.',
        },
        {
          year: '2021',
          title: 'FrokostPortalen',
          description:
            'Én digital indgang til bestilling, tilretning og overblik – på tværs af køkkenerne.',
        },
        {
          year: '2024',
          title: 'Konsortiet samles',
          description:
            'Køkkenerne samles under ét: ét sprog, flere dialekter – og én aftale for kunderne.',
        },
      ],
      'Vores historie',
      'Fra ét køkken til et fællesskab af køkkener.',
    ),
    mediaBlock(img('om-os')),
  ],
  meta: {
    title: 'Om Frokost Konsortiet',
    description:
      'Frokost Konsortiet startede som en idé om, at god frokost ikke skal være et kompromis mellem smag, sundhed og bæredygtighed.',
    image: img('om-os'),
  },
})
