import type { Brand, Post, Tenant } from '@/payload-types'

import { getImageURL } from './generateMeta'
import { getTenantServerURL } from './getURL'

/**
 * schema.org structured data (JSON-LD) for a site. Every node is built on the
 * tenant's own origin, so each site describes itself on its own domain and the
 * nodes link up by `@id` across its pages.
 *
 * Empty CMS fields are left out rather than emitted as "" — Google flags blank
 * properties as invalid.
 */

type Node = Record<string, unknown>

/** The site's front page URL, with its trailing slash. */
const homeURL = (tenant: Tenant) => `${getTenantServerURL(tenant)}/`

const text = (value?: string | null) => value?.trim() || undefined

/** Trimmed, non-blank values — or undefined when there are none. */
const texts = (values: (string | null | undefined)[]) => {
  const list = values.map(text).filter((value): value is string => Boolean(value))
  return list.length ? list : undefined
}

type OrganizationArgs = {
  tenant: Tenant
  /** The logo's URL, absolute or site-relative. */
  logo?: string
  organization?: Brand['organization']
}

const buildOrganization = ({ tenant, logo, organization }: OrganizationArgs): Node => {
  const home = homeURL(tenant)
  const streetAddress = text(organization?.streetAddress)
  const postalCode = text(organization?.postalCode)
  const addressLocality = text(organization?.addressLocality)

  return {
    '@type': 'Organization',
    '@id': `${home}#organization`,
    name: tenant.name,
    url: home,
    logo: logo ? new URL(logo, home).toString() : undefined,
    telephone: text(organization?.telephone),
    email: text(organization?.email),
    address:
      streetAddress || postalCode || addressLocality
        ? {
            '@type': 'PostalAddress',
            streetAddress,
            postalCode,
            addressLocality,
            addressCountry: 'DK',
          }
        : undefined,
    areaServed: text(organization?.areaServed),
    sameAs: texts((organization?.sameAs ?? []).map((row) => row?.url)),
  }
}

/** The front page's graph: who the site belongs to, and the site itself. */
export const buildHomeGraph = (args: OrganizationArgs): Node => {
  const home = homeURL(args.tenant)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization(args),
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        name: args.tenant.name,
        url: home,
        inLanguage: 'da-DK',
        publisher: { '@id': `${home}#organization` },
      },
    ],
  }
}

export const buildArticle = ({
  tenant,
  post,
}: {
  tenant: Tenant
  post: Pick<
    Post,
    'title' | 'slug' | 'heroImage' | 'meta' | 'publishedAt' | 'updatedAt' | 'populatedAuthors'
  >
}): Node => {
  const home = homeURL(tenant)
  const url = `${home}posts/${post.slug}`
  // The share image og:image uses, falling back to the hero.
  const image = getImageURL(post.meta?.image) || getImageURL(post.heroImage)
  // Only the bylines the post shows; without one, the site itself is the author.
  const authors = texts((post.populatedAuthors ?? []).map((author) => author?.name))
  const site = buildOrganization({ tenant })

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: text(post.meta?.description),
    image: image ? [new URL(image, home).toString()] : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt,
    author: authors ? authors.map((name) => ({ '@type': 'Person', name })) : site,
    publisher: site,
    mainEntityOfPage: url,
    url,
    inLanguage: 'da-DK',
  }
}
