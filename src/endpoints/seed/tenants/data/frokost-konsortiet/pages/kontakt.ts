import type { PageFactory } from '../../types'
import {
  column,
  content,
  formBlock,
  heading,
  hero,
  link,
  p,
  paragraph,
  richText,
  text,
} from '../../builders'

export const kontakt: PageFactory = ({ tenantID, img, tilbudsFormID }) => ({
  title: 'Kontakt',
  slug: 'kontakt',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('kontakt'),
    richText(
      heading('h1', 'Kontakt os'),
      p(
        'Frokost Konsortiets administration sidder klar til at hjælpe – uanset om du er kunde, kommende partner eller bare nysgerrig.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Hvem er vi'),
          p(
            'Frokost Konsortiets administration binder køkkenerne sammen og sikrer, at både kunder og partnere har ét sted at henvende sig. Vi står for den daglige drift, så køkkenerne kan koncentrere sig om maden.',
          ),
        ),
      ],
      'Hvem er vi',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Find os'),
          p('Hørkær 12, 2720 Herlev'),
          paragraph(text('Telefon: '), link('+45 72 10 88 10', 'tel:+4572108810')),
          paragraph(
            text('E-mail: '),
            link('kontakt@frokostkonsortiet.dk', 'mailto:kontakt@frokostkonsortiet.dk'),
          ),
          p('CVR-nr.: 46413148'),
        ),
      ],
      'Find os',
    ),
    formBlock(
      tilbudsFormID,
      richText(
        heading('h2', 'Skriv til os'),
        p('Fortæl os kort om jeres arbejdsplads, så vender vi tilbage inden for én hverdag.'),
      ),
    ),
  ],
  meta: {
    title: 'Kontakt',
    description:
      'Kontakt Frokost Konsortiets administration – Hørkær 12, 2720 Herlev, +45 72 10 88 10.',
    image: img('kontakt'),
  },
})
