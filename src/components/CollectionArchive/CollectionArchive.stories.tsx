import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CollectionArchive } from './index'
import { photos } from '@/stories/mocks'

/**
 * The Archive block itself is an async server component: it queries the posts
 * for the tenant and hands them to this component. The query is the part that
 * can't run in a browser, so the story covers the presentation — which is the
 * part that has a look to review.
 */
const meta = {
  title: 'Blokke/Archive',
  component: CollectionArchive,
  parameters: {
    docs: {
      description: {
        component:
          'Hedder **Archive** i blok-vælgeren. Viser indlæg fra Nyheder: på sitet henter blokken selv indlæggene for det pågældende site – her er de sat ind som eksempler, så kortenes udseende kan vurderes. Er der ingen indlæg endnu, viser blokken ingenting.',
      },
    },
  },
} satisfies Meta<typeof CollectionArchive>

export default meta
type Story = StoryObj<typeof meta>

const post = (title: string, description: string, slug: string) => ({
  slug,
  title,
  categories: [{ id: 'c1', title: 'Fra køkkenet', breadcrumbs: null, updatedAt: '', createdAt: '' }],
  meta: { title, description, image: photos.koekken() },
})

export const Standard: Story = {
  args: {
    posts: [
      post('Rodfrugternes årstid', 'Når jorden bliver kold, bliver rødderne søde. Sådan bruger vi dem.', 'rodfrugternes-aarstid'),
      post('Mød vores avlere', 'Fire gårde leverer det meste af det grønne. Vi kørte ud og hilste på.', 'moed-vores-avlere'),
      post('Kunsten at krydre', 'Hvorfor den samme ret smager forskelligt fra dag til dag.', 'kunsten-at-krydre'),
    ],
  } as never,
}
