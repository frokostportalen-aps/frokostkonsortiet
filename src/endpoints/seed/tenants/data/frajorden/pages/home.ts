import type { PageFactory } from '../../types'
import {
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
} from '../../builders'

/**
 * Forsiden, bygget udelukkende på teksterne fra Audryns oplæg: kokken, de tre
 * ordninger, løftet, chipsene, klimaregnskabet, den åbne ugemenu og smagningen. Pris, minimum,
 * deadline og hensyn hører til Frokostordning-siden og står kun dér — ingen
 * sætning optræder to steder.
 */
export const home: PageFactory = ({ tenantID, img }) => ({
  title: 'Fra Jorden – frokost',
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  // The wordmark hero letters the h1 itself, so it wants the brand name and a
  // short subline — the longer promise lands in the section below. The layout
  // holds no buttons here: the standing CTA lives in the header (headerCta).
  hero: hero.high(img('hero'), richText(heading('h1', 'Fra jorden'), p('Til jeres frokostbord'))),
  layout: [
    // Kokken — portrættet i en tredjedel, teksten i de to tredjedele. Teksten er
    // venstrestillet som resten af siden: ét centreret element (tal-båndet) er
    // et virkemiddel, to gør, at siden ikke står stille.
    mediaContent(
      img('koekkenchef'),
      'left',
      richText(
        heading('h2', 'Der står en kok bag. Ikke en fabrik.'),
        p(
          '”Min mad er min signatur. Jeg kan ikke selv stå ved siden af hver eneste ret, når den bliver serveret, og derfor er mit team en vigtig del af det, vi sender ud. Sammen skal vi sikre, at hver eneste ret viser, hvad Fra Jorden står for: godt håndværk, ærlige råvarer, ordentlig tilsmagning og kærlighed til hver eneste detalje.”',
        ),
        p('Steffen Krogh, køkkenchef'),
      ),
      [],
      'Kokken',
      { ratio: 'oneThird' },
    ),
    // Vi tilbyder — de tre ordninger som kort på et foto.
    // NB: kortteksten er den samme sætning på alle tre kort, præcis som i
    // mockuppen. Kantinedrift og Event catering mangler deres egen tekst, og de
    // to sider findes ikke endnu, så kortene linker ingen steder hen.
    content(
      [
        column('full', heading('h2', 'Vi tilbyder')),
        column(
          'oneThird',
          heading('h3', 'Frokostordning'),
          p(
            'Komplet kantinedrift med professionel bemanding og daglig forsyning af kvalitetsmad skræddersyet til jeres behov.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Kantinedrift'),
          p(
            'Komplet kantinedrift med professionel bemanding og daglig forsyning af kvalitetsmad skræddersyet til jeres behov.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Event catering'),
          p(
            'Komplet kantinedrift med professionel bemanding og daglig forsyning af kvalitetsmad skræddersyet til jeres behov.',
          ),
        ),
      ],
      'Vi tilbyder',
      img('forside-2'),
    ),
    // Løftet — én gang, i klartekst.
    content(
      [
        column(
          'full',
          heading('h2', 'Frokost, som folk faktisk ser frem til'),
          p(
            'Vi laver maden fra bunden hver morgen i vores eget køkken og stiller den frem på jeres frokostbord inden kl. 11.30. Nye retter hver dag, CO2-tal på hver ret – og en fast kok, I kender ved navn.',
          ),
        ),
      ],
      'Løftet',
    ),
    // Chipsene fra oplægget: de fire tal, køberen leder efter først.
    stats(
      [
        { value: 'Fra 15', label: 'medarbejdere' },
        { value: 'Sjælland', label: 'og Hovedstaden' },
        { value: 'CO2-tal', label: 'på hver ret' },
        { value: '30 dage', label: 'løbende måned + 30 dage' },
      ],
      undefined,
      undefined,
      'Nøgletal',
      // Tallene handler om levering, minimum og CO2 — bandet tager derfor
      // øko-grønnen frem for terracottaen, som holdes til wordmark og knapper.
      'eco',
    ),
    // Klimaregnskabet — hvad tallet er, og hvad det ikke er.
    mediaContent(
      img('forside-spotlight'),
      'right',
      richText(
        heading('h2', 'Vi skjuler ikke klimaregnskabet'),
        p(
          'Hver ret får et CO2-tal, som medarbejderne kan se, mens de tager mad. Det gør ikke maden grønnere i sig selv – men det gør valget synligt, og det flytter forbruget.',
        ),
      ),
      [],
      'Klimaregnskab',
    ),
    // Ugemenuen ligger frit fremme — ingen login, ingen mailkorrespondance.
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Ugens menu, helt åbent'),
        p(
          'Ingen login, ingen mailkorrespondance. Klik dig gennem ugen og se præcis, hvad der bliver serveret – inklusive allergener og klimaaftryk pr. kilo.',
        ),
      ),
      [customLink('Se ugens menu', '/frokost-ud-af-huset', 'outline')],
      'Ugens menu',
    ),
    // Kundecitater. ⚠️ KUN DET FØRSTE CITAT ER ÆGTE — Hanne Damgaard / Børns
    // Vilkår, som det står i designoplægget. De tre næste er EKSEMPLER, skrevet
    // for at karrusellen kan afprøves, og de skal skiftes ud med rigtige
    // referencer inden siden går live: Audryns oplæg beder om 3–5 navngivne
    // sjællandske referencer, og indtil de findes, står de her som eksempler
    // (jf. den samme note i tenantens index.ts om ikke at lade vores eget
    // udkast blive stående). Eksemplerne følger oplæggets tre toneregler —
    // konkret frem for pæn, kundens egen stemme, ét budskab pr. citat — og hver
    // af dem tager sit eget af de fire løfter, siden i øvrigt giver.
    testimonials(
      'Det siger vores kunder',
      '',
      [
        {
          quote:
            'Vi valgte at have frokostordningen hos Fra Jorden, fordi vi ønskede et mere økologisk fokus i hverdagen. Vi sætter stor pris på at køkkenet har fokus på sæsonens råvarer, deres fleksibilitet og den stabile samt pålidelige levering.',
          author: 'Hanne Damgaard',
          role: 'Børns Vilkår',
        },
        {
          quote:
            'Vi har tre kolleger med allergier, og for første gang skal de ikke spørge, om der er noget til dem. Portionerne står med navn på ved siden af buffeten hver dag, og det koster os ikke en krone ekstra.',
          author: 'Line Aagaard',
          role: 'Kontorleder, Advokathuset Roskilde',
        },
        {
          quote:
            'Halvdelen af huset er på kursus om torsdagen. Vi retter antallet i portalen dagen før og betaler kun for det, vi bestiller — det var det, der fik regnestykket til at hænge sammen hos os.',
          author: 'Thomas Bech',
          role: 'Økonomichef, Nordisk Ingeniørhus',
        },
        {
          quote:
            'Maden er god, men det er forudsigeligheden, der gør forskellen. Samme chauffør, samme kontaktperson, og buffeten står klar, inden vi går til frokost.',
          author: 'Sofie Kjær',
          role: 'Facility manager, Havneholmen',
        },
      ],
      'Kundecitater',
    ),
    cta(richText(heading('h3', 'Vil I smage, før I beslutter jer?')), [
      customLink('Få et tilbud', '/frokost-ud-af-huset#tilbud'),
      customLink('Book en smagning', '/frokost-ud-af-huset#tilbud', 'outline'),
    ]),
  ],
  meta: {
    title: 'Fra Jorden – frokost, som folk faktisk ser frem til',
    description:
      'Vi laver maden fra bunden hver morgen i vores eget køkken og stiller den frem inden kl. 11.30. Nye retter hver dag, CO2-tal på hver ret – og en fast kok, I kender ved navn.',
    image: img('hero'),
  },
})
