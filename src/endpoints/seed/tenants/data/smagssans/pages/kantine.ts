import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  faq,
  heading,
  hero,
  list,
  mediaContent,
  p,
  richText,
} from '../../builders'

export const kantine: PageFactory = ({ tenantID, img }) => ({
  title: 'Kantine',
  slug: 'kantine',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('kantine'),
    richText(
      heading('h1', 'Kantineordning'),
      p(
        'Vi klarer produktionen i vores køkken, og en kok hos jer anretter maden på fint porcelæn, lægger sidste hånd på den, tager opvasken, holder kantinen ren og hjælper med mødeforplejning.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Sådan fungerer det'),
          p(
            'Maden produceres i vores køkken og sendes til jer, hvor vores kok står for anretning og servering. Er I over 70 spisende, kan det være nødvendigt med en ekstra opvasker. God mad giver ordentlig næring – det styrker immunforsvar, koncentration og humør på arbejdspladsen.',
          ),
        ),
      ],
      'Sådan fungerer det',
    ),
    mediaContent(
      img('forside-spotlight'),
      'right',
      richText(
        heading('h2', 'Friske buffeter, der veksler'),
        p(
          'Hver dag byder på varme retter, salater, pålæg og friske grøntsager – med noget for enhver smag. Vores kok anretter det hele på fint porcelæn, så frokosten både ser indbydende ud og smager af mere.',
        ),
      ),
    ),
    content(
      [
        column('full', heading('h2', 'Priseksempler')),
        column(
          'oneThird',
          heading('h3', 'Small'),
          heading('h4', '60 kr.'),
          list(['Mindre portion', 'Varm ret, salater og pålæg']),
        ),
        column(
          'oneThird',
          heading('h3', 'Medium'),
          heading('h4', '63 kr.'),
          list(['Mellem portion', 'Varm ret, salater og pålæg']),
        ),
        column(
          'oneThird',
          heading('h3', 'Large'),
          heading('h4', '66 kr.'),
          list(['Stor portion', 'Varm ret, salater og pålæg']),
        ),
        column('full', p('Alle menuer tilpasses jeres behov og budget. Alle priser er eksklusiv moms.')),
      ],
      'Priseksempler',
    ),
    faq(
      [
        {
          q: 'Kan vi selv være med til at sammensætte menuen?',
          a: 'Ja. Alle menuer tilpasses jeres behov og budget, og vi planlægger dem i tæt dialog med jer.',
        },
        {
          q: 'Hvordan håndterer medarbejderne kostønsker?',
          a: 'Via medarbejderappen vælger hver enkelt selv vegetar, vegansk, pescetar, glutenfri, laktosefri eller uden gris – og kan melde gæster og ferie.',
        },
      ],
      'Ofte stillede spørgsmål',
    ),
    cta(
      richText(
        heading('h3', 'Vil du have et tilbud?'),
        p('Vi kigger gerne forbi og giver et bud på, hvordan jeres kantine kan drives.'),
      ),
      [customLink('Få et tilbud', '/om-os#tilbud')],
    ),
  ],
  meta: {
    title: 'Kantineordning – Smagssans',
    description:
      'Kantineordning fra Smagssans – vi producerer maden, og en kok hos jer anretter, serverer og holder kantinen kørende. Fra 60 kr. pr. kuvert.',
    image: img('kantine'),
  },
})
