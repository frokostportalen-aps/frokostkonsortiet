import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import type React from 'react'

import { MediaContentBlock } from './Component'
import { cta, heading, p, photos, richText, withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Media + Content',
  component: MediaContentBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Billede i den ene side, tekst i den anden. Skift side hver gang blokken gentages ned ad en side, så den får rytme. Billedet kan fylde halvdelen eller kun en tredjedel.',
      },
    },
  },
  render: withTenant(MediaContentBlock),
} satisfies Meta<typeof MediaContentBlock>

export default meta
type Story = StoryObj<typeof meta>

// `blockType` is a constant on the generated type; it is set once in the JSX
// below rather than repeated on every band.
type BandArgs = Omit<React.ComponentProps<typeof MediaContentBlock>, 'blockType'>

export const BilledeTilVenstre: Story = {
  name: 'Billede til venstre',
  args: {
    media: photos.koekken(),
    imagePosition: 'left',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(
      heading('h3', 'Mad lavet fra bunden'),
      p('Standardopsætningen: halv/halv, tekst venstrestillet, med plads til et par knapper.'),
    ),
    links: [cta('Læs mere'), cta('Se menuen', 'outline')],
  } as never,
}

export const BilledeTilHøjre: Story = {
  name: 'Billede til højre',
  args: {
    media: photos.anretning(),
    imagePosition: 'right',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(
      heading('h3', 'Sæsonen bestemmer'),
      p('Samme blok med billedet i den anden side – sådan skabes rytmen ned ad siden.'),
    ),
    links: [],
  } as never,
}

/** Smallere billede med centreret tekst – til portrætter og motiver med luft om. */
export const SmaltBillede: Story = {
  name: 'Smalt billede, centreret tekst',
  args: {
    media: photos.portraet(),
    imagePosition: 'right',
    mediaRatio: 'oneThird',
    textAlign: 'center',
    richText: richText(heading('h3', 'Et portræt'), p('Billedet fylder en tredjedel, teksten er centreret.')),
    links: [],
  } as never,
}

/**
 * Sådan bruges blokken i praksis: flere bånd efter hinanden, hvor billedsiden
 * skifter for hvert. Det er vekslen, der giver siden rytme – to bånd med
 * billedet i samme side står tungt og læses som ét langt afsnit.
 *
 * Her kan man vurdere afstanden mellem båndene og se, at teksten flugter på
 * tværs, hvilket ikke kan bedømmes på en enkelt blok.
 */
export const Stablet: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Fire bånd med skiftende billedside – det mønster en indholdsside faktisk bygges af. Det sidste bånd er sat til en tredjedel, så man kan se de to bredder mødes.',
      },
    },
  },
  // `media` er påkrævet på blokken; båndene nedenfor sætter deres egne.
  args: { media: photos.koekken() } as never,
  render: (_args, { globals }) => {
    const bånd: BandArgs[] = [
      {
        media: photos.koekken(),
        imagePosition: 'left',
        richText: richText(
          heading('h3', 'Mad lavet fra bunden'),
          p('Vi laver maden i vores eget køkken hver morgen – ikke pakket i forvejen dagen før.'),
        ) as BandArgs['richText'],
        links: [cta('Læs mere')] as BandArgs['links'],
      },
      {
        media: photos.anretning(),
        imagePosition: 'right',
        richText: richText(
          heading('h3', 'Sæsonen bestemmer'),
          p('Menuen følger året. Om vinteren rodfrugter og kål, om sommeren det der lige er kommet ind.'),
        ) as BandArgs['richText'],
        links: [],
      },
      {
        media: photos.raavarer(),
        imagePosition: 'left',
        richText: richText(
          heading('h3', 'Faste avlere'),
          p('Vi køber hos de samme gårde år efter år, så vi ved hvad vi får – og de ved hvad vi skal bruge.'),
        ) as BandArgs['richText'],
        links: [cta('Mød avlerne', 'outline')] as BandArgs['links'],
      },
      {
        media: photos.portraet(),
        imagePosition: 'right',
        mediaRatio: 'oneThird',
        richText: richText(
          heading('h3', 'Et smallere bånd til sidst'),
          p('Her fylder billedet kun en tredjedel – sådan mødes de to bredder ned ad en side.'),
        ) as BandArgs['richText'],
        links: [],
      },
    ]
    return (
      <>
        {bånd.map((b, i) => (
          <MediaContentBlock
            key={i}
            blockType="mediaContent"
            mediaRatio="half"
            textAlign="left"
            tenantSlug={globals.tenant as string}
            {...b}
          />
        ))}
      </>
    )
  },
}
