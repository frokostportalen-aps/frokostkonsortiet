import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText, weeklyMenu } from '../../builders'

/**
 * Ugens menu på sin egen adresse, så den kan deles og bogmærkes — og så en
 * medarbejder, der bare vil vide hvad der er til frokost i dag, ikke skal
 * igennem salgssiden først.
 *
 * Siden påstår ikke noget om maden selv: retterne kommer live fra køkkenets
 * egen portal, og alt hvad der står udenom er rammen om dem. Blokken ligger
 * stadig også på Frokostordning, hvor den understøtter løftet i teksten dér.
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
        'Hvad der står på bordet i denne uge – ret for ret, med allergener og klimatal. Menuen hentes direkte fra køkkenet, så siden er opdateret, så snart ugen er lagt op.',
      ),
    ),
  ),
  layout: [
    // Hero'en siger allerede "Ugens menu", så blokken får ingen egen overskrift
    // her — to identiske titler under hinanden læser som en fejl. Tomme
    // strenge og ikke udeladte felter, så Payload ikke falder tilbage på
    // feltets defaultValue.
    weeklyMenu({
      heading: '',
      eyebrow: '',
      note: 'Menuen lægges en uge frem. Ret til ændringer forbeholdes, hvis en råvare ikke lever op til vores krav den dag.',
      emptyMessage:
        'Ugens menu er ikke lagt op endnu. Den ligger klar en uge frem, så prøv igen om et par dage – eller ring, så læser vi den op.',
    }),
    content([
      column(
        'half',
        heading('h2', 'Tallene under retterne'),
        p(
          'Hver ret er mærket med de 14 lovpligtige allergener og med et CO2e-tal pr. kg. Tallet er køkkenets eget og følger råvarerne, så det ændrer sig med sæsonen – det er til at regne med, ikke til at pynte med.',
        ),
      ),
      column(
        'half',
        heading('h2', 'Hvorfor menuen skifter'),
        p(
          'Vi køber økologisk og i sæson hos faste avlere. Når rodfrugterne er på deres bedste, står de på menuen – og når de ikke er, gør de ikke. Derfor lægger vi ugen frem ad gangen i stedet for at love det samme hele året.',
        ),
      ),
    ]),
    cta(
      richText(
        heading('h3', 'Skal vi lave den her menu hos jer?'),
        p(
          'Vi kommer gerne forbi med frokost til hele huset en dag, I vælger, så I kan smage maden, før I beslutter jer.',
        ),
      ),
      [customLink('Se frokostordningen', '/frokost-ud-af-huset'), customLink('Spørgsmål og svar', '/faq', 'outline')],
    ),
  ],
  meta: {
    title: 'Ugens menu | Fra Jorden',
    description:
      'Ugens frokostmenu fra Fra Jorden – ret for ret, med allergener og CO2e pr. kg. Lagt en uge frem, direkte fra køkkenet.',
    image: img('groent-i-saeson'),
  },
})
