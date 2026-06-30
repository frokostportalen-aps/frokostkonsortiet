import type { PageFactory } from '../../types'
import { content, column, heading, hero, mediaBlock, p, richText } from '../../builders'

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
          heading('h2', 'Vores historie'),
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
    mediaBlock(img('om-os')),
  ],
  meta: {
    title: 'Om Frokost Konsortiet',
    description:
      'Frokost Konsortiet startede som en idé om, at god frokost ikke skal være et kompromis mellem smag, sundhed og bæredygtighed.',
    image: img('om-os'),
  },
})
