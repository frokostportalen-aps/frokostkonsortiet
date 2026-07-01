import type { PageFactory } from '../../types'
import { cta, customLink, faq, heading, hero, p, richText, stats } from '../../builders'

export const faqPage: PageFactory = ({ tenantID, img }) => ({
  title: 'FAQ',
  slug: 'faq',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('faq'),
    richText(
      heading('h1', 'Ofte stillede spørgsmål'),
      p('Her har vi samlet de generelle, ofte stillede spørgsmål.'),
    ),
  ),
  layout: [
    stats([
      { value: '6 byer', label: 'leveringsområde i hovedstaden' },
      { value: 'Min. 15', label: 'personer pr. ordning' },
      { value: '2 hverdage', label: 'bestillingsfrist' },
      { value: 'Netto 8', label: 'betalingsdage' },
    ]),
    faq([
      {
        q: 'Hvor leverer I?',
        a: 'Vi leverer i Storkøbenhavn, Roskilde, Køge, Kastrup, Helsingør og Hillerød – og finder gerne en løsning for længere afstande.',
      },
      {
        q: 'Har I et minimum bestillingsantal?',
        a: 'Ja, og det er som udgangspunkt 15 personer. Men giv os et kald, så ser vi, om vi ikke kan løse det alligevel.',
      },
      {
        q: 'Kan man nøjes med frokost 3-4 dage om ugen?',
        a: 'Det er muligt, men priserne stiger, da de er baseret på 5-dages levering.',
      },
      {
        q: 'Hvordan bestiller man, og hvad er deadlines?',
        a: 'Man kan bestille online, via app, mail eller telefon. Deadline er 2 hverdage før og inden kl. 10.00, så vi minimerer madspild.',
      },
      {
        q: 'Kan I skræddersy en menu kun til os?',
        a: 'Ja, vi tilbyder tilpassede menuer baseret på jeres ønsker og behov.',
      },
      {
        q: 'Hvordan leveres maden, og hvordan sendes fade retur?',
        a: 'Maden leveres anrettet i fade og skåle. Efter brug skylles servicen og placeres i transportkasserne til afhentning næste dag.',
      },
      {
        q: 'Hvad gør I for at minimere madspild?',
        a: 'Vi besøger jer først for at forstå behovet, sætter en standard, der løbende tilrettes, og giver online adgang til at justere mængderne.',
      },
      {
        q: 'Hvad tid leverer I frokosten?',
        a: 'Frokosten hentes i vores køkken kl. 10.00, så typisk er den hos jer tidligst kl. 10.30.',
      },
      {
        q: 'Kan I levere frokost til folk med multiallergi?',
        a: 'Ja. Vi arbejder med allergilister og sikrer varme retter, der er trygge for allergikere.',
      },
      {
        q: 'Kan vi prøve jeres frokost en kort periode?',
        a: 'Absolut – helst minimum 1 uge, så I får et reelt indtryk.',
      },
      {
        q: 'Hvordan arbejder I med variation?',
        a: 'Vi betragter variation som en lille videnskab og som en af vores største styrker.',
      },
      {
        q: 'Hvad har I af mødeforplejning?',
        a: 'Vi har et bredt udvalg og finder også løsninger på helt specielle ønsker.',
      },
      {
        q: 'Kan I lave mad til firmafest eller reception?',
        a: 'Ja, vi har stor erfaring med selskaber og receptioner.',
      },
      {
        q: 'Kan man sætte sin ordning i bero?',
        a: 'Man kan som udgangspunkt sætte ordningen i bero op til 2 gange om året.',
      },
      {
        q: 'Hvad er betalingsbetingelserne?',
        a: 'Fakturering sker månedligt bagud med betaling netto kontant 8 dage.',
      },
    ], 'Spørgsmål og svar'),
    cta(
      richText(
        heading('h3', 'Fandt du ikke svar?'),
        p('Skriv til os, så vender vi tilbage hurtigst muligt.'),
      ),
      [customLink('Få et tilbud', '/om-os')],
    ),
  ],
  meta: {
    title: 'FAQ',
    description: 'Svar på de generelle, ofte stillede spørgsmål.',
    image: img('faq'),
  },
})
