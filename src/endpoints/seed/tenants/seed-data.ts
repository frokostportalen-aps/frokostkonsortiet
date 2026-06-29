/**
 * Danish seed content for each site (the main consortium + the kitchens).
 * Kept as plain data; `seed-tenants.ts` turns it into pages, posts, media,
 * headers and footers.
 */
export type SeedSection = { heading?: string; paragraphs: string[] }

export type SeedPost = {
  slug: string
  title: string
  description: string
  /** Hero/cover image URL for this post. Falls back to a placeholder. */
  image: string
  sections: SeedSection[]
}

export type SeedTenant = {
  name: string
  slug: string
  isMain: boolean
  domains: string[]
  /** hero headline + intro paragraph on the front page */
  tagline: string
  intro: string
  /**
   * Image URLs for this site — THE place to control seed imagery. `hero` is the
   * front-page / om-os / post hero; `block` is the in-page media block. Replace
   * with your own URLs (any reachable image). If a URL fails, the seed falls
   * back to a bundled placeholder.
   */
  images: { hero: string; block: string }
  /** three "highlight" columns on the front page */
  highlights: { heading: string; body: string }[]
  /** the /om-os page */
  about: { lead: string; sections: SeedSection[] }
  cta: { heading: string; body: string }
  posts: SeedPost[]
}

/**
 * A standalone content page (beyond the home/om-os pair). Sections are rendered
 * into the existing Content/CTA blocks by `seed-tenants.ts`, so no new block
 * types are needed — prices and FAQs just become rich text.
 */
export type PageSection =
  | { kind: 'text'; heading?: string; paragraphs?: string[]; bullets?: string[] }
  | {
      kind: 'columns'
      heading?: string
      intro?: string
      columns: { heading: string; body: string }[]
    }
  | {
      kind: 'pricing'
      heading?: string
      intro?: string
      note?: string
      items: { name: string; price?: string; lines: string[] }[]
    }
  | { kind: 'faq'; heading?: string; items: { q: string; a: string }[] }
  // Renders one linked column per kitchen tenant (resolved from TENANTS at seed
  // time, so the links are env-aware like the cross-site nav).
  | { kind: 'partners'; heading?: string; intro?: string }

export type SeedPage = {
  slug: string
  title: string
  hero: { heading: string; intro?: string }
  sections: PageSection[]
  cta?: { heading: string; body: string; linkLabel?: string; linkUrl?: string }
  metaDescription?: string
}

/**
 * Pages for the main consortium site (Frokost Konsortiet). Mirrors the mockup's
 * navigation: Services · FrokostPortalen · Partnere · Netværk · Om os · Kontakt.
 */
export const CONSORTIUM_PAGES: SeedPage[] = [
  {
    slug: 'services',
    title: 'Services',
    hero: {
      heading: 'Det vi står for',
      intro:
        'Frokost Konsortiet samler en række selvstændige køkkener under ét fællesskab. Sammen dækker vi hele paletten – fra den daglige frokost til store selskaber.',
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Vores services',
        intro: 'Uanset behov finder vi den løsning, der passer til jeres arbejdsplads.',
        columns: [
          {
            heading: 'Frokost ud af huset',
            body: 'Daglig frokostordning leveret til jeres adresse – med variation, sæson og bæredygtighed i centrum.',
          },
          {
            heading: 'Kantinedrift',
            body: 'Vi driver jeres kantine med friske buffeter og faste menuer, tilpasset jeres rammer og budget.',
          },
          {
            heading: 'Catering & selskaber',
            body: 'Selskabsmenuer, receptioner og events – store som små – med mad, der gør dagen til noget særligt.',
          },
          {
            heading: 'Mødeforplejning',
            body: 'Tapas, platter og smørrebrød til møder, samt inhouse mødeservice med opdækning og afrydning.',
          },
          {
            heading: 'FrokostPortalen',
            body: 'Ét digitalt sted til bestilling, tilretning og overblik over den daglige økonomi.',
          },
          {
            heading: 'Bæredygtig drift',
            body: 'Lavt CO₂-aftryk, reduceret madspild og friske råvarer fra danske producenter i sæson.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Skal vi forplejne jer?',
      body: 'Tag fat i os, så finder vi det køkken og den løsning, der passer til jeres arbejdsplads.',
      linkLabel: 'Kontakt os',
      linkUrl: '/kontakt',
    },
    metaDescription:
      'Frokost ud af huset, kantinedrift, catering, mødeforplejning og bæredygtig drift – samlet i Frokost Konsortiet.',
  },
  {
    slug: 'frokostportalen',
    title: 'FrokostPortalen',
    hero: {
      heading: 'FrokostPortalen',
      intro:
        'Hold styr på den daglige økonomi. FrokostPortalen samler bestilling, tilretning og overblik ét sted – for både køkken og kunde.',
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Et samlet overblik',
        columns: [
          {
            heading: 'Daglig økonomi',
            body: 'Følg forbrug og fakturering løbende, så der aldrig er overraskelser ved månedens udgang.',
          },
          {
            heading: 'Nem bestilling',
            body: 'Tilret antal og behov med få klik – ændringer slår igennem med det samme.',
          },
          {
            heading: 'Mindre madspild',
            body: 'Hold øje med forbruget og undgå at smide penge i skraldespanden.',
          },
        ],
      },
      {
        kind: 'text',
        heading: 'Login',
        paragraphs: [
          'Er I allerede kunde? Log ind på portalen og administrer jeres ordning på min.frokostportal.dk.',
        ],
      },
    ],
    cta: {
      heading: 'Log ind på FrokostPortalen',
      body: 'Administrer jeres ordning, se forbruget og tilret behov – når det passer jer.',
      linkLabel: 'Gå til login',
      linkUrl: 'https://min.frokostportal.dk',
    },
    metaDescription:
      'FrokostPortalen samler bestilling, tilretning og overblik over den daglige økonomi ét sted.',
  },
  {
    slug: 'partnere',
    title: 'Partnere',
    hero: {
      heading: 'Bliv partner i Frokost Konsortiet',
      intro:
        'Vi tror på, at dygtige køkkenfolk skal kunne stå på egne ben uden at stå alene. Som partner får du fællesskab, administration og et stærkt netværk i ryggen.',
    },
    sections: [
      {
        kind: 'faq',
        heading: 'Ofte stillede spørgsmål fra kommende partnere',
        items: [
          {
            q: 'Jeg har ingen opstartskapital – kan jeg stadig blive partner?',
            a: 'Ja. Vi har bygget konsortiet, så du kan komme i gang uden en stor opsparing. Vi hjælper med rammerne, så du kan fokusere på maden.',
          },
          {
            q: 'Jeg har lige købt hus og stiftet familie – kan jeg opretholde min løn fra første dag som selvstændig?',
            a: 'Det er netop pointen med fællesskabet. Vi sikrer en stabil drift og økonomi, så du kan have en tryg indkomst fra dag ét.',
          },
          {
            q: 'Jeg har mit eget team – kan jeg tage dem med?',
            a: 'Ja. Et godt køkken er et godt hold. Du kan tage dine folk med ind i konsortiet.',
          },
          {
            q: 'Jeg er allerede selvstændig – kan jeg blive partner?',
            a: 'Absolut. Mange af vores partnere kom med en eksisterende forretning og fik adgang til netværk, indkøb og administration.',
          },
        ],
      },
      {
        kind: 'partners',
        heading: 'Mød vores founding partnere',
        intro: 'Køkkenerne, der grundlagde Frokost Konsortiet – besøg deres sider.',
      },
    ],
    cta: {
      heading: 'Kunne du tænke dig at høre mere?',
      body: 'Vi tager gerne en uforpligtende snak om, hvad et partnerskab kan betyde for dig og dit køkken.',
      linkLabel: 'Kontakt os',
      linkUrl: '/kontakt',
    },
    metaDescription:
      'Bliv partner i Frokost Konsortiet – fællesskab, administration og netværk for selvstændige køkkener.',
  },
  {
    slug: 'netvaerk',
    title: 'Netværk',
    hero: {
      heading: 'Netværk',
      intro:
        'I Frokost Konsortiet afholder vi møder og arrangementer for alle vores partnere. Vi faciliterer personalefester på tværs af hele konsortiet, så alle kan mødes og få et bredere kendskab til organisationen.',
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Kommende møder og arrangementer',
        columns: [
          {
            heading: '14. august 2026',
            body: 'Sommerfest for ansatte på tværs af konsortiet (lukket arrangement).',
          },
          {
            heading: '29. september 2026',
            body: 'Fredagsbar for kollegaer i branchen – åbent arrangement.',
          },
          {
            heading: '1. oktober 2026',
            body: 'Kvartalsmøde for køkkenchefer på tværs af konsortiet (lukket møde).',
          },
        ],
      },
    ],
    cta: {
      heading: 'Vil du med til fredagsbar?',
      body: 'Hold dig opdateret på vores arrangementer, eller skriv til os, hvis du vil høre mere om netværket.',
      linkLabel: 'Kontakt os',
      linkUrl: '/kontakt',
    },
    metaDescription:
      'Møder, arrangementer og personalefester på tværs af Frokost Konsortiet.',
  },
  {
    slug: 'kontakt',
    title: 'Kontakt',
    hero: {
      heading: 'Kontakt os',
      intro:
        'Frokost Konsortiets administration sidder klar til at hjælpe – uanset om du er kunde, kommende partner eller bare nysgerrig.',
    },
    sections: [
      {
        kind: 'text',
        heading: 'Hvem er vi',
        paragraphs: [
          'Frokost Konsortiets administration binder køkkenerne sammen og sikrer, at både kunder og partnere har ét sted at henvende sig. Vi står for den daglige drift, så køkkenerne kan koncentrere sig om maden.',
        ],
      },
      {
        kind: 'text',
        heading: 'Find os',
        bullets: [
          'Hørkær 12, 2720 Herlev',
          'Telefon: +45 72 10 88 10',
          'E-mail: kontakt@frokostkonsortiet.dk',
          'CVR-nr.: 46413148',
        ],
      },
    ],
    metaDescription:
      'Kontakt Frokost Konsortiets administration – Hørkær 12, 2720 Herlev, +45 72 10 88 10.',
  },
]

/**
 * Pages for a kitchen site (Smagssans, Fra Jorden). The kitchen name is woven
 * in so each site reads in its own voice. Mirrors the mockup's navigation:
 * Frokost ud af huset · Kantine · Catering · Bæredygtighed · Nem bestilling &
 * tilretning · FAQ (plus frugt/drikkevarer sub-pages).
 */
export const kitchenPages = (name: string): SeedPage[] => [
  {
    slug: 'frokost-ud-af-huset',
    title: 'Frokost ud af huset',
    hero: {
      heading: 'Frokost ud af huset',
      intro: `${name} leverer daglig frokost til jeres arbejdsplads – med variation, sæson og bæredygtighed i centrum.`,
    },
    sections: [
      {
        kind: 'pricing',
        heading: 'Priseksempler',
        intro: 'Vælg portionsstørrelsen, der passer til jeres arbejdsplads.',
        items: [
          {
            name: 'Large portion',
            price: '69 kr.',
            lines: [
              'Varm ret + tilbehør (350 g)',
              '2 salater',
              '2 slags pålæg',
              'Ost hver mandag',
              'Kage om torsdagen',
            ],
          },
          {
            name: 'Medium portion',
            price: '65 kr.',
            lines: [
              'Varm ret + tilbehør (250 g)',
              '2 salater',
              '3 slags pålæg',
              'Ost hver mandag',
              'Kage om torsdagen',
            ],
          },
        ],
        note: 'Log ind for at se hele menuen. Alle priser er eksklusiv moms.',
      },
      {
        kind: 'text',
        heading: 'Buffist-service',
        paragraphs: [
          `Som en del af Frokost Konsortiet tilbyder ${name}, at I kan prøve vores kollegaers køkken, når I har brug for forandring. Nem håndtering via KundePortal & App.`,
        ],
      },
      {
        kind: 'faq',
        heading: 'Ofte stillede spørgsmål',
        items: [
          {
            q: 'Hvornår er jeres tilmeldingsfrist?',
            a: 'I tilmelder og tilretter antal i KundePortalen frem til dagen før levering, så I altid betaler for det, I faktisk får.',
          },
          {
            q: 'Hvornår leverer I frokosten?',
            a: 'Vi leverer hver morgen inden frokost, så maden står klar, når sulten melder sig.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Få et tilbud',
      body: 'Fortæl os om jeres arbejdsplads, så sammensætter vi en frokostordning, der passer.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription: `Daglig frokostordning fra ${name} – leveret til jeres arbejdsplads.`,
  },
  {
    slug: 'kantine',
    title: 'Kantine',
    hero: {
      heading: 'Kantinedrift',
      intro: `Lad ${name} drive jeres kantine – med friske buffeter og faste menuer, tilpasset jeres rammer.`,
    },
    sections: [
      {
        kind: 'text',
        heading: 'Eksempel på buffetudvalg',
        paragraphs: [
          'Vores buffeter veksler dagligt med varme retter, salater, pålæg og friske grøntsager – altid med noget for enhver smag.',
        ],
      },
      {
        kind: 'pricing',
        heading: 'Priseksempler',
        items: [
          {
            name: 'Management-aftale',
            lines: [
              'Vi driver kantinen for jer',
              'Fast månedligt honorar',
              'Fuldt overblik via FrokostPortalen',
            ],
          },
          {
            name: 'Kuvertpris-aftale',
            lines: [
              'I betaler pr. kuvert',
              'Skalerer med antal spisende',
              'Ingen faste omkostninger',
            ],
          },
        ],
        note: 'Alle priser er eksklusiv moms.',
      },
      {
        kind: 'faq',
        heading: 'Ofte stillede spørgsmål',
        items: [
          {
            q: 'Kan vi selv være med til at sammensætte menuen?',
            a: 'Ja. Vi planlægger menuen i tæt dialog med jer, så den passer til jeres medarbejdere og ønsker.',
          },
          {
            q: 'Hvor mange skal vi være for at få egen kantine?',
            a: 'Vi finder en model, der passer til jeres størrelse – fra mindre arbejdspladser til store kantiner.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Vil du have et tilbud?',
      body: 'Vi kigger gerne forbi og giver et bud på, hvordan jeres kantine kan drives.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription: `Kantinedrift fra ${name} – friske buffeter og faste menuer tilpasset jeres rammer.`,
  },
  {
    slug: 'catering',
    title: 'Catering',
    hero: {
      heading: 'Catering',
      intro: `${name} leverer catering til selskaber, receptioner og mærkedage – mad, der gør dagen til noget særligt.`,
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Selskabsmenuer',
        columns: [
          {
            heading: 'Konfirmation',
            body: 'Festmenuer til den store dag, tilpasset både børn og voksne.',
          },
          {
            heading: 'Reception',
            body: 'Lækre anretninger og snacks til stående arrangementer.',
          },
          {
            heading: 'Selskaber',
            body: 'Flerretters menuer til fødselsdage, jubilæer og firmafester.',
          },
        ],
      },
      {
        kind: 'pricing',
        heading: 'Priseksempler',
        items: [
          {
            name: '3-retters menu',
            lines: [
              'Forret, hovedret og dessert',
              'Sæsonens råvarer',
              'Leveret eller serveret',
            ],
          },
          {
            name: 'Reception',
            lines: [
              'Udvalg af anretninger',
              'Snacks og finger food',
              'Tilpasset antal gæster',
            ],
          },
        ],
        note: 'Alle priser er eksklusiv moms.',
      },
      {
        kind: 'faq',
        heading: 'Ofte stillede spørgsmål',
        items: [
          {
            q: 'Hvor lang tid i forvejen skal vi bestille?',
            a: 'Til større selskaber anbefaler vi at bestille i god tid, men vi løser også gerne opgaver med kort varsel.',
          },
          {
            q: 'Tager I højde for allergier?',
            a: 'Ja. Fortæl os om allergier og særlige hensyn, så tilpasser vi menuen.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Vil du have et tilbud?',
      body: 'Fortæl os om jeres arrangement, så sammensætter vi en menu, der passer til anledningen.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription: `Catering fra ${name} – selskabsmenuer, receptioner og mærkedage.`,
  },
  {
    slug: 'moedeforplejning',
    title: 'Mødeforplejning',
    hero: {
      heading: 'Mødeforplejning',
      intro: `${name} sørger for forplejningen til jeres møder – fra kaffemøde til større arrangementer.`,
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Udvalg',
        columns: [
          {
            heading: 'Tapas-anretning',
            body: 'Et varieret udvalg af små lækkerier til det gode møde.',
          },
          {
            heading: 'Gourmet-platte',
            body: 'Forkæl deltagerne med en flot sammensat platte.',
          },
          {
            heading: 'Smørrebrød',
            body: 'Klassisk dansk smørrebrød, friskt og håndlavet.',
          },
        ],
      },
      {
        kind: 'pricing',
        heading: 'Inhouse mødeservice',
        intro: 'Opdækning og afrydning til møder.',
        items: [
          {
            name: 'Kaffemøder',
            price: '10 kr. pr. person',
            lines: ['Kaffe, te og vand', 'Opdækning og afrydning'],
          },
          {
            name: 'Middag',
            price: '20 kr. pr. person',
            lines: ['Varm forplejning', 'Opdækning og afrydning'],
          },
        ],
        note: 'Alle priser er eksklusiv moms.',
      },
    ],
    cta: {
      heading: 'Vil du have et tilbud på et større arrangement?',
      body: 'Bestil online via KundePortalen, eller skriv til os for et tilbud.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription: `Mødeforplejning fra ${name} – tapas, platter, smørrebrød og inhouse mødeservice.`,
  },
  {
    slug: 'frugtordning',
    title: 'Frugtordning',
    hero: {
      heading: 'Frugtordning',
      intro: `Frisk frugt på arbejdspladsen hver uge – leveret af ${name}.`,
    },
    sections: [
      {
        kind: 'pricing',
        heading: 'Frugtkurve',
        intro: 'Vælg den kurv, der passer til jeres antal.',
        items: [
          { name: 'Frugtkurv – 20 stk.', price: '80 kr.', lines: ['Frisk sæsonfrugt', 'Ugentlig levering'] },
          { name: 'Frugtkurv – 30 stk.', price: '80 kr.', lines: ['Frisk sæsonfrugt', 'Ugentlig levering'] },
          { name: 'Frugtkurv – 50 stk.', price: '80 kr.', lines: ['Frisk sæsonfrugt', 'Ugentlig levering'] },
        ],
        note: 'Alle priser er eksklusiv moms.',
      },
    ],
    cta: {
      heading: 'Vil du have et tilbud på et større arrangement?',
      body: 'Bestil online via KundePortalen, eller skriv til os for et tilbud.',
      linkLabel: 'Bestil online',
      linkUrl: '/om-os',
    },
    metaDescription: `Frugtordning fra ${name} – friske frugtkurve leveret hver uge.`,
  },
  {
    slug: 'drikkevarer',
    title: 'Drikkevarer',
    hero: {
      heading: 'Drikkevarer',
      intro: `Et udvalg af friske drikkevarer til arbejdspladsen fra ${name}.`,
    },
    sections: [
      {
        kind: 'pricing',
        heading: 'Udvalg',
        items: [
          { name: 'Letmælk', price: '15 kr.', lines: ['Frisk dansk mælk'] },
          { name: 'Ingefærshot – 12 stk.', price: '80 kr.', lines: ['Friskpresset ingefær'] },
          { name: 'Hyldesaft', price: '30 kr.', lines: ['Hjemmelavet sæsonsaft'] },
        ],
        note: 'Div. drikkevarer kan tilkøbes. Alle priser er eksklusiv moms.',
      },
    ],
    cta: {
      heading: 'Vil du have et tilbud på et større arrangement?',
      body: 'Bestil online via KundePortalen, eller skriv til os for et tilbud.',
      linkLabel: 'Bestil online',
      linkUrl: '/om-os',
    },
    metaDescription: `Drikkevarer fra ${name} – mælk, ingefærshots, hyldesaft og mere.`,
  },
  {
    slug: 'baeredygtighed',
    title: 'Bæredygtighed',
    hero: {
      heading: 'Bæredygtighed',
      intro: `Hos ${name} er bæredygtighed ikke en tilføjelse, men fundamentet under hele driften.`,
    },
    sections: [
      {
        kind: 'text',
        heading: 'Vores produktion',
        paragraphs: [
          'Vores produktion er baseret på bæredygtighed, med fokus på en menu-sammensætning med lavt CO₂-aftryk, reduceret madspild og prioritering af sæsonens friske råvarer fra danske producenter.',
        ],
      },
      {
        kind: 'text',
        heading: 'Vores medarbejdere',
        paragraphs: [
          'Det betyder meget at arbejde med noget, der giver mening og en god fornemmelse i maven – det gør vores hverdag bedre og bidrager til øget motivation hos os alle, hvilket driver os til at gøre os umage, så vi får glade kunder og dermed kan hjælpe endnu flere.',
        ],
      },
      {
        kind: 'text',
        heading: 'Vores drift',
        paragraphs: [
          'For at sikre økonomisk bæredygtighed driver vi køkkenet ansvarligt – så vi kan blive ved med at lave god mad i mange år frem.',
        ],
      },
      {
        kind: 'text',
        heading: 'Social kapital',
        paragraphs: [
          'Ved at styrke samarbejde, tillid og kommunikation øger vi kvaliteten på arbejdspladsen – både personligt og professionelt.',
        ],
      },
    ],
    metaDescription: `Bæredygtighed hos ${name} – lavt CO₂-aftryk, mindre madspild og social kapital.`,
  },
  {
    slug: 'kundeportal',
    title: 'Nem bestilling & tilretning',
    hero: {
      heading: 'Introduktion til vores KundePortal',
      intro:
        'Se hvordan I selv nemt kan justere jeres behov og sikre, at der altid er nok af favoritterne.',
    },
    sections: [
      {
        kind: 'columns',
        heading: 'Med KundePortalen kan I',
        columns: [
          {
            heading: 'Tilret behov',
            body: 'Juster antal og menu med få klik, så I altid har nok af favoritterne.',
          },
          {
            heading: 'Hold øje med madspild',
            body: 'Undgå at smide penge i skraldespanden ved at følge jeres forbrug.',
          },
          {
            heading: 'Fuldt overblik',
            body: 'Se forbrug og fakturering samlet ét sted – også fra app.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Kom nemt i gang',
      body: 'Som kunde får I adgang til KundePortalen, hvor I selv styrer bestilling og tilretning.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription:
      'KundePortalen gør det nemt selv at justere behov, holde øje med madspild og bevare overblikket.',
  },
  {
    slug: 'faq',
    title: 'FAQ',
    hero: {
      heading: 'Ofte stillede spørgsmål',
      intro: 'Her har vi samlet de generelle, ofte stillede spørgsmål.',
    },
    sections: [
      {
        kind: 'faq',
        items: [
          {
            q: 'Hvornår er tilmeldingsfristen?',
            a: 'I tilretter antal i KundePortalen frem til dagen før levering, så I kun betaler for det, I får.',
          },
          {
            q: 'Hvornår leverer I?',
            a: 'Vi leverer hver morgen inden frokost, så maden står klar til pausen.',
          },
          {
            q: 'Kan I tage højde for allergier og kostønsker?',
            a: 'Ja. Fortæl os om allergier og særlige hensyn, så tilpasser vi menuen.',
          },
          {
            q: 'Hvordan håndterer I madspild?',
            a: 'Vi planlægger efter sæsonen, bruger hele råvaren og hjælper jer med at tilrette antal, så spildet minimeres.',
          },
          {
            q: 'Hvordan bestiller vi?',
            a: 'Alt foregår nemt via KundePortalen og app – bestilling, tilretning og overblik samlet ét sted.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Fandt du ikke svar?',
      body: 'Skriv til os, så vender vi tilbage hurtigst muligt.',
      linkLabel: 'Få et tilbud',
      linkUrl: '/om-os',
    },
    metaDescription: 'Svar på de generelle, ofte stillede spørgsmål.',
  },
]

export const TENANTS: SeedTenant[] = [
  {
    name: 'Frokost Konsortiet',
    slug: 'frokost-konsortiet',
    isMain: true,
    domains: [
      'frokostkonsortiet.localhost',
      'localhost',
      'frokostkonsortiet.dk',
      'new.frokostkonsortiet.dk',
    ],
    tagline: 'Frokost, der samler os',
    intro:
      'Frokost Konsortiet er fællesskabet bag dine bedste frokostpauser. Vi laver frokost med variation, kvalitet og bæredygtighed i centrum, så din arbejdsplads får noget godt at glæde sig til – hver eneste dag.',
    images: {
      hero: 'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      block:
        'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    highlights: [
      {
        heading: 'Variation hver uge',
        body: 'Vores frokost veksler, så der altid er noget nyt at glæde sig til på tallerkenen.',
      },
      {
        heading: 'Sæson og bæredygtighed',
        body: 'Menuerne følger årstiderne, og vi prioriterer økologi, lokale råvarer og minimalt madspild i alt, hvad vi laver.',
      },
      {
        heading: 'Nem administration',
        body: 'Én aftale, én faktura og ét kontaktpunkt. Vi gør det enkelt at give kollegerne en frokost, de glæder sig til.',
      },
    ],
    about: {
      lead: 'Frokost Konsortiet startede som en idé om, at god frokost ikke skal være et kompromis mellem smag, sundhed og bæredygtighed.',
      sections: [
        {
          heading: 'Vores historie',
          paragraphs: [
            'Frokost Konsortiet startede med en ambition om at gøre frokostpausen til dagens højdepunkt. I dag betyder det, at en arbejdsplads kan få sæsonens grøntsager den ene uge og sanselige smagskompositioner den næste.',
            'Vi udvikler os løbende og holder fast i vores værdier om kvalitet, åbenhed og respekt for råvarerne.',
          ],
        },
        {
          heading: 'Sådan arbejder vi',
          paragraphs: [
            'Vi står for menuplanlægning, levering og den daglige kontakt, så I altid har ét sted at henvende jer. Det giver jer det bedste fra begge verdener: passion for håndværket og driftssikkerhed i hverdagen.',
          ],
        },
      ],
    },
    cta: {
      heading: 'Klar til en bedre frokost?',
      body: 'Tag fat i os, så finder vi den frokostløsning, der passer til jeres arbejdsplads.',
    },
    posts: [
      {
        slug: 'variation-i-frokostordningen',
        title: 'Sådan skaber vi variation i frokostordningen',
        image:
          'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Hemmeligheden bag en frokostordning, kollegerne ikke bliver trætte af, er menuer med variation og hver deres signatur.',
        sections: [
          {
            paragraphs: [
              'Den hyppigste klage over frokostordninger er ikke smagen – det er gentagelsen. Når den samme menu kører i ring, falder begejstringen, uanset hvor god maden er.',
            ],
          },
          {
            heading: 'Variation, mindre rutine',
            paragraphs: [
              'I Frokost Konsortiet veksler vi mellem menuer med vidt forskellige udtryk. Den ene uge er der rodfrugter og grøn gastronomi, den næste sanselige kompositioner.',
              'Resultatet er en frokost, der føles ny – uden at I skal jonglere med flere aftaler.',
            ],
          },
        ],
      },
      {
        slug: 'baeredygtighed-fra-jord-til-bord',
        title: 'Bæredygtighed fra jord til bord',
        image:
          'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Bæredygtig frokost handler om hele kæden – fra hvordan råvarerne dyrkes, til hvad der sker med resterne.',
        sections: [
          {
            paragraphs: [
              'For os stopper bæredygtighed ikke ved et økologimærke. Den begynder hos avlerne og slutter først, når det sidste måltid er spist – eller klogt brugt igen.',
            ],
          },
          {
            heading: 'Mindre madspild, mere smag',
            paragraphs: [
              'Vi planlægger menuerne efter sæsonen og bruger hele råvaren. Det, der ikke bliver til dagens ret, bliver til fond, syltning eller morgendagens frokost.',
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Smagssans',
    slug: 'smagssans',
    isMain: false,
    domains: ['smagssans.localhost', 'smagssans.dk', 'new.smagssans.dk'],
    tagline: 'Frokost for alle sanser',
    intro:
      'Hos Smagssans er frokost mere end mad. Vi komponerer retter, hvor duft, tekstur og smag spiller sammen, så pausen midt på dagen bliver et lille øjeblik værd at huske.',
    images: {
      hero: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      block:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    highlights: [
      {
        heading: 'Sæsonens råvarer',
        body: 'Vi handler efter årstiden og lader de bedste råvarer bestemme menuen – aldrig omvendt.',
      },
      {
        heading: 'Håndlavet hver dag',
        body: 'Alt laves fra bunden i vores køkken samme morgen, det skal serveres. Ingen genveje, ingen halvfabrikata.',
      },
      {
        heading: 'Smag, der overrasker',
        body: 'Velkendte retter får et uventet twist, så der altid er noget nyt at glæde sig til på tallerkenen.',
      },
    ],
    about: {
      lead: 'Smagssans blev født ud af en simpel overbevisning: at en frokost kan vække alle sanser, hvis man tør give den opmærksomhed.',
      sections: [
        {
          heading: 'Håndværket',
          paragraphs: [
            'Vores kokke arbejder som komponister. En ret skal have kontraster – det sprøde mod det bløde, det syrlige mod det fede – og en duft, der lover det, smagen holder.',
            'Vi smager til hele vejen og justerer efter dagens råvarer, for to gulerødder er aldrig helt ens.',
          ],
        },
        {
          heading: 'Råvarerne',
          paragraphs: [
            'Vi vælger leverandører, der brænder for det samme som os, og lader sæsonen sætte rammen. Det betyder en menu i konstant bevægelse – og en frokost, der smager af året, lige nu.',
          ],
        },
      ],
    },
    cta: {
      heading: 'Få Smagssans på menuen',
      body: 'Vil I forkæle kollegerne med en frokost, der bliver lagt mærke til? Lad os fortælle, hvordan en uge med Smagssans smager.',
    },
    posts: [
      {
        slug: 'efteraarets-smage',
        title: 'Efterårets smage',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Når dagene bliver kortere, bliver smagene dybere. Sådan fanger vi efteråret på tallerkenen.',
        sections: [
          {
            paragraphs: [
              'Efteråret er en gave til et køkken som vores. Råvarerne bliver kraftigere, og smagene tåler – ja, kræver – mere fylde og varme.',
            ],
          },
          {
            heading: 'Fra jord og skov',
            paragraphs: [
              'Græskar, svampe og rodfrugter får selskab af ristede nødder og syltede bær. Vi bygger retter i lag, så hver mundfuld udvikler sig fra det første bid til det sidste.',
            ],
          },
        ],
      },
      {
        slug: 'kunsten-at-krydre',
        title: 'Kunsten at krydre',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Krydderier kan løfte en ret – eller drukne den. Her er vores tilgang til balancen.',
        sections: [
          {
            paragraphs: [
              'God krydring handler ikke om styrke, men om balance. Målet er at fremhæve råvaren, ikke at overdøve den.',
            ],
          },
          {
            heading: 'Lag på lag',
            paragraphs: [
              'Vi krydrer i etaper – lidt under tilberedningen, lidt til sidst – så smagen får både dybde og friskhed. Og vi smager altid til, før retten forlader køkkenet.',
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Fra Jorden',
    slug: 'frajorden',
    isMain: false,
    domains: ['frajorden.localhost', 'frajorden.dk', 'new.frajorden.dk'],
    tagline: 'Fra jorden til jeres frokostbord',
    intro:
      'Fra Jorden dyrker frokost med respekt for naturen. Økologiske grøntsager, korte forsyningskæder og grøn gastronomi gør hver ret både god for jer og for kloden.',
    images: {
      hero: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      block:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    highlights: [
      {
        heading: '100% økologisk',
        body: 'Alle vores råvarer er økologiske. Det er ikke til forhandling – det er fundamentet under alt, vi laver.',
      },
      {
        heading: 'Grøntsager i centrum',
        body: 'Vi sætter grøntsagerne forrest på tallerkenen og viser, hvor mættende og smagfuldt det grønne køkken kan være.',
      },
      {
        heading: 'Lokale leverandører',
        body: 'Vi køber tæt på og i sæson, så råvarerne er friske, sporbare og rejser så kort som muligt.',
      },
    ],
    about: {
      lead: 'Fra Jorden begyndte på markerne, ikke i køkkenet. Vi tror på, at den bedste frokost starter med den bedste jord.',
      sections: [
        {
          heading: 'Jord til bord',
          paragraphs: [
            'Vi arbejder tæt sammen med økologiske avlere og planlægger menuen efter, hvad jorden giver netop nu. Det holder forsyningskæden kort og smagen høj.',
            'Hele råvaren kommer i spil – top, skræl og rod – så vi får mest mulig smag ud af mindst muligt spild.',
          ],
        },
        {
          heading: 'Grøn gastronomi',
          paragraphs: [
            'Et grønt køkken er ikke et fravalg, men et overflødighedshorn. Med fermentering, ristning og kloge krydringer gør vi grøntsagen til hovedrolleindehaver.',
          ],
        },
      ],
    },
    cta: {
      heading: 'Smag det grønne køkken',
      body: 'Nysgerrig på en frokost, der er god for både jer og planeten? Lad os vise jer, hvad sæsonen byder på.',
    },
    posts: [
      {
        slug: 'rodfrugternes-aarstid',
        title: 'Derfor er rodfrugter efterårets helte',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Rodfrugter er billige, holdbare og fulde af smag. Her er, hvorfor de fylder så meget i vores efterårsmenu.',
        sections: [
          {
            paragraphs: [
              'Når frosten nærmer sig, er det rodfrugterne, der træder i karakter. De har gemt smag og sødme i jorden hele sommeren – og nu er det tid til at hente den frem.',
            ],
          },
          {
            heading: 'Mere end kogte gulerødder',
            paragraphs: [
              'Ristet i ovnen bliver pastinak og persillerod karamelliserede og nøddeagtige. Råsyltet giver rødbeden syre og bid. Den samme rodfrugt kan smage vidt forskelligt – det er hele pointen.',
            ],
          },
        ],
      },
      {
        slug: 'moed-vores-avlere',
        title: 'Mød vores avlere',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Bag hver ret står en avler. Vi tog på besøg hos dem, der dyrker grøntsagerne til jeres frokost.',
        sections: [
          {
            paragraphs: [
              'Vi kender markerne, vores råvarer kommer fra, og menneskene, der passer dem. Det er ikke romantik – det er kvalitetssikring.',
            ],
          },
          {
            heading: 'Tæt samarbejde',
            paragraphs: [
              'Vi planlægger sæsonen sammen med avlerne, så vi aftager hele høsten og ikke kun de pæneste eksemplarer. Det giver mindre spild på marken og mere smag i køkkenet.',
            ],
          },
        ],
      },
    ],
  },
]
