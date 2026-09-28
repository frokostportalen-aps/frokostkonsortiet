import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { GalleryBlock } from './Component'
import { photos, withTenant } from '@/stories/mocks'

const meta = {
  title: 'Blokke/Billedgalleri',
  component: GalleryBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Billeder i vendekortenes look: foto i 4:5 og – hvis der er en billedtekst – et farvet bånd nederst. Et klik åbner billedet stort, med pile og piletaster til de næste. Op til tre står side om side; fra det fjerde bliver rækken en slider.',
      },
    },
  },
  render: withTenant(GalleryBlock),
} satisfies Meta<typeof GalleryBlock>

export default meta
type Story = StoryObj<typeof meta>

/** Tre billeder med billedtekst – står side om side. */
export const MedBilledtekst: Story = {
  args: {
    eyebrow: 'Et kig ind i køkkenet',
    heading: 'Sådan ser en dag ud hos os',
    images: [
      { image: photos.koekken(), caption: 'Køkkenet kl. 7', tone: 'auto' },
      { image: photos.raavarer(), caption: 'Dagens råvarer', tone: 'auto' },
      { image: photos.anretning(), caption: 'Klar til levering', tone: 'auto' },
    ],
  } as never,
}

/** Kun billeder – uden bånd fylder fotoet hele kortet. */
export const KunBilleder: Story = {
  args: {
    heading: 'Fra vores anretninger',
    images: [
      { image: photos.anretning() },
      { image: photos.buffet() },
      { image: photos.raavarer() },
    ],
  } as never,
}

/** Fra det fjerde billede bliver rækken en slider – og billedtekst er valgfri pr. billede. */
export const Slider: Story = {
  args: {
    heading: 'Galleri',
    intro: 'Klik på et billede for at se det stort.',
    images: [
      { image: photos.koekken(), caption: 'Køkkenet', tone: 'auto' },
      { image: photos.buffet() },
      { image: photos.raavarer(), caption: 'Råvarer', tone: 'auto' },
      { image: photos.anretning(), caption: 'Anretning', tone: 'auto' },
      { image: photos.langbord() },
      { image: photos.portraet(), caption: 'Kokken', tone: 'brand' },
    ],
  } as never,
}
