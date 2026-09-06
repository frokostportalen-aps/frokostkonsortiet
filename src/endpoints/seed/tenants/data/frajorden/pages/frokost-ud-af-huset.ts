import type { PageFactory } from '../../types'
import {
  column,
  content,
  faq,
  formBlock,
  heading,
  hero,
  iconRow,
  mediaContent,
  p,
  priceMenu,
  richText,
} from '../../builders'

/**
 * "Frokostordning" — the tab Audryn's input is written for. The section order
 * follows the modules in the layout (intro → video → hverdagen → priser →
 * ugemenu → hensyn → FAQ → afrunding), and each section answers exactly one
 * question: numbers where the input gives numbers, no sentence repeated
 * anywhere else on the site.
 */
export const frokostUdAfHuset: PageFactory = ({ tenantID, img, tilbudsFormID }) => ({
  title: 'Frokostordning',
  slug: 'frokost-ud-af-huset',
  _status: 'published',
  tenant: tenantID,
  // Samme brand-lockup som forsiden — layoutet viser fanen med den samme hero —
  // blot med sidens eget foto bag den diagonale skæring. Her er wordmarket
  // brandmærket (en paragraf), og sidens navn står som h1 på linjen under, så
  // siden har sit eget emne i sin vigtigste overskrift.
  hero: hero.high(
    img('frokost-ud-af-huset'),
    richText(p('Fra jorden'), heading('h1', 'Frokostordning')),
  ),
  layout: [
    // Modul: Frokostordning — den håndlavede hverdag, med kokken i billedet.
    mediaContent(
      img('koekkenchef'),
      'left',
      richText(
        heading('h2', 'Frokost, der er lavet i dag. Ikke pakket i sidste uge.'),
        p(
          'Vores køkkenchef Steffen Krogh står i køkkenet klokken fem om morgenen. Grøntsagerne bliver snittet samme dag, de bliver spist, kødet bliver stegt om formiddagen, og dressingen bliver rørt – ikke hældt op af en dunk.',
        ),
        p(
          'I får en buffet med to varme retter, et koldt bord, to salater og ost. Menuen skifter hver uge og gentager sig ikke inden for en måned. Alle retter er mærket med allergener og CO2e pr. kg, så både den glutenfri kollega og jeres klimaregnskab kan bruge dem.',
        ),
      ),
      [],
      'Frokostordning',
    ),
    // Modul: Video — samme rutine hver hverdag, uden speak og musik.
    mediaContent(
      img('fra-bunden'),
      'right',
      richText(
        heading('h2', 'Sådan ser en tirsdag ud hos os'),
        p(
          'Halvandet minut fra køkkenet klokken fem om morgenen til buffeten står færdig hos en kunde klokken 11.20. Ingen speak, ingen musik – bare hvad der rent faktisk sker.',
        ),
        p(
          'Det er den samme rutine hver eneste hverdag: råvarer ind ad bagdøren, maden lavet fra bunden, pakket i termokasser og kørt ud i ruter, der er lagt efter jeres frokosttid. I har den samme chauffør og den samme kontaktperson hver uge.',
        ),
      ),
      [],
      'Video',
    ),
    // Modul: Lavpraktisk forklaring og afdækning. Layoutet vil have billedet til
    // venstre med overskrift og indledning ved siden af, og de fire punkter
    // under — derfor et mediaContent efterfulgt af et content-gitter.
    mediaContent(
      img('groent-i-saeson'),
      'left',
      richText(
        heading('h2', '”Vi tilpasser os jeres hverdag – ikke omvendt”'),
        p('De fleste frokostordninger går galt af de samme fire grunde. Sådan løser vi dem:'),
      ),
      [],
      'Hverdagen',
    ),
    content(
      [
        column(
          'half',
          heading('h3', 'Antallet svinger'),
          p(
            'Halvdelen er på kursus om torsdagen, og om fredagen arbejder mange hjemme. I retter antallet i portalen indtil kl. 14.00 dagen før – også nedad. I betaler kun for det, I bestiller.',
          ),
        ),
        column(
          'half',
          heading('h3', 'Der er altid nogen, der ikke kan spise med'),
          p(
            'Vi laver navngivne portioner til allergier og specialkost og stiller dem op ved siden af buffeten, så ingen skal spørge om lov. Det koster ikke ekstra.',
          ),
        ),
        column(
          'half',
          heading('h3', 'Køkkenet hos jer er lille'),
          p(
            'Vi kommer med fade, opstilling og køl, hvis I ikke har det. I skal have et bord og en stikkontakt – resten er vores.',
          ),
        ),
        column(
          'half',
          heading('h3', 'Ingen ved, hvem man ringer til'),
          p('I får ét navn og ét nummer. Ikke en supportmail.'),
        ),
      ],
      'Lavpraktisk',
    ),
    // Modul: Priseksempler — samme kuvertpris, tre virksomhedsstørrelser.
    priceMenu(
      {
        heading: 'Hvad koster det hos jer?',
        eyebrow: 'Her er 3 regnestykker',
        intro:
          '67 kr. pr. kuvert pr. dag – uanset hvor mange I er. Levering, opstilling, fade og afhentning er inkluderet.',
        sections: [
          {
            title: 'Tre regnestykker',
            description: 'Beregnet på 21 hverdage om måneden.',
            items: [
              {
                name: '15 medarbejdere',
                description: '1.005 kr. om dagen.',
                price: '21.105 kr.',
                unit: 'pr. måned',
              },
              {
                name: '30 medarbejdere',
                description: '2.010 kr. om dagen.',
                price: '42.210 kr.',
                unit: 'pr. måned',
                featured: true,
              },
              {
                name: '60 medarbejdere',
                description: '4.020 kr. om dagen.',
                price: '84.420 kr.',
                unit: 'pr. måned',
              },
            ],
          },
        ],
        note: 'Alle priser er ekskl. moms. Der er intet servicegebyr, intet leveringstillæg og intet opstartsgebyr. Minimum er 15 medarbejdere – er I færre, så ring, og vi finder en løsning, hvis I ligger på vores rute.',
      },
      'Priseksempler',
    ),
    // Modul: Menu eksempel — menuen ligger frit fremme, uden login.
    mediaContent(
      img('rodfrugternes-aarstid'),
      'left',
      richText(
        heading('h2', 'Uge 28'),
        p(
          'Menuen bliver lagt en uge frem og ligger frit på siden. I skal ikke logge ind eller skrive jer op til et nyhedsbrev for at se, hvad der bliver serveret. Hver ret står med allergener i parentes og CO2e pr. kg, så tallene kan gå direkte videre til jeres klimaregnskab.',
        ),
        p(
          'Hver dag er der to varme retter, et koldt bord, to salater og ost. Ingen ret gentager sig inden for fire uger. Er der noget, I aldrig vil se igen, skriver I det i portalen, og så ryger det af listen. Skal der mødemad, morgenbrød eller kage til en fredag, bestiller I det samme sted og får det på den samme faktura.',
        ),
      ),
      [],
      'Menu eksempel',
    ),
    // Modul: Kostpræferencer, hensyn og allergier — seks navngivne hensyn som
    // ikonrække, og den praktiske forklaring i feltet under.
    iconRow(
      {
        heading: 'Alle kan spise med',
        eyebrow: '– også dem, der plejer at måtte springe over',
        items: [
          { icon: 'leaf', label: 'Vegetar', note: 'Mindst én varm ret hver dag' },
          { icon: 'sprout', label: 'Vegansk', note: 'Navngiven portion, hver dag' },
          { icon: 'wheat', label: 'Glutenfri', note: 'Eget brød og egen dressing' },
          { icon: 'milk', label: 'Laktosefri', note: 'Mejeriprodukter byttet ud' },
          { icon: 'ham', label: 'Uden svinekød', note: 'Både buffet og portion' },
          { icon: 'beef', label: 'Halal', note: 'Efter aftale' },
        ],
        note: 'Vi laver navngivne portioner til de kolleger, der ikke kan spise fra buffeten. De står ved siden af med navn på, så ingen skal spørge køkkenet, om der er noget til dem. Det koster ikke ekstra, og I melder det ind én gang i portalen. Alle retter på ugemenuen er mærket med de 14 lovpligtige allergener, både online og på skiltene ved buffeten.',
      },
      'Hensyn og kostpræferencer',
    ),
    // Har I et hensyn, der ikke står på rækken, løser vi det – sagt i klartekst
    // under ikonerne.
    content(
      [
        column(
          'full',
          p(
            'Har I et hensyn, der ikke står her – nøddeallergi, FODMAP eller en gravid kollega, der skal uden om rå fisk – så skriver I det, og vi løser det.',
          ),
        ),
      ],
      'Andre hensyn',
    ),
    // Modul: FAQ — spørgsmålene fra økonomiafdelingen, i klartekst.
    faq(
      [
        {
          q: 'Hvad koster det helt præcist?',
          a: '67 kr. pr. kuvert pr. dag ekskl. moms. Levering, opstilling, fade og afhentning er med. Der er intet servicegebyr og intet leveringstillæg.',
        },
        {
          q: 'Er der et minimum?',
          a: 'Ja, 15 medarbejdere pr. dag. Ligger I under, så ring – det kan lade sig gøre, hvis I er på vores rute.',
        },
        {
          q: 'Hvor lang er bindingen?',
          a: 'Ingen binding. En måneds opsigelse til udgangen af en måned.',
        },
        {
          q: 'Hvornår skal vi senest melde antal?',
          a: 'Kl. 14.00 hverdagen før. I retter det selv i portalen – også nedad.',
        },
        {
          q: 'Hvornår kommer maden?',
          a: 'Inden kl. 11.30 hver hverdag. Skal I spise tidligere eller senere, lægger vi ruten efter det.',
        },
        {
          q: 'Hvad hvis nogen har en allergi?',
          a: 'Så laver vi en navngiven portion uden ekstra beregning. Alle retter er mærket med de 14 allergener.',
        },
        {
          q: 'Leverer I til vores adresse?',
          a: 'Vi kører i hele Hovedstaden og på Sjælland. Skriv jeres postnummer i formularen, så bekræfter vi samme dag.',
        },
        {
          q: 'Kan vi holde pause i ferier?',
          a: 'Ja. I lukker de dage, I vil, i portalen, og betaler ikke for dage, I ikke bestiller.',
        },
        {
          q: 'Hvem laver maden?',
          a: 'Vores køkkenchef Steffen Krogh og hans hold. Det er de samme hænder hver dag.',
        },
        {
          q: 'Kan vi få mødemad og receptioner samme sted?',
          a: 'Ja. I bestiller det i portalen sammen med frokosten og får det på den samme faktura.',
        },
      ],
      'Det, økonomiafdelingen altid spørger om',
    ),
    // Modul: Afrunding og handling — smagningen er den primære CTA.
    formBlock(
      tilbudsFormID,
      richText(
        heading('h2', 'Vil I smage, før I beslutter jer?'),
        p(
          'Vi kommer gerne forbi med frokost til hele huset en dag, I vælger, så I kan se opstillingen og smage maden, før I skriver under. Bagefter laver vi et tilbud på jeres antal og jeres adresse – én pris pr. kuvert med det hele inkluderet, uden tillæg, der dukker op senere.',
        ),
        p('Skriv jeres antal og postnummer, så vender vi tilbage samme hverdag.'),
      ),
      'Afrunding og handling',
    ),
  ],
  meta: {
    title: 'Frokostordning',
    description:
      'Frokost lavet fra bunden samme morgen og stillet frem inden kl. 11.30. 67 kr. pr. kuvert, minimum 15 medarbejdere – levering, opstilling og afhentning inkluderet.',
    image: img('frokost-ud-af-huset'),
  },
})
