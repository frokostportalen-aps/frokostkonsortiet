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
  title: 'Smagssans – frokost',
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  hero: hero.high(
    img('hero'),
    richText(
      heading('h1', 'Frokost for alle sanser'),
      p(
        'Hos Smagssans er frokost mere end mad. Vi komponerer retter, hvor duft, tekstur og smag spiller sammen, så pausen midt på dagen bliver et lille øjeblik værd at huske.',
      ),
    ),
    [customLink('Om os', '/om-os'), customLink('Nyheder', '/posts', 'outline')],
  ),
  layout: [
    content(
      [
        column('full', heading('h2', 'Velkommen hos Smagssans')),
        column(
          'oneThird',
          heading('h3', 'Sæsonens råvarer'),
          p('Vi handler efter årstiden og lader de bedste råvarer bestemme menuen – aldrig omvendt.'),
        ),
        column(
          'oneThird',
          heading('h3', 'Håndlavet hver dag'),
          p(
            'Alt laves fra bunden i vores køkken samme morgen, det skal serveres. Ingen genveje, ingen halvfabrikata.',
          ),
        ),
        column(
          'oneThird',
          heading('h3', 'Smag, der overrasker'),
          p(
            'Velkendte retter får et uventet twist, så der altid er noget nyt at glæde sig til på tallerkenen.',
          ),
        ),
      ],
      'Intro',
    ),
    mediaContent(
      img('forside-1'),
      'left',
      richText(
        heading('h2', 'Smag, der bliver lagt mærke til'),
        p(
          'Vi laver alt fra bunden samme morgen, det skal serveres – med kontraster, dufte og krydring, der gør frokostpausen til et øjeblik værd at huske.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    mediaContent(
      img('forside-2'),
      'right',
      richText(
        heading('h2', 'Sæsonen sætter menuen'),
        p(
          'Vi handler efter årstiden og lader de bedste råvarer bestemme retterne. Det giver en menu i konstant bevægelse – og en frokost, der smager af året, lige nu.',
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
        heading('h2', 'Håndværk i hver ret'),
        p(
          'Vores kokke arbejder som komponister – kontraster, dufte og en krydring, der er smagt til, før retten forlader køkkenet.',
        ),
      ),
      [customLink('Om os', '/om-os')],
    ),
    testimonials(
      'Det siger vores kunder',
      'Arbejdspladser i hele landet har Smagssans på menuen. Her er nogle af dem.',
      [
        {
          quote:
            'Første dag stod hele kontoret og snusede til luften. Smagssans har gjort frokostpausen til noget, vi taler om resten af dagen.',
          author: 'Sofie Lind',
          role: 'Kreativ direktør, Studio Nord',
        },
        {
          quote:
            'Det er tydeligt, at hver ret er smagt til. Kontraster, duft, tekstur – det er frokost, der er tænkt igennem, ikke bare lavet.',
          author: 'Henrik Vad',
          role: 'Partner, Vad & Lange Arkitekter',
        },
        {
          quote:
            'Menuen står aldrig stille. Den følger sæsonen, så der er altid en ny smag at blive overrasket af. Vores team elsker det.',
          author: 'Amalie Bjerg',
          role: 'Teamlead, Designbureauet Form',
        },
        {
          quote:
            'Alt laves fra bunden samme morgen – det kan man smage. Det er den slags kvalitet, vi ellers kun får på en god restaurant.',
          author: 'Peter Munk',
          role: 'CFO, Munk Consulting',
        },
        {
          quote:
            'Velkendte retter med et uventet twist. Mine kolleger glæder sig faktisk til frokost nu – det havde jeg aldrig troet, jeg skulle sige.',
          author: 'Nadia El-Amin',
          role: 'Kommunikationschef, Puls Media',
        },
        {
          quote:
            'Smagssans rammer den fine balance mellem det forfinede og det mættende. Man bliver mæt, men det føles aldrig kedeligt.',
          author: 'Frederik Storm',
          role: 'Lab-leder, BioNordic',
        },
      ],
    ),
    cta(
      richText(
        heading('h3', 'Få Smagssans på menuen'),
        p(
          'Vil I forkæle kollegerne med en frokost, der bliver lagt mærke til? Lad os fortælle, hvordan en uge med Smagssans smager.',
        ),
      ),
      [customLink('Kontakt os', '/om-os')],
    ),
  ],
  meta: {
    title: 'Smagssans',
    description:
      'Hos Smagssans er frokost mere end mad. Vi komponerer retter, hvor duft, tekstur og smag spiller sammen, så pausen midt på dagen bliver et lille øjeblik værd at huske.',
    image: img('hero'),
  },
})
