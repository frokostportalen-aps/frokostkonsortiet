import type { PageFactory } from '../../types'
import { column, content, cta, customLink, faq, heading, hero, linkColumn, p, richText } from '../../builders'

export const partnere: PageFactory = ({ tenantID, img, tenants, siteUrl }) => {
  const kitchens = tenants.filter((t) => !t.isMain)
  return {
    title: 'Partnere',
    slug: 'partnere',
    _status: 'published',
    tenant: tenantID,
    hero: hero.medium(
      img('partnere'),
      richText(
        heading('h1', 'Bliv partner i Frokost Konsortiet'),
        p(
          'Vi tror på, at dygtige køkkenfolk skal kunne stå på egne ben uden at stå alene. Som partner får du fællesskab, administration og et stærkt netværk i ryggen.',
        ),
      ),
    ),
    layout: [
      faq(
        [
          {
            q: 'Jeg har ingen opstartskapital – kan jeg stadig blive partner?',
            a: 'Ja. Vi har bygget konsortiet, så du kan komme i gang uden en stor opsparing. Vi hjælper med rammerne, så du kan fokusere på maden.',
          },
          {
            q: 'Jeg har lige købt hus og stiftet familie – kan jeg opretholde min løn fra første dag som selvstændig?',
            a: 'Det er netop pointen med fællesskabet. Vi sikrer en stabil drift og økonomi, så du kan have en tryg indkomst fra dag ét.',
          },
          {
            q: 'Jeg har mit eget team – kan jeg tage dem med?',
            a: 'Ja. Et godt køkken er et godt hold. Du kan tage dine folk med ind i konsortiet.',
          },
          {
            q: 'Jeg er allerede selvstændig – kan jeg blive partner?',
            a: 'Absolut. Mange af vores partnere kom med en eksisterende forretning og fik adgang til netværk, indkøb og administration.',
          },
        ],
        'Ofte stillede spørgsmål fra kommende partnere',
      ),
      content(
        [
          column(
            'full',
            heading('h2', 'Mød vores founding partnere'),
            p('Køkkenerne, der grundlagde Frokost Konsortiet – besøg deres sider.'),
          ),
          ...kitchens.map((k) =>
            linkColumn(
              'oneThird',
              { type: 'custom', appearance: 'default', label: `Besøg ${k.name}`, url: siteUrl(k.slug), newTab: false },
              heading('h3', k.name),
              p(k.tagline),
            ),
          ),
        ],
        'Partnere',
      ),
      cta(
        richText(
          heading('h3', 'Kunne du tænke dig at høre mere?'),
          p(
            'Vi tager gerne en uforpligtende snak om, hvad et partnerskab kan betyde for dig og dit køkken.',
          ),
        ),
        [customLink('Kontakt os', '/kontakt')],
      ),
    ],
    meta: {
      title: 'Partnere',
      description:
        'Bliv partner i Frokost Konsortiet – fællesskab, administration og netværk for selvstændige køkkener.',
      image: img('partnere'),
    },
  }
}
