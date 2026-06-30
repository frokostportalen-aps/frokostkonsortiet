import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, list, p, richText } from '../../builders'

export const moedeforplejning: PageFactory = ({ tenantID, img }) => ({
  title: 'Mødeforplejning',
  slug: 'moedeforplejning',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('moedeforplejning'),
    richText(
      heading('h1', 'Mødeforplejning'),
      p('Fra Jorden sørger for forplejningen til jeres møder – fra kaffemøde til større arrangementer.'),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Udvalg')),
        column(
          'oneThird',
          heading('h3', 'Tapas-anretning'),
          p('Et varieret udvalg af små lækkerier til det gode møde.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Gourmet-platte'),
          p('Forkæl deltagerne med en flot sammensat platte.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Smørrebrød'),
          p('Klassisk dansk smørrebrød, friskt og håndlavet.'),
        ),
      ],
      'Udvalg',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Inhouse mødeservice'),
          p('Opdækning og afrydning til møder.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Kaffemøder'),
          heading('h4', '10 kr. pr. person'),
          list(['Kaffe, te og vand', 'Opdækning og afrydning']),
        ),
        column(
          'oneThird',
          heading('h3', 'Middag'),
          heading('h4', '20 kr. pr. person'),
          list(['Varm forplejning', 'Opdækning og afrydning']),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Inhouse mødeservice',
    ),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud på et større arrangement?'),
        p('Bestil online via KundePortalen, eller skriv til os for et tilbud.'),
      ),
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'Mødeforplejning',
    description: 'Mødeforplejning fra Fra Jorden – tapas, platter, smørrebrød og inhouse mødeservice.',
    image: img('moedeforplejning'),
  },
})
