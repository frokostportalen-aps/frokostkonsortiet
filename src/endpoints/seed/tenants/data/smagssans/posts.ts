import type { PostFactory } from '../types'
import { heading, p, richText } from '../builders'

const efteraaretsSmage: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Efterårets smage',
  slug: 'efteraarets-smage',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('efteraarets-smage'),
  content: richText(
    heading(
      'h2',
      'Når dagene bliver kortere, bliver smagene dybere. Sådan fanger vi efteråret på tallerkenen.',
    ),
    p(
      'Efteråret er en gave til et køkken som vores. Råvarerne bliver kraftigere, og smagene tåler – ja, kræver – mere fylde og varme.',
    ),
    heading('h2', 'Fra jord og skov'),
    p(
      'Græskar, svampe og rodfrugter får selskab af ristede nødder og syltede bær. Vi bygger retter i lag, så hver mundfuld udvikler sig fra det første bid til det sidste.',
    ),
  ),
  meta: {
    title: 'Efterårets smage',
    description:
      'Når dagene bliver kortere, bliver smagene dybere. Sådan fanger vi efteråret på tallerkenen.',
    image: img('efteraarets-smage'),
  },
})

const kunstenAtKrydre: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Kunsten at krydre',
  slug: 'kunsten-at-krydre',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('kunsten-at-krydre'),
  content: richText(
    heading(
      'h2',
      'Krydderier kan løfte en ret – eller drukne den. Her er vores tilgang til balancen.',
    ),
    p(
      'God krydring handler ikke om styrke, men om balance. Målet er at fremhæve råvaren, ikke at overdøve den.',
    ),
    heading('h2', 'Lag på lag'),
    p(
      'Vi krydrer i etaper – lidt under tilberedningen, lidt til sidst – så smagen får både dybde og friskhed. Og vi smager altid til, før retten forlader køkkenet.',
    ),
  ),
  meta: {
    title: 'Kunsten at krydre',
    description: 'Krydderier kan løfte en ret – eller drukne den. Her er vores tilgang til balancen.',
    image: img('kunsten-at-krydre'),
  },
})

const tarteletten: PostFactory = ({ tenantID, authorID, img }) => ({
  title: 'Tarteletten er tilbage',
  slug: 'tarteletten-er-tilbage',
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: img('tarteletten'),
  content: richText(
    heading(
      'h2',
      'Klassikerne forsvinder aldrig helt fra vores menu – de bliver bare bedre. Nu er tarteletten tilbage, med sprød bund og fyld af årstidens grønt.',
    ),
    p(
      'Der er retter, kollegerne bliver ved med at spørge efter. Tarteletten er en af dem: sprød, varm og med en fylde, der smager af omhu. Vi laver bunden selv og skifter fyldet med sæsonen.',
    ),
    heading('h2', 'Klassisk, ikke gammeldags'),
    p(
      'Siden 1980 har vi lært, at det velkendte og det overraskende skal balancere. Derfor står tarteletten side om side med retter, I ikke har smagt før – og begge dele bliver spist op.',
    ),
  ),
  meta: {
    title: 'Tarteletten er tilbage',
    description:
      'Klassikerne forsvinder aldrig helt fra vores menu – de bliver bare bedre. Nu er tarteletten tilbage, med sprød bund og fyld af årstidens grønt.',
    image: img('tarteletten'),
  },
})

export const posts: PostFactory[] = [efteraaretsSmage, kunstenAtKrydre, tarteletten]
