import type { StorybookConfig } from '@storybook/nextjs-vite'

/**
 * Storybook for the block library — the same components the sites render, shown
 * one at a time in each tenant's theme (see `preview.tsx` for the switcher).
 *
 * Storybook documents the components, so it depends on the components and on
 * nothing else: no seed folder, no database, no CMS content. Everything a story
 * needs lives under `src/stories/`.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  // Storybook's own fixtures, and nothing else. Deliberately not the seed's
  // image folders (content the client owns and may move or delete) and not
  // `public/media/` (a gitignored upload directory that is empty in a fresh
  // clone). Either would let a story break for a reason that has nothing to do
  // with the component it documents.
  //
  // Note: the Next adapter copies `public/` into the build on its own, whatever
  // is listed here. Nothing references it, and it is empty in CI, so it is
  // dead weight in a local build rather than a dependency.
  staticDirs: [{ from: '../src/stories/assets', to: '/img' }],

  typescript: {
    // The blocks are typed from `payload-types.ts`; react-docgen reads those
    // props for the Docs tab.
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
