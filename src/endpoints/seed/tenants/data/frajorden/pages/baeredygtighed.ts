import type { PageFactory } from '../../types'
import { column, content, heading, hero, p, richText } from '../../builders'

export const baeredygtighed: PageFactory = ({ tenantID, img }) => ({
  title: 'Bæredygtighed',
  slug: 'baeredygtighed',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('baeredygtighed'),
    richText(
      heading('h1', 'Bæredygtighed'),
      p('Hos Fra Jorden er bæredygtighed ikke en tilføjelse, men fundamentet under hele driften.'),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Vores produktion'),
          p(
            'Vores produktion er baseret på bæredygtighed, med fokus på en menu-sammensætning med lavt CO₂-aftryk, reduceret madspild og prioritering af sæsonens friske råvarer fra danske producenter.',
          ),
        ),
      ],
      'Vores produktion',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Vores medarbejdere'),
          p(
            'Det betyder meget at arbejde med noget, der giver mening og en god fornemmelse i maven – det gør vores hverdag bedre og bidrager til øget motivation hos os alle, hvilket driver os til at gøre os umage, så vi får glade kunder og dermed kan hjælpe endnu flere.',
          ),
        ),
      ],
      'Vores medarbejdere',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Vores drift'),
          p(
            'For at sikre økonomisk bæredygtighed driver vi køkkenet ansvarligt – så vi kan blive ved med at lave god mad i mange år frem.',
          ),
        ),
      ],
      'Vores drift',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Social kapital'),
          p(
            'Ved at styrke samarbejde, tillid og kommunikation øger vi kvaliteten på arbejdspladsen – både personligt og professionelt.',
          ),
        ),
      ],
      'Social kapital',
    ),
  ],
  meta: {
    title: 'Bæredygtighed',
    description: 'Bæredygtighed hos Fra Jorden – lavt CO₂-aftryk, mindre madspild og social kapital.',
    image: img('baeredygtighed'),
  },
})
