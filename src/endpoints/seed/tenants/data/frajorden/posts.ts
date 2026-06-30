import type { PostFactory } from '../types'
import { heading, p, richText } from '../builders'

const rodfrugternesAarstid: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Derfor er rodfrugter efterårets helte',
  slug: 'rodfrugternes-aarstid',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('rodfrugternes-aarstid'),
  content: richText(
    heading(
      'h2',
      'Rodfrugter er billige, holdbare og fulde af smag. Her er, hvorfor de fylder så meget i vores efterårsmenu.',
    ),
    p(
      'Når frosten nærmer sig, er det rodfrugterne, der træder i karakter. De har gemt smag og sødme i jorden hele sommeren – og nu er det tid til at hente den frem.',
    ),
    heading('h2', 'Mere end kogte gulerødder'),
    p(
      'Ristet i ovnen bliver pastinak og persillerod karamelliserede og nøddeagtige. Råsyltet giver rødbeden syre og bid. Den samme rodfrugt kan smage vidt forskelligt – det er hele pointen.',
    ),
  ),
  meta: {
    title: 'Derfor er rodfrugter efterårets helte',
    description:
      'Rodfrugter er billige, holdbare og fulde af smag. Her er, hvorfor de fylder så meget i vores efterårsmenu.',
    image: img('rodfrugternes-aarstid'),
  },
})

const moedVoresAvlere: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Mød vores avlere',
  slug: 'moed-vores-avlere',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('moed-vores-avlere'),
  content: richText(
    heading(
      'h2',
      'Bag hver ret står en avler. Vi tog på besøg hos dem, der dyrker grøntsagerne til jeres frokost.',
    ),
    p(
      'Vi kender markerne, vores råvarer kommer fra, og menneskene, der passer dem. Det er ikke romantik – det er kvalitetssikring.',
    ),
    heading('h2', 'Tæt samarbejde'),
    p(
      'Vi planlægger sæsonen sammen med avlerne, så vi aftager hele høsten og ikke kun de pæneste eksemplarer. Det giver mindre spild på marken og mere smag i køkkenet.',
    ),
  ),
  meta: {
    title: 'Mød vores avlere',
    description:
      'Bag hver ret står en avler. Vi tog på besøg hos dem, der dyrker grøntsagerne til jeres frokost.',
    image: img('moed-vores-avlere'),
  },
})

export const posts: PostFactory[] = [rodfrugternesAarstid, moedVoresAvlere]
