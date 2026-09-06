import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import type React from 'react'

import { RenderHero } from '@/heros/RenderHero'
import { getDialect } from '@/themes/dialect'
import { cta, heading, p, photos, richText } from '@/stories/mocks'

/**
 * The hero is where the three sites differ most: one field set, three layouts.
 * Which one you get is not an editor choice but the site's own dialect
 * (`themes/tenantThemes.ts` → `heroVariant`), so switching site in the toolbar
 * changes the composition, not just the colours.
 */
const meta = {
  title: 'Hero',
  component: RenderHero,
  parameters: {
    docs: {
      description: {
        component: [
          'Toppen af en side. Skift site i værktøjslinjen for at se de tre dialekter:',
          '',
          '- **Frokost Konsortiet** – *overlay*: teksten ligger oven på fotoet.',
          '- **Smagssans** – *split*: foto og tekst side om side.',
          '- **Fra Jorden** – *wordmark*: navnet sat som en stor bomærke-lockup mod en diagonal skæring.',
          '',
          'Historierne hedder det samme som **Type**-feltet i Payload. `None` har ingen historie – den slår heroen fra.',
          '',
          '⚠️ **Wordmark-varianten sætter selve bogstaverne og kan kun rumme et kort felt** – brandnavnet, ikke en sætning. Skriver man en hel sætning i overskriften på Fra Jorden, løber teksten ud over panelet, og underrubrik og knapper skubbes ud af båndet. Det er derfor Fra Jordens forside kun har navnet stående.',
        ].join('\n'),
      },
    },
  },
  // Every story below drives the hero from `render` (the composition depends on
  // the selected site), but `type` is a required prop — so it lives here as the
  // shared default rather than being repeated in each story's args.
  args: { type: 'highImpact' },
} satisfies Meta<typeof RenderHero>

export default meta
type Story = StoryObj<typeof meta>

type HeroArgs = React.ComponentProps<typeof RenderHero>

/**
 * Hvert site får den tekst og det motiv, dets egen hero-variant er bygget til –
 * ikke fordi Storybook kender sitets indhold, men fordi de tre varianter
 * stiller hver sit krav: overlay vil have et roligt billede at ligge oven på,
 * split et fritlagt motiv, og wordmark et kort navn og plads til den diagonale
 * skæring.
 */
const FORSIDER: Record<string, Partial<HeroArgs>> = {
  'frokost-konsortiet': {
    media: photos.buffet(),
    richText: richText(
      heading('h1', 'Frokost, der samler os'),
      p(
        'Frokost Konsortiet er fællesskabet bag dine bedste frokostpauser. Vi laver frokost med variation, kvalitet og bæredygtighed i centrum.',
      ),
    ) as HeroArgs['richText'],
    links: [cta('Kontakt os'), cta('Om os', 'outline')],
  },
  smagssans: {
    media: photos.fritlagt(),
    mediaFit: 'contain',
    richText: richText(
      heading('h1', 'Det handler om at være glad for mad'),
      p(
        'Vi leverer brændstoffet til jeres medarbejdere – velsmagende, sund mad, der holder humøret oppe og hovedet skarpt.',
      ),
    ) as HeroArgs['richText'],
    links: [cta('Frokostordning'), cta('Om os', 'outline')],
  },
  frajorden: {
    media: photos.langbord(),
    richText: richText(heading('h1', 'Fra jorden'), p('Til jeres frokostbord')) as HeroArgs['richText'],
    links: [],
  },
}

/**
 * Sitets egen forside, med dets eget foto og dets egen tekst. Det er sådan
 * heroen faktisk står i dag – skift site i værktøjslinjen for at se alle tre.
 */
export const HighImpact: Story = {
  name: 'High Impact',
  render: (_args, { globals }) => {
    const tenant = (globals.tenant as string) || 'frokost-konsortiet'
    return (
      <RenderHero
        type="highImpact"
        {...FORSIDER[tenant]}
        dialect={getDialect(tenant)}
      />
    )
  },
}

/** Til indholdssider: billede og overskrift, uden det fulde bånd. */
export const MediumImpact: Story = {
  name: 'Medium Impact',
  render: (_args, { globals }) => (
    <RenderHero
      type="mediumImpact"
      media={photos.koekken()}
      richText={richText(heading('h1', 'Om os'), p('Tre køkkener, én målsætning.')) as HeroArgs['richText']}
      links={[]}
      dialect={getDialect(globals.tenant as string)}
    />
  ),
}

/** Kun tekst – til sider hvor billedet ikke tilføjer noget. */
export const LowImpact: Story = {
  name: 'Low Impact',
  render: (_args, { globals }) => (
    <RenderHero
      type="lowImpact"
      richText={richText(heading('h1', 'Kontakt'), p('Vi svarer inden for én hverdag.')) as HeroArgs['richText']}
      links={[]}
      dialect={getDialect(globals.tenant as string)}
    />
  ),
}
