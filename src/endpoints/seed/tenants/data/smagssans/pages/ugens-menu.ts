import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText, weeklyMenu } from '../../builders'

/**
 * Ugens menu på sin egen adresse — den side en medarbejder deler i en tråd
 * torsdag formiddag, uden at skulle forbi en salgsside først.
 *
 * Retterne står ikke her: de kommer live fra køkkenets egen portal, og siden
 * er rammen om dem. Blokken ligger stadig også på Menuvariationer, hvor den
 * viser variationerne i den mad, der faktisk bliver serveret i denne uge.
 */
export const ugensMenu: PageFactory = ({ tenantID, img }) => ({
  title: 'Ugens menu',
  slug: 'ugens-menu',
  _status: 'published',
  tenant: tenantID,
  hero: hero.low(
    richText(
      heading('h1', 'Ugens menu'),
      p(
        'Hvad der bliver serveret i denne uge – dag for dag. Menuen kommer direkte fra køkkenet, så den står her, så snart ugen er lagt op.',
      ),
    ),
  ),
  layout: [
    // Hero'en siger allerede "Ugens menu", så blokken får ingen egen overskrift
    // her — to identiske titler under hinanden læser som en fejl.
    weeklyMenu({
      heading: '',
      eyebrow: '',
      note: 'Menuen kommer direkte fra køkkenet og opdateres, når ugen bliver lagt op.',
    }),
    content([
      column(
        'half',
        heading('h2', 'Mærkningen på hver ret'),
        p(
          'Køkkenet mærker hver ret med de variationer, den dækker – vegetarisk, vegansk, uden gris, halal og resten. Står der ikke noget ud for en ret, er det fordi den er, som den er.',
        ),
      ),
      column(
        'half',
        heading('h2', 'Passer ugen ikke til dig?'),
        p(
          'Den enkelte medarbejder vælger selv sin variation i appen og kan altid skifte. Vi laver navngivne portioner, hvor der er brug for det, så ingen skal nøjes med brødet.',
        ),
      ),
    ]),
    cta(
      richText(
        heading('h3', 'Mangler I en variation?'),
        p(
          'Har I medarbejdere med multiallergi eller helt særlige behov, skræddersyr vi en løsning. Ring til os på 72 10 88 10.',
        ),
      ),
      [customLink('Se alle variationer', '/menuvariationer'), customLink('Frokostordningen', '/frokost-ud-af-huset', 'outline')],
    ),
  ],
  meta: {
    title: 'Ugens menu – Smagssans',
    description:
      'Ugens frokostmenu fra Smagssans – dag for dag, med de variationer hver ret dækker og allergenerne under.',
    image: img('forside-2'),
  },
})
