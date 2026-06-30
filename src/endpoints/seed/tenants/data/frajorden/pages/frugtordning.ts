import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, list, p, richText } from '../../builders'

export const frugtordning: PageFactory = ({ tenantID, img }) => ({
  title: 'Frugtordning',
  slug: 'frugtordning',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('frugtordning'),
    richText(
      heading('h1', 'Frugtordning'),
      p('Frisk frugt på arbejdspladsen hver uge – leveret af Fra Jorden.'),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Frugtkurve'),
          p('Vælg den kurv, der passer til jeres antal.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Frugtkurv – 20 stk.'),
          heading('h4', '80 kr.'),
          list(['Frisk sæsonfrugt', 'Ugentlig levering']),
        ),
        column(
          'oneThird',
          heading('h3', 'Frugtkurv – 30 stk.'),
          heading('h4', '80 kr.'),
          list(['Frisk sæsonfrugt', 'Ugentlig levering']),
        ),
        column(
          'oneThird',
          heading('h3', 'Frugtkurv – 50 stk.'),
          heading('h4', '80 kr.'),
          list(['Frisk sæsonfrugt', 'Ugentlig levering']),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Frugtkurve',
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
    title: 'Frugtordning',
    description: 'Frugtordning fra Fra Jorden – friske frugtkurve leveret hver uge.',
    image: img('frugtordning'),
  },
})
