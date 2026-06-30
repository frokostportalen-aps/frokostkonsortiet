import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, list, p, richText } from '../../builders'

export const drikkevarer: PageFactory = ({ tenantID, img }) => ({
  title: 'Drikkevarer',
  slug: 'drikkevarer',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('drikkevarer'),
    richText(
      heading('h1', 'Drikkevarer'),
      p('Et udvalg af friske drikkevarer til arbejdspladsen fra Fra Jorden.'),
    ),
  ),
  layout: [
    content(
      [
        column(
          'oneThird',
          heading('h3', 'Letmælk'),
          heading('h4', '15 kr.'),
          list(['Frisk dansk mælk']),
        ),
        column(
          'oneThird',
          heading('h3', 'Ingefærshot – 12 stk.'),
          heading('h4', '80 kr.'),
          list(['Friskpresset ingefær']),
        ),
        column(
          'oneThird',
          heading('h3', 'Hyldesaft'),
          heading('h4', '30 kr.'),
          list(['Hjemmelavet sæsonsaft']),
        ),
        column('full', p('Div. drikkevarer kan tilkøbes. Alle priser er eksklusiv moms.')),
      ],
      'Udvalg',
    ),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud på et større arrangement?'),
        p('Bestil online via KundePortalen, eller skriv til os for et tilbud.'),
      ),
      [customLink('Bestil online', '/om-os')],
    ),
  ],
  meta: {
    title: 'Drikkevarer',
    description: 'Drikkevarer fra Fra Jorden – mælk, ingefærshots, hyldesaft og mere.',
    image: img('drikkevarer'),
  },
})
