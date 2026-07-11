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
  title: 'Frokost Konsortiet – frokost',
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  hero: hero.high(
    img('hero'),
    richText(
      heading('h1', 'Frokost, der samler os'),
      p(
        'Frokost Konsortiet er fællesskabet bag dine bedste frokostpauser. Vi laver frokost med variation, kvalitet og bæredygtighed i centrum, så din arbejdsplads får noget godt at glæde sig til – hver eneste dag.',
      ),
    ),
    [customLink('Kontakt os', '/kontakt'), customLink('Om os', '/om-os', 'outline')],
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Ét fællesskab – hele paletten')),
        column(
          'oneThird',
          heading('h3', 'Variation hver uge'),
          p('Vores frokost veksler, så der altid er noget nyt at glæde sig til på tallerkenen.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Sæson og bæredygtighed'),
          p(
            'Menuerne følger årstiderne, og vi prioriterer økologi, lokale råvarer og minimalt madspild i alt, hvad vi laver.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Nem administration'),
          p(
            'Én aftale, én faktura og ét kontaktpunkt. Vi gør det enkelt at give kollegerne en frokost, de glæder sig til.',
          ),
        ),
      ],
      'Intro',
    ),
    stats(
      [
        { value: '3', label: 'selvstændige køkkener under ét tag' },
        { value: '1', label: 'aftale, én faktura, ét kontaktpunkt' },
        { value: 'Fra 58 kr.', label: 'pr. kuvert på tværs af familien' },
        { value: '45+', label: 'års samlet køkkenerfaring' },
      ],
      undefined,
      undefined,
      'Nøgletal',
    ),
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Mere end bare frokost'),
        p(
          'Bag hver levering står et fællesskab af køkkener, der brænder for håndværket. Vi samler dem under én aftale, så I får variation, kvalitet og bæredygtighed – uden besværet.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    mediaContent(
      img('forside-2'),
      'right',
      richText(
        heading('h2', 'Nem administration, ét kontaktpunkt'),
        p(
          'Én aftale, én faktura og én leverandør at ringe til. Vi står for planlægning, levering og den daglige kontakt, så I kan bruge tiden på alt det andet.',
        ),
      ),
      [customLink('Om os', '/om-os')],
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
        heading('h2', 'Sæson, smag og bæredygtighed'),
        p(
          'Menuerne følger årstiderne, vi prioriterer økologi og lokale råvarer, og vi holder madspildet nede – hele vejen fra jord til frokostbord.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    planPicker({
      heading: 'Hvilken ordning passer jer?',
      intro: 'To spørgsmål – så peger vi jer i den rigtige retning.',
      plans: [
        {
          need: 'frokost',
          minPeople: 1,
          title: 'Frokostordning',
          description: 'Vi matcher jer med familiens køkkener – klassisk eller 100% økologisk.',
          priceLabel: 'fra 58 kr. pr. kuvert',
          url: '/services',
        },
        {
          need: 'kantine',
          minPeople: 40,
          title: 'Kantinedrift',
          description: 'Fra ca. 40 personer driver vi kantinen hos jer – med fast team og faste rammer.',
          priceLabel: 'Aftalepris',
          url: '/services',
        },
        {
          need: 'catering',
          minPeople: 1,
          title: 'Catering & selskaber',
          description: 'Reception, mærkedag eller flerretters middag – vi finder køkkenet, der løfter det.',
          priceLabel: 'fra 145 kr. pr. person',
          url: '/services',
        },
      ],
      form: tilbudsFormID,
    }),
    clientList(['Aarhus Advokaterne', 'Vestas Partners', 'GreenField', 'Kbh. Mediehus', 'Krogh & Co.', 'Nordhavn Tech']),
    testimonials(
      'Det siger vores kunder',
      'Arbejdspladser i hele landet har Frokost Konsortiet på menuen. Her er nogle af dem.',
      [
        {
          quote:
            'Vi gik fra tre forskellige leverandører til én aftale med Frokost Konsortiet. Én faktura, ét kontaktpunkt – og kollegerne er gladere end nogensinde.',
          author: 'Mette Sørensen',
          role: 'Facility Manager, Nordhavn Tech',
        },
        {
          quote:
            'Variationen er det, der gør forskellen. Der er altid noget nyt på menuen, og det mærker man på stemningen i frokostpausen.',
          author: 'Jonas Brandt',
          role: 'Kontorchef, Aarhus Advokaterne',
        },
        {
          quote:
            'Endelig en frokostordning, hvor administrationen passer sig selv. Vi bruger nul tid på det og får kvalitet hver eneste dag.',
          author: 'Camilla Holm',
          role: 'HR-ansvarlig, Vestas Partners',
        },
        {
          quote:
            'Det betyder noget, at maden er bæredygtig og i sæson. Vores medarbejdere spørger ind til, hvor råvarerne kommer fra – og der er altid et godt svar.',
          author: 'Rasmus Dahl',
          role: 'Bæredygtighedschef, GreenField',
        },
        {
          quote:
            'Skiftet var helt smertefrit. Konsortiet stod for det hele, og vi mærkede ikke en eneste dag uden frokost undervejs.',
          author: 'Line Pedersen',
          role: 'Office Manager, Kbh. Mediehus',
        },
        {
          quote:
            'Vores kantine kører nu som et urværk. Friske buffeter, glade gæster og et budget, der holder. Hvad mere kan man bede om?',
          author: 'Thomas Krogh',
          role: 'Adm. direktør, Krogh & Co.',
        },
      ],
    ),
    cta(
      richText(
        heading('h3', 'Klar til en bedre frokost?'),
        p('Tag fat i os, så finder vi den frokostløsning, der passer til jeres arbejdsplads.'),
      ),
      [customLink('Kontakt os', '/om-os')],
    ),
  ],
  meta: {
    title: 'Frokost Konsortiet',
    description:
      'Frokost Konsortiet er fællesskabet bag dine bedste frokostpauser. Vi laver frokost med variation, kvalitet og bæredygtighed i centrum, så din arbejdsplads får noget godt at glæde sig til – hver eneste dag.',
    image: img('hero'),
  },
})
