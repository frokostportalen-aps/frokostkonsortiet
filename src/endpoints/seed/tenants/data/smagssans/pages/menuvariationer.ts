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

export const menuvariationer: PageFactory = ({ tenantID, img }) => ({
  title: 'Menuvariationer',
  slug: 'menuvariationer',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('kunsten-at-krydre'),
    richText(
      heading('h1', 'Menuvariationer'),
      p(
        'Det handler om at være glad for mad – og om at ingen bliver glemt. Derfor har vi en lang række variationer, så hver medarbejder får en frokost, der passer til netop deres kost og smag.',
      ),
    ),
  ),
  layout: [
    mediaContent(
      img('forside-1'),
      'right',
      richText(
        heading('h2', 'Ingen bliver glemt'),
        p(
          'Uanset om det handler om livsstil, tro eller allergi, så er der en variation, der passer. Den enkelte medarbejder vælger selv i appen – og kan altid skifte.',
        ),
      ),
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Vælg den variation, der passer'),
          p(
            'I medarbejderappen vælger den enkelte selv sin variation – og kan altid skifte. Her er de variationer, vi tilbyder:',
          ),
          list([
            'Standard – for dig uden særlige kostbehov',
            'Vegetar med grøn appetizer – grøn appetizer i stedet for pålæg',
            'Vegetar med kød/fisk pålæg – plantebaseret varm ret, men kød- og fiskepålæg',
            'Pescetar med grøn appetizer – fisk om onsdagen samt vegetar- og fiskepålæg',
            'Pescetar med kød/fisk pålæg – vegetarisk varm ret, fisk om onsdagen og kødpålæg',
            'Vegansk – 100% plantebaseret',
            'Vegansk glutenfri – plantebaseret og uden gluten',
            'Klima-bevidst – uden okse, kalv og lam',
            'Fisk ugentligt – fisk om onsdagen',
            'Uden gris – alternativ varm ret, når der serveres svinekød',
            'Halal – halalslagtet kød, fisk eller vegetarisk alternativ',
            'Glutenfri – glutenfri varm ret',
            'Laktosefri – laktosefrie alternativer',
            'Gluten- & laktosefri – uden både gluten og laktose',
            'Multiallergi – skræddersyet menu uden de allergener, I oplyser',
          ]),
        ),
      ],
      'Variationer',
    ),
    cta(
      richText(
        heading('h3', 'Mangler I en variation?'),
        p(
          'Har I medarbejdere med multiallergi eller helt særlige behov, skræddersyr vi en løsning. Ring til os på 72 10 88 10.',
        ),
      ),
      [customLink('Kontakt os', '/om-os')],
    ),
  ],
  meta: {
    title: 'Menuvariationer – Smagssans',
    description:
      'Vegetar, vegansk, pescetar, glutenfri, laktosefri, halal, uden gris, klima-bevidst og multiallergi – Smagssans har en menuvariation til alle på arbejdspladsen.',
    image: img('kunsten-at-krydre'),
  },
})
