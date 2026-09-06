import type { PageFactory } from '../../types'
import { cta, customLink, faq, heading, hero, p, richText } from '../../builders'

/**
 * Den brede FAQ: dækning, prøveperiode, skat/moms, referencer og opgradering.
 * Pris, minimum, deadline og binding hører til frokostordningen og står kun
 * dér — ingen tekst to steder.
 */
export const faqPage: PageFactory = ({ tenantID, img }) => ({
  title: 'FAQ',
  slug: 'faq',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('faq'),
    richText(
      heading('h1', 'Spørgsmål, I skal have svar på, før I siger ja'),
      p('De ting, indkøb og økonomi altid spørger om – uden forbehold og småt med.'),
    ),
  ),
  layout: [
    faq([
      {
        q: 'Leverer I til os?',
        a: 'Vi kører i hele Hovedstaden og på Sjælland. Skriv jeres postnummer i tilbudsformularen, så bekræfter vi samme hverdag, om I ligger på en af vores ruter.',
      },
      {
        q: 'Kan vi prøve det først?',
        a: 'Ja. Vi kommer forbi med frokost til hele huset en dag, I vælger, så I kan smage maden og se opstillingen, før I skriver under. Det koster ikke noget, og der følger ingen forpligtelse med.',
      },
      {
        q: 'Hvad med skat og moms?',
        a: 'Medarbejderne betaler typisk en fast egenbetaling pr. måltid, så frokosten ikke bliver et skattepligtigt personalegode, og virksomheden har som udgangspunkt momsfradrag, når maden serveres på arbejdspladsen. Satserne ændrer sig, så vi sender de aktuelle tal sammen med tilbuddet – og jeres revisor skal godkende opsætningen.',
      },
      {
        q: 'Hvem laver maden?',
        a: 'Vores køkkenchef Steffen Krogh og hans hold. Maden bliver lavet fra bunden i vores eget køkken hver morgen – ikke pakket i forvejen.',
      },
      {
        q: 'Er I ansvarlige indkøbere?',
        a: 'Alle vores råvarer er økologiske, vi køber i sæson hos faste avlere, og hver ret har et CO2e-tal pr. kg, som både medarbejderne og jeres klimaregnskab kan bruge.',
      },
      {
        q: 'Kan vi tage højde for allergier og specialkost?',
        a: 'Ja. Vi laver navngivne portioner uden ekstra beregning, og alle retter er mærket med de 14 lovpligtige allergener – både online og på skiltene ved buffeten.',
      },
      {
        q: 'Hvem har I ellers leveret til?',
        a: 'Vi sender gerne referencer fra arbejdspladser på jeres størrelse i jeres område – spørg efter dem i formularen, så følger de med tilbuddet.',
      },
      {
        q: 'Hvad hvis vi vokser?',
        a: 'Så følger ordningen med. Bliver I mange nok til jeres eget køkken, kan vi tage over som kantinedrift – samme køkken, samme kontaktperson.',
      },
    ]),
    cta(
      richText(
        heading('h3', 'Fandt I ikke svaret?'),
        p('Skriv jeres spørgsmål i formularen, så svarer vi samme hverdag.'),
      ),
      [
        customLink('Få et tilbud', '/frokost-ud-af-huset#tilbud'),
        customLink('Se frokostordningen', '/frokost-ud-af-huset', 'outline'),
      ],
    ),
  ],
  meta: {
    title: 'FAQ',
    description:
      'Dækning, prøvefrokost, skat og moms, allergier, referencer og opgradering – svar på det, indkøb og økonomi spørger om.',
    image: img('faq'),
  },
})
