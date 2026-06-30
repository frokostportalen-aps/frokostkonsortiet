import type { PostFactory } from '../types'
import { heading, p, richText } from '../builders'

const variationIFrokostordningen: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Sådan skaber vi variation i frokostordningen',
  slug: 'variation-i-frokostordningen',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('variation-i-frokostordningen'),
  content: richText(
    heading(
      'h2',
      'Hemmeligheden bag en frokostordning, kollegerne ikke bliver trætte af, er menuer med variation og hver deres signatur.',
    ),
    p(
      'Den hyppigste klage over frokostordninger er ikke smagen – det er gentagelsen. Når den samme menu kører i ring, falder begejstringen, uanset hvor god maden er.',
    ),
    heading('h2', 'Variation, mindre rutine'),
    p(
      'I Frokost Konsortiet veksler vi mellem menuer med vidt forskellige udtryk. Den ene uge er der rodfrugter og grøn gastronomi, den næste sanselige kompositioner.',
    ),
    p('Resultatet er en frokost, der føles ny – uden at I skal jonglere med flere aftaler.'),
  ),
  meta: {
    title: 'Sådan skaber vi variation i frokostordningen',
    description:
      'Hemmeligheden bag en frokostordning, kollegerne ikke bliver trætte af, er menuer med variation og hver deres signatur.',
    image: img('variation-i-frokostordningen'),
  },
})

const baeredygtighedFraJordTilBord: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Bæredygtighed fra jord til bord',
  slug: 'baeredygtighed-fra-jord-til-bord',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('baeredygtighed-fra-jord-til-bord'),
  content: richText(
    heading(
      'h2',
      'Bæredygtig frokost handler om hele kæden – fra hvordan råvarerne dyrkes, til hvad der sker med resterne.',
    ),
    p(
      'For os stopper bæredygtighed ikke ved et økologimærke. Den begynder hos avlerne og slutter først, når det sidste måltid er spist – eller klogt brugt igen.',
    ),
    heading('h2', 'Mindre madspild, mere smag'),
    p(
      'Vi planlægger menuerne efter sæsonen og bruger hele råvaren. Det, der ikke bliver til dagens ret, bliver til fond, syltning eller morgendagens frokost.',
    ),
  ),
  meta: {
    title: 'Bæredygtighed fra jord til bord',
    description:
      'Bæredygtig frokost handler om hele kæden – fra hvordan råvarerne dyrkes, til hvad der sker med resterne.',
    image: img('baeredygtighed-fra-jord-til-bord'),
  },
})

export const posts: PostFactory[] = [variationIFrokostordningen, baeredygtighedFraJordTilBord]
