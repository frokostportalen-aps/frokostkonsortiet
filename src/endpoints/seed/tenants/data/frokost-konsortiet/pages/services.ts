import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  heading,
  hero,
  p,
  priceMenu,
  richText,
  steps,
} from '../../builders'

export const services: PageFactory = ({ tenantID, img }) => ({
  title: 'Services',
  slug: 'services',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('services'),
    richText(
      heading('h1', 'Det vi står for'),
      p(
        'Frokost Konsortiet samler en række selvstændige køkkener under ét fællesskab. Sammen dækker vi hele paletten – fra den daglige frokost til store selskaber.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column(
          'full',
          heading('h2', 'Vores services'),
          p('Uanset behov finder vi den løsning, der passer til jeres arbejdsplads.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Frokost ud af huset'),
          p(
            'Daglig frokostordning leveret til jeres adresse – med variation, sæson og bæredygtighed i centrum.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Kantinedrift'),
          p('Vi driver jeres kantine med friske buffeter og faste menuer, tilpasset jeres rammer og budget.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Catering & selskaber'),
          p(
            'Selskabsmenuer, receptioner og events – store som små – med mad, der gør dagen til noget særligt.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Mødeforplejning'),
          p('Tapas, platter og smørrebrød til møder, samt inhouse mødeservice med opdækning og afrydning.'),
        ),
        column(
          'oneThird',
          heading('h3', 'FrokostPortalen'),
          p('Ét digitalt sted til bestilling, tilretning og overblik over den daglige økonomi.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Bæredygtig drift'),
          p('Lavt CO₂-aftryk, reduceret madspild og friske råvarer fra danske producenter i sæson.'),
        ),
      ],
      'Vores services',
    ),
    steps(
      [
        {
          title: 'Fortæl os om jeres arbejdsplads',
          description: 'Ring eller skriv – antal, adresse og hvad I drømmer om til frokost.',
        },
        {
          title: 'Vi matcher jer med et køkken',
          description: 'Klassisk eller 100% økologisk – I smager, før I beslutter jer.',
        },
        {
          title: 'Frokosten lander',
          description: 'Leveret hver morgen, klar til at stille frem – uden at I løfter en finger.',
        },
        {
          title: 'Ét kontaktpunkt, altid',
          description: 'Én aftale, én faktura – og os i røret, hvis noget skal justeres.',
        },
      ],
      'Sådan foregår det',
      'Fra første opkald til første frokost – typisk på under to uger.',
    ),
    priceMenu({
      heading: 'Ordninger og priser',
      intro:
        'Ét overblik på tværs af familiens køkkener – vi matcher jer med det køkken, der passer bedst.',
      sections: [
        {
          title: 'Faste ordninger',
          description: 'Daglig forplejning med én aftale og én faktura.',
          items: [
            {
              name: 'Frokostordning',
              description: 'Daglig frokost leveret af et af familiens køkkener.',
              price: 'fra 58 kr.',
              unit: 'pr. kuvert',
              featured: true,
            },
            {
              name: 'Økologisk frokostordning',
              description: '100% økologi fra Fra Jorden – med Spisemærke i guld.',
              price: 'fra 65 kr.',
              unit: 'pr. kuvert',
            },
            {
              name: 'Kantinedrift',
              description: 'Vi driver jeres kantine – management- eller kuvertpris-aftale.',
              price: 'Aftalepris',
            },
          ],
        },
        {
          title: 'Efter behov',
          description: 'Når kalenderen byder på mere end hverdag.',
          items: [
            {
              name: 'Mødeforplejning',
              description: 'Tapas, platter og smørrebrød – leveret til mødet.',
              price: 'fra 45 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Catering & selskaber',
              description: 'Fra reception til flerretters middag.',
              price: 'fra 145 kr.',
              unit: 'pr. person',
            },
            {
              name: 'Frugt & drikkevarer',
              description: 'Faste leveringer sammen med frokosten.',
              price: 'fra 6 kr.',
              unit: 'pr. person',
            },
          ],
        },
      ],
      note: 'Alle priser er ekskl. moms og afhænger af køkken, antal og leveringsdage.',
    }),
    cta(
      richText(
        heading('h3', 'Skal vi forplejne jer?'),
        p('Tag fat i os, så finder vi det køkken og den løsning, der passer til jeres arbejdsplads.'),
      ),
      [customLink('Kontakt os', '/kontakt')],
    ),
  ],
  meta: {
    title: 'Services',
    description:
      'Frokost ud af huset, kantinedrift, catering, mødeforplejning og bæredygtig drift – samlet i Frokost Konsortiet.',
    image: img('services'),
  },
})
