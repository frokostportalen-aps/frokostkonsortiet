import type { PageFactory } from '../../types'
import {
  column,
  content,
  cta,
  customLink,
  formBlock,
  heading,
  hero,
  linkColumn,
  mediaContent,
  p,
  richText,
  stats,
  timeline,
} from '../../builders'

export const omOs: PageFactory = ({ tenantID, img, tilbudsFormID }) => ({
  title: 'Om Smagssans',
  slug: 'om-os',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('om-os'),
    richText(
      heading('h1', 'Sans for mad'),
      p(
        'Smagssans ejes og drives af Thomas Tranberg, hans familie og et hold af familiære kokke, som alle brænder for virksomhedens vision og stolthed.',
      ),
    ),
  ),
  layout: [
    mediaContent(
      img('forside-spotlight'),
      'left',
      richText(
        heading('h2', 'Vores vision'),
        p(
          'Vi vil levere dejlig og smagfuld mad til en fair pris, som gør vores kunder glade og giver medarbejderne en bedre dag. Vi sætter en ære i personlig kontakt og glade medarbejdere – det er vores opskrift på succes.',
        ),
        p(
          'Vi har ikke ambitioner om at blive en stor og uoverskuelig virksomhed. Vi vil bevare overblikket og sikre, at alle gæster får en god oplevelse – også dem med multiallergi, laktoseintolerance og andre særlige behov.',
        ),
      ),
      [customLink('Se vores frokostordning', '/frokost-ud-af-huset')],
    ),
    content(
      [
        column('full', heading('h2', 'Vores værdier')),
        column(
          'half',
          heading('h3', 'Ærlig'),
          p('Vi lægger stor vægt på ærlighed og respekt i alt, hvad vi gør.'),
        ),
        column(
          'half',
          heading('h3', 'Stolt'),
          p('Vi laver mad, vi kan være stolte af – og det kan smages.'),
        ),
        column(
          'half',
          heading('h3', 'Engageret'),
          p('Vi brænder for maden og for menneskene omkring den.'),
        ),
        column(
          'half',
          heading('h3', 'Tilgængelig'),
          p('Vi er lige til at få fat på, og vi lytter til jeres behov.'),
        ),
      ],
      'Værdier',
    ),
    mediaContent(
      img('kunsten-at-krydre'),
      'right',
      richText(
        heading('h2', 'Vores køkkener'),
        p(
          'Vores køkkener er dimensioneret til nærvær, så der er plads til at kæle for detaljerne. Vi piller selv vores æg og ryger vores egen laks – fordi det giver stolthed, og fordi det smager bedre.',
        ),
        p('Mad er omsorg, mad skal være varieret og spændende, og vi værner om den verden, vi lever i.'),
      ),
    ),
    timeline(
      [
        {
          year: '1980',
          title: 'Det begynder',
          description:
            'Anni Tranberg etablerer sig som professionel party planner. Vi er måske Danmarks ældste cateringvirksomhed.',
        },
        {
          year: '1982',
          title: 'VIP Receptioner åbner',
          description:
            'En "ta\'-ud-af-huset-restaurant" på Jægersborg Allé i Charlottenlund, hvor man kunne købe lækre delikatesser og tage festen med hjem.',
        },
        {
          year: '1989',
          title: 'Thomas kommer til',
          description:
            'Efter studentereksamen begynder Thomas at hjælpe til i sin mors cateringvirksomhed – som kok og tjener, mens han videreuddanner sig på aftenskole.',
        },
        {
          year: '2000',
          title: 'Anden generation overtager',
          description:
            'Anni går på pension, og Thomas overtager stafetten og sætter for alvor skub i udviklingen af virksomheden.',
        },
        {
          year: '2017',
          title: 'Da vi var størst',
          description:
            'Fem køkkener fordelt over hele København, 45 ansatte og en omsætning på omkring 50 mio. kr.',
        },
        {
          year: '2018',
          title: 'Et vendepunkt',
          description:
            'Hovedkøkkenet brænder ned. Vi samler fokus om to mindre køkkener – og får bedre vilkår for at lave mad, vi kan være stolte af.',
        },
        {
          year: 'I dag',
          title: 'Sans for mad',
          description:
            'Virksomheden drives af anden generation med frokost ud af huset og kantinedrift som kerneforretning – og vi arrangerer fortsat fester på højt gastronomisk niveau.',
        },
      ],
      'DNA & historie',
      'Tætte relationer, stolthed, loyalitet og ærekærhed – det er nogle af de ord, der kendetegner os.',
    ),
    stats([
      { value: '1980', label: 'Vores rødder' },
      { value: '2.', label: 'generation i spidsen' },
      { value: '100%', label: 'grøn strøm i produktionen' },
      { value: '2', label: 'køkkener med plads til nærvær' },
    ]),
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Hvad siger maden om jer?'),
        p(
          'Vis mig, hvad I spiser, og jeg skal sige jer, hvem I er. Vi viser, hvem vi er – eller gerne vil være – gennem den mad, vi vælger.',
        ),
        p(
          'Maden fortæller, hvem vi er som mennesker og virksomheder. Og ingen har lyst til at fremstå ligeglade. Derfor tager vi maden alvorligt.',
        ),
      ),
    ),
    content(
      [
        column('full', heading('h2', 'En del af FrokostOversigten')),
        linkColumn(
          'full',
          { type: 'custom', url: 'https://frokostoversigten.dk', label: 'Besøg FrokostOversigten', newTab: true },
          p(
            'Vi er en del af FrokostOversigten – Danmarks første nonprofit online markedsplads for frokostordninger. Her får leverandøren alle pengene, så der er råd til gode råvarer og dygtige kokke.',
          ),
        ),
      ],
      'Samarbejdspartner',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Kontakt'),
          p('Smagssans A/S · Brodersens Allé 6, 2900 Hellerup'),
          p('Telefon 72 10 88 10 · frokost@smagssans.dk · CVR 17006509'),
          p('Åbningstider: mandag–fredag 07:00–16:00 (telefonen er åben til 17:00)'),
        ),
        column(
          'half',
          heading('h3', 'Thomas Tranberg'),
          p('Ejer og direktør, kundeservice'),
          p('+45 40 96 40 10 · tt@smagssans.dk'),
        ),
        column(
          'half',
          heading('h3', 'Maria Tranberg'),
          p('HR og administration'),
          p('+45 26 80 31 34 · mt@smagssans.dk'),
        ),
      ],
      'Kontakt',
    ),
    cta(
      richText(
        heading('h3', 'Vi vil gerne høre fra dig'),
        p('Skriv eller ring på 72 10 88 10, så vender vi tilbage. Du kan også få tilsendt ugens menu.'),
      ),
      [customLink('Se vores frokostordning', '/frokost-ud-af-huset')],
    ),
    formBlock(
      tilbudsFormID,
      richText(
        heading('h2', 'Få et tilbud'),
        p('Fortæl os om jeres arbejdsplads, så sammensætter vi en frokostordning, der passer til jeres behov og budget.'),
      ),
    ),
  ],
  meta: {
    title: 'Om Smagssans – sans for mad',
    description:
      'Smagssans ejes og drives af Thomas Tranberg og en flok dedikerede kokke. Måske Danmarks ældste cateringvirksomhed – med rødder tilbage til 1980.',
    image: img('om-os'),
  },
})
