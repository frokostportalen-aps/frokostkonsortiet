import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText } from '../../builders'

export const netvaerk: PageFactory = ({ tenantID, img }) => ({
  title: 'Netværk',
  slug: 'netvaerk',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('netvaerk'),
    richText(
      heading('h1', 'Netværk'),
      p(
        'I Frokost Konsortiet afholder vi møder og arrangementer for alle vores partnere. Vi faciliterer personalefester på tværs af hele konsortiet, så alle kan mødes og få et bredere kendskab til organisationen.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Kommende møder og arrangementer')),
        column(
          'oneThird',
          heading('h3', '14. august 2026'),
          p('Sommerfest for ansatte på tværs af konsortiet (lukket arrangement).'),
        ),
        column(
          'oneThird',
          heading('h3', '29. september 2026'),
          p('Fredagsbar for kollegaer i branchen – åbent arrangement.'),
        ),
        column(
          'oneThird',
          heading('h3', '1. oktober 2026'),
          p('Kvartalsmøde for køkkenchefer på tværs af konsortiet (lukket møde).'),
        ),
      ],
      'Kommende møder og arrangementer',
    ),
    cta(
      richText(
        heading('h3', 'Vil du med til fredagsbar?'),
        p(
          'Hold dig opdateret på vores arrangementer, eller skriv til os, hvis du vil høre mere om netværket.',
        ),
      ),
      [customLink('Kontakt os', '/kontakt')],
    ),
  ],
  meta: {
    title: 'Netværk',
    description: 'Møder, arrangementer og personalefester på tværs af Frokost Konsortiet.',
    image: img('netvaerk'),
  },
})
