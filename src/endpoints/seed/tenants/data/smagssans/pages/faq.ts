import type { PageFactory } from '../../types'
import { cta, customLink, faq, heading, hero, p, richText } from '../../builders'

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
    faq([
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
    ]),
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
