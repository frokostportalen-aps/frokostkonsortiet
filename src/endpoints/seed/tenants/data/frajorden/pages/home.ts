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
  testimonials,
} from '../../builders'

export const home: PageFactory = ({ tenantID, img }) => ({
  title: 'Fra Jorden – frokost',
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  hero: hero.high(
    img('hero'),
    richText(
      heading('h1', 'Fra jorden til jeres frokostbord'),
      p(
        'Fra Jorden dyrker frokost med respekt for naturen. Økologiske grøntsager, korte forsyningskæder og grøn gastronomi gør hver ret både god for jer og for kloden.',
      ),
    ),
    [customLink('Om os', '/om-os'), customLink('Nyheder', '/posts', 'outline')],
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Velkommen hos Fra Jorden')),
        column(
          'oneThird',
          heading('h3', '100% økologisk'),
          p(
            'Alle vores råvarer er økologiske. Det er ikke til forhandling – det er fundamentet under alt, vi laver.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Grøntsager i centrum'),
          p(
            'Vi sætter grøntsagerne forrest på tallerkenen og viser, hvor mættende og smagfuldt det grønne køkken kan være.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Lokale leverandører'),
          p(
            'Vi køber tæt på og i sæson, så råvarerne er friske, sporbare og rejser så kort som muligt.',
          ),
        ),
      ],
      'Intro',
    ),
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Grøntsagen i hovedrollen'),
        p(
          'Økologiske råvarer fra danske avlere, korte forsyningskæder og minimalt madspild. Grøn gastronomi, der er god for både jer og planeten.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    mediaContent(
      img('forside-2'),
      'right',
      richText(
        heading('h2', 'Tæt på avlerne'),
        p(
          'Vi kender markerne og menneskene bag vores råvarer. Hele høsten kommer i brug – ikke kun de pæneste eksemplarer – så der er mindre spild på marken og mere smag i køkkenet.',
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
        heading('h2', 'Fra mark til frokostbord'),
        p(
          'Vi planlægger sæsonen sammen med vores avlere og bruger hele råvaren, så der er mindre spild på marken og mere smag i køkkenet.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    testimonials(
      'Det siger vores kunder',
      'Arbejdspladser i hele landet har Fra Jorden på menuen. Her er nogle af dem.',
      [
        {
          quote:
            'Vores CO₂-regnskab på frokosten er faldet markant, og maden er blevet bedre. Fra Jorden beviser, at det grønne valg også er det lækre valg.',
          author: 'Anders Vinge',
          role: 'Bæredygtighedschef, Klimafonden',
        },
        {
          quote:
            'Grøntsagen i hovedrollen lød kedeligt, til vi smagte det. Nu efterspørger selv de mest kødglade kolleger en ekstra portion.',
          author: 'Maja Toft',
          role: 'Driftsleder, Coworking Syd',
        },
        {
          quote:
            'Det er 100% økologisk uden at gå på kompromis med smagen. Vi kan stå inde for hver eneste ret, vi serverer for vores gæster.',
          author: 'Søren Bach',
          role: 'Kantineansvarlig, Novo Campus',
        },
        {
          quote:
            'At de kender avlerne bag råvarerne betyder alt for os. Det er sporbarhed, vi kan fortælle vores kunder om med stolthed.',
          author: 'Ida Kjær',
          role: 'Indkøbschef, Ren Energi A/S',
        },
        {
          quote:
            'Sæsonens råvarer gør, at menuen hele tiden skifter. Det holder frokosten spændende og minder os om, hvad der gror lige nu.',
          author: 'Mikkel Roed',
          role: 'Projektleder, Urban Farming Lab',
        },
        {
          quote:
            'Mindre madspild og mere smag – de to ting plejer at trække i hver sin retning. Fra Jorden får dem til at gå hånd i hånd.',
          author: 'Trine Holst',
          role: 'ESG-rådgiver, Grøn Omstilling',
        },
      ],
    ),
    cta(
      richText(
        heading('h3', 'Smag det grønne køkken'),
        p(
          'Nysgerrig på en frokost, der er god for både jer og planeten? Lad os vise jer, hvad sæsonen byder på.',
        ),
      ),
      [customLink('Kontakt os', '/om-os')],
    ),
  ],
  meta: {
    title: 'Fra Jorden',
    description:
      'Fra Jorden dyrker frokost med respekt for naturen. Økologiske grøntsager, korte forsyningskæder og grøn gastronomi gør hver ret både god for jer og for kloden.',
    image: img('hero'),
  },
})
