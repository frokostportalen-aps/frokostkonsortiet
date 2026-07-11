import type { PageFactory } from '../../types'
import {
  archive,
  column,
  content,
  cta,
  customLink,
  heading,
  hero,
  mediaContent,
  p,
  richText,
  stats,
  testimonials,
  clientList,
  planPicker,
} from '../../builders'

export const home: PageFactory = ({ tenantID, img, tilbudsFormID }) => ({
  title: 'Smagssans – frokost',
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  hero: hero.high(
    img('hero-transparent'),
    richText(
      heading('h1', 'Det handler om at være glad for mad'),
      p(
        'Vi leverer brændstoffet til jeres medarbejdere – velsmagende, sund mad, der holder humøret oppe og hovedet skarpt. Lækker frokost til fair priser, leveret til arbejdspladser i hele Storkøbenhavn.',
      ),
    ),
    [customLink('Frokostordning', '/frokost-ud-af-huset'), customLink('Om os', '/om-os', 'outline')],
    { fit: 'contain' },
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Vælg den ordning, der passer til jer')),
        column(
          'oneThird',
          heading('h3', 'Frokostordning'),
          p(
            'Maden laver vi helt færdig og sender den med chauffør i termo- og transportkasser til jer. Klar til at stille frem, når sulten melder sig.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Kantineordning'),
          p(
            'Vi klarer produktionen, og en kok hos jer anretter på porcelæn, lægger sidste hånd på maden, tager opvasken og holder kantinen ren.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Kontorfællesskab'),
          p(
            'Deler I adresse med andre virksomheder? Hver virksomhed bestiller, tilretter og får sin egen faktura – uden ekstra administration.',
          ),
        ),
      ],
      'Vores ordninger',
    ),
    stats([
      { value: '1980', label: 'Måske Danmarks ældste catering' },
      { value: '100%', label: 'grøn strøm i produktionen' },
      { value: 'Fra 58 kr.', label: 'pr. kuvert' },
      { value: '07–16', label: 'åbent alle hverdage' },
    ]),
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Træt af at løbe tør for favoritterne?'),
        p(
          'Med vores medarbejderapp vælger hver medarbejder selv kostønsker, tilføjer gæster og melder ferie. Det giver mindre madspild, færre fejl og en menu, der altid rammer plet.',
        ),
      ),
      [customLink('Nem bestilling & tilretning', '/kundeportal')],
    ),
    mediaContent(
      img('forside-2'),
      'right',
      richText(
        heading('h2', 'Mad er omsorg'),
        p(
          'Mad skal være varieret og spændende, og vi skal passe på den verden, vi lever i. Derfor laver vi maden med omtanke – for smagen, for sundheden og for klimaet.',
        ),
      ),
      [customLink('Bæredygtighed', '/baeredygtighed')],
    ),
    archive(
      richText(
        heading('h3', 'Seneste nyt'),
        p('Læs med, når vi deler historier, sæsoner og smage fra køkkenet.'),
      ),
    ),
    mediaContent(
      img('forside-spotlight'),
      'right',
      richText(
        heading('h2', 'Mad, alle kan være med til'),
        p(
          'Vegetar, vegansk, pescetar, glutenfri, laktosefri, halal, uden gris eller multiallergi – vi har en menuvariation til alle, så ingen på arbejdspladsen bliver glemt.',
        ),
      ),
      [customLink('Se menuvariationer', '/menuvariationer')],
    ),
    planPicker({
      heading: 'Hvilken ordning passer jer?',
      intro: 'To spørgsmål – så peger vi jer i den rigtige retning.',
      plans: [
        {
          need: 'frokost',
          minPeople: 15,
          title: 'Frokostordning – Den mest populære',
          description: 'Varm ret, friske salater, pålæg og sødt – leveret færdiglavet hver dag.',
          priceLabel: 'fra 63 kr. pr. kuvert',
          url: '/frokost-ud-af-huset',
        },
        {
          need: 'kantine',
          minPeople: 40,
          title: 'Kantineordning',
          description: 'Vores kok anretter og driver frokosten hos jer – I lægger bare lokalet til.',
          priceLabel: 'Aftalepris',
          url: '/kantine',
        },
        {
          need: 'catering',
          minPeople: 1,
          title: 'Catering & selskaber',
          description: 'Fra morgenbord til flerretters middag – tilpasset anledningen.',
          priceLabel: 'fra 85 kr. pr. person',
          url: '/catering',
        },
      ],
      form: tilbudsFormID,
    }),
    clientList(['Vad & Lange Arkitekter', 'Designbureauet Form', 'Munk Consulting', 'Puls Media', 'BioNordic', 'Studio Nord']),
    testimonials(
      'Det siger vores kunder',
      'Arbejdspladser i hele landet har Smagssans på menuen. Her er nogle af dem.',
      [
        {
          quote:
            'Første dag stod hele kontoret og snusede til luften. Smagssans har gjort frokostpausen til noget, vi taler om resten af dagen.',
          author: 'Sofie Lind',
          role: 'Kreativ direktør, Studio Nord',
        },
        {
          quote:
            'Det er tydeligt, at hver ret er smagt til. Kontraster, duft, tekstur – det er frokost, der er tænkt igennem, ikke bare lavet.',
          author: 'Henrik Vad',
          role: 'Partner, Vad & Lange Arkitekter',
        },
        {
          quote:
            'Menuen står aldrig stille. Den følger sæsonen, så der er altid en ny smag at blive overrasket af. Vores team elsker det.',
          author: 'Amalie Bjerg',
          role: 'Teamlead, Designbureauet Form',
        },
        {
          quote:
            'Alt laves fra bunden samme morgen – det kan man smage. Det er den slags kvalitet, vi ellers kun får på en god restaurant.',
          author: 'Peter Munk',
          role: 'CFO, Munk Consulting',
        },
        {
          quote:
            'Velkendte retter med et uventet twist. Mine kolleger glæder sig faktisk til frokost nu – det havde jeg aldrig troet, jeg skulle sige.',
          author: 'Nadia El-Amin',
          role: 'Kommunikationschef, Puls Media',
        },
        {
          quote:
            'Smagssans rammer den fine balance mellem det forfinede og det mættende. Man bliver mæt, men det føles aldrig kedeligt.',
          author: 'Frederik Storm',
          role: 'Lab-leder, BioNordic',
        },
      ],
    ),
    cta(
      richText(
        heading('h3', 'Få Smagssans på menuen'),
        p(
          'Vil I forkæle kollegerne med en frokost til fair priser? Ring til os på 72 10 88 10, eller lad os fortælle, hvordan en uge med Smagssans smager.',
        ),
      ),
      [customLink('Kontakt os', '/om-os')],
    ),
  ],
  meta: {
    title: 'Smagssans – frokostordning til arbejdspladser',
    description:
      'Det handler om at være glad for mad. Smagssans leverer velsmagende, sund frokost til fair priser – frokostordning, kantineordning og catering i hele Storkøbenhavn.',
    image: img('hero'),
  },
})
