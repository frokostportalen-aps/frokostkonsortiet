import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  heading,
  hero,
  list,
  mediaContent,
  p,
  richText,
} from '../../builders'

export const frugtordning: PageFactory = ({ tenantID, img }) => ({
  title: 'Frugtordning',
  slug: 'frugtordning',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('frugtordning'),
    richText(
      heading('h1', 'Mejeri & frugt'),
      p(
        'Det handler om at være glad for mad – også mellem måltiderne. Få frisk frugt og friske mejerivarer leveret direkte til arbejdspladsen.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'To ordninger, ét leverandørbesøg')),
        column(
          'half',
          heading('h3', 'Frugtordning'),
          p('Frisk sæsonfrugt leveret direkte til jer. Vælg den mængde, der passer til antallet på kontoret.'),
          list(['Frisk sæsonfrugt', 'Ugentlig levering', 'Tilpasset jeres antal']),
        ),
        column(
          'half',
          heading('h3', 'Mælkeordning'),
          p('Friske mejerivarer til kaffen og frokosten – leveret sammen med resten af jeres ordning.'),
          list(['Frisk dansk mælk', 'Fast levering', 'Nem tilretning i appen']),
        ),
        column('full', p('Alle priser er eksklusiv moms.')),
      ],
      'Mejeri & frugt',
    ),
    mediaContent(
      img('drikkevarer'),
      'left',
      richText(
        heading('h2', 'Mælk i kaffen?'),
        p(
          'Nogle mener, at folk med smag for at kombinere mælk og kaffe er tilbøjelige til at have behagelige tendenser såsom venlighed, sympati og samarbejdsvilje. Vi siger ikke god for det – men vi leverer mælken.',
        ),
      ),
    ),
    cta(
      richText(
        heading('h3', 'Vil du tilføje mejeri & frugt?'),
        p('Bestil online via KundePortalen, eller skriv til os for et tilbud.'),
      ),
      [customLink('Bestil online', '/om-os')],
    ),
  ],
  meta: {
    title: 'Mejeri & frugt – Smagssans',
    description:
      'Mejeri & frugt fra Smagssans – frisk sæsonfrugt og friske mejerivarer leveret direkte til arbejdspladsen.',
    image: img('frugtordning'),
  },
})
