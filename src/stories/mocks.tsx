import React from 'react'

import type { Media } from '@/payload-types'

/**
 * Shared fixtures for the block stories.
 *
 * Storybook stands on its own: nothing here reaches into the seed. The
 * rich-text builders are Storybook's own (`./lexical`) and the photography too
 * (`./assets`), so content the client owns can be moved or deleted without
 * touching the component documentation.
 */
export { heading, link, list, p, paragraph, richText, text } from './lexical'

/**
 * Where this Storybook is served from: `/` locally, `/<repo>/` on GitHub Pages.
 *
 * Asset URLs have to be built against it. An absolute `/img/…` resolves to the
 * domain root, which on a project Pages site is a different site altogether —
 * so every photo 404s there while working perfectly in local dev.
 */
const basePath = typeof document === 'undefined' ? '/' : new URL('.', document.baseURI).pathname

/**
 * A Media document pointing at one of Storybook's own photos in
 * `stories/assets/`, served under `<base>img/`.
 */
export const media = (
  filename: string,
  { width = 1600, height = 1067, alt = 'Eksempelbillede' } = {},
): Media =>
  ({
    id: `mock-${filename}`,
    alt,
    url: `${basePath}img/${filename}`,
    filename,
    mimeType: filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
    width,
    height,
    filesize: 100_000,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }) as Media

/**
 * The photo set the stories draw on. Named for the motif rather than for a
 * site, because the same picture is used whichever site is selected: when only
 * the theme changes between two screenshots, the difference you see is the
 * theme.
 */
const TALL = { width: 1280, height: 1600 }
export const photos = {
  /** Wide, calm — carries a headline on top of it. */
  buffet: () => media('buffet.jpg', { alt: 'Frokostbord set oppefra' }),
  /** Wide, with room at one side — for the wordmark lockup's diagonal. */
  langbord: () => media('langbord.jpg', { alt: 'Langbord med anretninger' }),
  /** Cut out against a plain ground — for the hero that shows the whole image. */
  fritlagt: () => media('fritlagt.webp', { width: 1242, height: 1776, alt: 'Fritlagt anretning' }),
  koekken: () => media('koekken.jpg', { ...TALL, alt: 'Køkkenet i arbejde' }),
  anretning: () => media('anretning.jpg', { ...TALL, alt: 'Anretning tæt på' }),
  raavarer: () => media('raavarer.jpg', { ...TALL, alt: 'Råvarer på bordet' }),
  portraet: () => media('portraet.jpg', { ...TALL, alt: 'Portræt' }),
}

/** A link, in the shape the CTA and hero link groups expect. */
export const cta = (label: string, appearance: 'default' | 'outline' = 'default') => ({
  link: { type: 'custom' as const, appearance, label, url: '#', newTab: false },
})

/**
 * Renders a block with `tenantSlug` taken from the toolbar, so blocks that
 * resolve their own dialect (hero variant, eyebrow style, signature) follow the
 * site you have selected instead of falling back to the family default.
 */
export const withTenant =
  <P extends { tenantSlug?: string }>(Block: React.ComponentType<P>) =>
  (args: P, { globals }: { globals: { tenant?: string } }) => (
    <Block {...args} tenantSlug={globals.tenant} />
  )

/**
 * The standing "Få et tilbud" form, in the shape a populated page query hands
 * to the form block and the plan picker. Field names match the real seeded
 * form, so the picker's structured answers land on the fields it expects.
 */
export const quoteForm = () =>
  ({
    id: 'mock-form',
    title: 'Få et tilbud',
    submitButtonLabel: 'Send forespørgsel',
    confirmationType: 'message',
    confirmationMessage: null,
    fields: [
      { blockType: 'text', name: 'navn', label: 'Navn', required: true, width: 50 },
      { blockType: 'text', name: 'virksomhed', label: 'Virksomhed', required: true, width: 50 },
      { blockType: 'email', name: 'email', label: 'E-mail', required: true, width: 50 },
      { blockType: 'text', name: 'telefon', label: 'Telefon', width: 50 },
      {
        blockType: 'select',
        name: 'behov',
        label: 'Hvad handler forespørgslen om?',
        required: true,
        width: 50,
        options: [
          { label: 'Daglig frokost', value: 'Daglig frokost' },
          { label: 'Kantine', value: 'Kantine' },
          { label: 'Catering & selskaber', value: 'Catering & selskaber' },
        ],
      },
      {
        blockType: 'number',
        name: 'antalMedarbejdere',
        label: 'Antal medarbejdere',
        width: 50,
      },
      { blockType: 'textarea', name: 'besked', label: 'Fortæl kort om jeres behov' },
    ],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any
