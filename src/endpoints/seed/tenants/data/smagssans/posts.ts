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

export const posts: PostFactory[] = [efteraaretsSmage, kunstenAtKrydre]
