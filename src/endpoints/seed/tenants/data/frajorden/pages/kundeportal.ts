import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText } from '../../builders'

export const kundeportal: PageFactory = ({ tenantID, img }) => ({
  title: 'Nem bestilling & tilretning',
  slug: 'kundeportal',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('kundeportal'),
    richText(
      heading('h1', 'Introduktion til vores KundePortal'),
      p('Se hvordan I selv nemt kan justere jeres behov og sikre, at der altid er nok af favoritterne.'),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Med KundePortalen kan I')),
        column(
          'oneThird',
          heading('h3', 'Tilret behov'),
          p('Juster antal og menu med få klik, så I altid har nok af favoritterne.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Hold øje med madspild'),
          p('Undgå at smide penge i skraldespanden ved at følge jeres forbrug.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Fuldt overblik'),
          p('Se forbrug og fakturering samlet ét sted – også fra app.'),
        ),
      ],
      'Med KundePortalen kan I',
    ),
    cta(
      richText(
        heading('h3', 'Kom nemt i gang'),
        p('Som kunde får I adgang til KundePortalen, hvor I selv styrer bestilling og tilretning.'),
      ),
      [customLink('Få et tilbud', '/om-os#tilbud')],
    ),
  ],
  meta: {
    title: 'Nem bestilling & tilretning',
    description:
      'KundePortalen gør det nemt selv at justere behov, holde øje med madspild og bevare overblikket.',
    image: img('kundeportal'),
  },
})
