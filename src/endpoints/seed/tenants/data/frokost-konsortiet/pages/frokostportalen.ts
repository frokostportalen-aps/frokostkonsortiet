import type { PageFactory } from '../../types'
import { column, content, cta, customLink, heading, hero, p, richText } from '../../builders'

export const frokostportalen: PageFactory = ({ tenantID, img }) => ({
  title: 'FrokostPortalen',
  slug: 'frokostportalen',
  _status: 'published',
  tenant: tenantID,
  hero: hero.medium(
    img('frokostportalen'),
    richText(
      heading('h1', 'FrokostPortalen'),
      p(
        'Hold styr på den daglige økonomi. FrokostPortalen samler bestilling, tilretning og overblik ét sted – for både køkken og kunde.',
      ),
    ),
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Et samlet overblik')),
        column(
          'oneThird',
          heading('h3', 'Daglig økonomi'),
          p('Følg forbrug og fakturering løbende, så der aldrig er overraskelser ved månedens udgang.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Nem bestilling'),
          p('Tilret antal og behov med få klik – ændringer slår igennem med det samme.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Mindre madspild'),
          p('Hold øje med forbruget og undgå at smide penge i skraldespanden.'),
        ),
      ],
      'Et samlet overblik',
    ),
    content(
      [
        column(
          'full',
          heading('h2', 'Login'),
          p(
            'Er I allerede kunde? Log ind på portalen og administrer jeres ordning på min.frokostportal.dk.',
          ),
        ),
      ],
      'Login',
    ),
    cta(
      richText(
        heading('h3', 'Log ind på FrokostPortalen'),
        p('Administrer jeres ordning, se forbruget og tilret behov – når det passer jer.'),
      ),
      [customLink('Gå til login', 'https://min.frokostportal.dk')],
    ),
  ],
  meta: {
    title: 'FrokostPortalen',
    description:
      'FrokostPortalen samler bestilling, tilretning og overblik over den daglige økonomi ét sted.',
    image: img('frokostportalen'),
  },
})
