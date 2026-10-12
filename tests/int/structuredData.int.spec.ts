import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'

import type { Media, Tenant } from '@/payload-types'
import { buildArticle, buildHomeGraph } from '@/utilities/structuredData'

const tenant = (name: string, domain: string) =>
  ({ name, domains: [{ domain, primary: true }] }) as Tenant
const frajorden = tenant('Fra Jorden', 'frajorden.dk')
const media = (url: string, og?: string) =>
  ({ url, ...(og ? { sizes: { og: { url: og } } } : {}) }) as Media

/** What a script tag actually carries: undefined properties are dropped. */
const serialized = (data: object) => JSON.parse(JSON.stringify(data))

describe('structured data', () => {
  // A production build, so each site resolves to its live primary domain.
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production')
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('describes the organization on its own domain, with only the details entered', () => {
    const [org] = serialized(
      buildHomeGraph({
        tenant: frajorden,
        logo: '/api/media/file/logo.png?prefix=frajorden',
        organization: {
          telephone: ' 12 34 56 78 ',
          email: '',
          streetAddress: 'Jordvej 1',
          postalCode: '2100',
          addressLocality: 'København Ø',
          areaServed: null,
          sameAs: [{ url: 'https://www.linkedin.com/company/frajorden' }, { url: ' ' }],
        },
      }),
    )['@graph']

    expect(org).toEqual({
      '@type': 'Organization',
      '@id': 'https://frajorden.dk/#organization',
      name: 'Fra Jorden',
      url: 'https://frajorden.dk/',
      logo: 'https://frajorden.dk/api/media/file/logo.png?prefix=frajorden',
      telephone: '12 34 56 78',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jordvej 1',
        postalCode: '2100',
        addressLocality: 'København Ø',
        addressCountry: 'DK',
      },
      sameAs: ['https://www.linkedin.com/company/frajorden'],
    })
  })

  it('leaves out the address and contact details when none are entered', () => {
    const [org] = serialized(buildHomeGraph({ tenant: tenant('Smagssans', 'smagssans.dk') }))[
      '@graph'
    ]

    expect(org).not.toHaveProperty('address')
    expect(org).not.toHaveProperty('telephone')
    expect(org).not.toHaveProperty('sameAs')
    expect(org).not.toHaveProperty('logo')
  })

  it('links the website to its organization on the front page', () => {
    const graph = serialized(buildHomeGraph({ tenant: frajorden }))

    expect(graph['@context']).toBe('https://schema.org')
    expect(graph['@graph'][1]).toMatchObject({
      '@type': 'WebSite',
      url: 'https://frajorden.dk/',
      publisher: { '@id': 'https://frajorden.dk/#organization' },
    })
  })

  it('describes a post as an article on the site that published it', () => {
    const article = serialized(
      buildArticle({
        tenant: frajorden,
        post: {
          title: 'Høsten er hjemme',
          slug: 'hoesten-er-hjemme',
          heroImage: media('/api/media/file/hoest.jpg?prefix=frajorden'),
          meta: { description: 'Sæsonens grøntsager.' },
          publishedAt: '2026-09-01T08:00:00.000Z',
          updatedAt: '2026-09-02T08:00:00.000Z',
          populatedAuthors: [{ id: '1', name: 'Kok Karen' }],
        },
      }),
    )

    expect(article).toMatchObject({
      '@type': 'Article',
      headline: 'Høsten er hjemme',
      url: 'https://frajorden.dk/posts/hoesten-er-hjemme',
      image: ['https://frajorden.dk/api/media/file/hoest.jpg?prefix=frajorden'],
      datePublished: '2026-09-01T08:00:00.000Z',
      author: [{ '@type': 'Person', name: 'Kok Karen' }],
      publisher: { '@id': 'https://frajorden.dk/#organization', name: 'Fra Jorden' },
    })
  })

  it('uses the same share image as og:image, ahead of the hero', () => {
    const article = serialized(
      buildArticle({
        tenant: frajorden,
        post: {
          title: 'Nyhed',
          slug: 'nyhed',
          heroImage: media('/api/media/file/hero.jpg'),
          meta: { image: media('/api/media/file/share.jpg', '/api/media/file/share-og.jpg') },
          updatedAt: '2026-09-02T08:00:00.000Z',
        },
      }),
    )

    expect(article.image).toEqual(['https://frajorden.dk/api/media/file/share-og.jpg'])
  })

  it('credits the site itself when a post has no byline', () => {
    const article = serialized(
      buildArticle({
        tenant: frajorden,
        post: { title: 'Nyhed', slug: 'nyhed', updatedAt: '2026-09-02T08:00:00.000Z' },
      }),
    )

    expect(article.author).toMatchObject({ '@type': 'Organization', name: 'Fra Jorden' })
    expect(article).not.toHaveProperty('image')
  })
})
