import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, list, mediaBlock, p, richText } from '../../builders'

export const moedeforplejning: PageFactory = ({ tenantID, img }) => ({
  title: 'Mødeforplejning',
  slug: 'moedeforplejning',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('moedeforplejning'),
    richText(
      heading('h1', 'Mødeforplejning'),
      p(
        'Det handler om at være glad for mad – også til mødet. Smagssans sørger for forplejningen, fra det korte kaffemøde til det store arrangement.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Udvalg')),
        column(
          'oneThird',
          heading('h3', 'Tapas-anretning'),
          p('Et varieret udvalg af små lækkerier – i en let eller en mættende version.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Gourmet-platte'),
          p('En flot sammensat platte med 6 elementer, der forkæler deltagerne.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Smørrebrød, sandwich & salat'),
          p('Klassisk smørrebrød, friske sandwich og salater – friskt og håndlavet.'),
        ),
      ],
      'Udvalg',
    ),
    content(
      [
        column('full', heading('h2', 'To måder at bestille på')),
        column(
          'oneThird',
          heading('h3', 'Ud af huset'),
          heading('h4', 'Fra 175 kr.'),
          list([
            'For jer, der allerede har frokostordning',
            'Dagens platte fra 175 kr.',
            'Sandwich fra 55 kr.',
            'Drikkevarer fra 8 kr.',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'I huset'),
          heading('h4', 'Fra 200 kr.'),
          list([
            'Serveret i jeres kantine eller mødelokaler',
            'Service og opvask inkluderet',
            'Dagens platte fra 200 kr.',
            'Opdækning og afrydning fra 10 kr. pr. person',
          ]),
        ),
        column(
          'oneThird',
          heading('h3', 'Tilkøb'),
          list([
            'Morgenmad fra 30 kr.',
            'Kage og dessert fra 20 kr.',
            'Nødder og snacks fra 40 kr.',
            'Kaffe, juice, øl og vin',
          ]),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
    mediaBlock(img('drikkevarer')),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud på et større arrangement?'),
        p('Bestil online via KundePortalen, eller skriv til os for et tilbud.'),
      ),
      [customLink('Få et tilbud', '/om-os#tilbud')],
    ),
  ],
  meta: {
    title: 'Mødeforplejning – Smagssans',
    description:
      'Mødeforplejning fra Smagssans – tapas, gourmet-platter, smørrebrød, sandwich og salater. Leveret ud af huset eller serveret i huset.',
    image: img('moedeforplejning'),
  },
})
