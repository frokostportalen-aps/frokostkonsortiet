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
} from '../../builders'

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
    mediaContent(
      img('frokost-ud-af-huset'),
      'right',
      richText(
        heading('h2', 'Mindre administration, mindre madspild'),
        p(
          'I appen vælger den enkelte medarbejder selv kostønsker, tilføjer gæster og melder ferie. Det giver et præcist bestillingsgrundlag – så I betaler for det, I faktisk spiser, og slipper for den tunge administration.',
        ),
      ),
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Også til kontorfællesskaber'),
          p(
            'Deler I adresse med andre virksomheder? Vores software gør, at hver virksomhed selv bestiller, retter til, melder ferie og holder styr på økonomien – og hver virksomhed får sin egen faktura.',
          ),
        ),
        column(
          'full',
          heading('h2', 'Medarbejderappen'),
          p(
            'I appen vælger den enkelte medarbejder selv kostønsker – vegetar, vegansk, pescetar, glutenfri, laktosefri eller uden gris – tilføjer gæster og melder ferie. Det giver mindre tung administration og mindre madspild.',
          ),
        ),
      ],
      'Kontorfællesskab og app',
    ),
    cta(
      richText(
        heading('h3', 'Kom nemt i gang'),
        p('Som kunde får I adgang til KundePortalen, hvor I selv styrer bestilling og tilretning.'),
      ),
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Nem bestilling & tilretning',
    description:
      'KundePortalen gør det nemt selv at justere behov, holde øje med madspild og bevare overblikket.',
    image: img('kundeportal'),
  },
})
