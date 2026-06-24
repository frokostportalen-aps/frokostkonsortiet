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

export const TENANTS: SeedTenant[] = [
  {
    name: 'Frokost Konsortiet',
    slug: 'frokost-konsortiet',
    isMain: true,
    domains: ['frokostkonsortiet.localhost', 'localhost'],
    tagline: 'Frokost, der samler os',
    intro:
      'Frokost Konsortiet er fællesskabet bag dine bedste frokostpauser. Vi forener nogle af landets dygtigste køkkener under ét tag, så din arbejdsplads får variation, kvalitet og bæredygtighed – hver eneste dag.',
    images: {
      hero: 'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      block:
        'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    highlights: [
      {
        heading: 'Mange køkkener, ét fællesskab',
        body: 'Smagssans, Fra Jorden og flere specialkøkkener leverer under samme aftale. I skifter nemt mellem koncepter, uden at skifte leverandør.',
      },
      {
        heading: 'Sæson og bæredygtighed',
        body: 'Menuerne følger årstiderne, og vi prioriterer økologi, lokale råvarer og minimalt madspild i alle vores køkkener.',
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
            'Vi samlede en håndfuld selvstændige køkkener, der hver især var bedst til noget forskelligt – og gav dem en fælles platform. I dag betyder det, at en enkelt arbejdsplads kan få sæsonens grøntsager fra Fra Jorden den ene uge og sanselige smagskompositioner fra Smagssans den næste.',
            'Konsortiet vokser løbende med nye køkkener, der deler vores værdier om kvalitet, åbenhed og respekt for råvarerne.',
          ],
        },
        {
          heading: 'Sådan arbejder vi',
          paragraphs: [
            'Hvert køkken bevarer sin egen identitet og sit eget håndværk, mens vi står for koordinering, levering og den daglige kontakt. Det giver jer det bedste fra begge verdener: små køkkeners passion og et stort fællesskabs driftssikkerhed.',
          ],
        },
      ],
    },
    cta: {
      heading: 'Klar til en bedre frokost?',
      body: 'Tag fat i os, så finder vi det køkken – eller den kombination af køkkener – der passer til jeres arbejdsplads.',
    },
    posts: [
      {
        slug: 'variation-i-frokostordningen',
        title: 'Sådan skaber vi variation i frokostordningen',
        image:
          'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
          'Hemmeligheden bag en frokostordning, kollegerne ikke bliver trætte af, er flere køkkener med hver deres signatur.',
        sections: [
          {
            paragraphs: [
              'Den hyppigste klage over frokostordninger er ikke smagen – det er gentagelsen. Når den samme menu kører i ring, falder begejstringen, uanset hvor god maden er.',
            ],
          },
          {
            heading: 'Flere køkkener, mindre rutine',
            paragraphs: [
              'I Frokost Konsortiet roterer vi mellem køkkener med vidt forskellige udtryk. Den ene uge er der rodfrugter og grøn gastronomi fra Fra Jorden, den næste sanselige kompositioner fra Smagssans.',
              'Resultatet er en frokost, der føles ny – uden at I skal jonglere med flere leverandører og aftaler.',
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
              'Vores køkkener planlægger menuerne efter sæsonen og bruger hele råvaren. Det, der ikke bliver til dagens ret, bliver til fond, syltning eller morgendagens frokost.',
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
    domains: ['smagssans.localhost'],
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
    domains: ['frajorden.localhost'],
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
