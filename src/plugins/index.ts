import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL, getTenantServerURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Frokost Konsortiet` : 'Frokost Konsortiet'
}

const generateURL: GenerateURL<Post | Page> = ({ collectionConfig, doc }) => {
  // When the tenant relationship is populated, build the canonical URL on the
  // site's own domain; otherwise fall back to the shared server URL.
  const tenant = (doc as { tenant?: unknown })?.tenant
  const base =
    tenant && typeof tenant === 'object' ? getTenantServerURL(tenant as never) : getServerSideURL()
  const prefix = collectionConfig?.slug === 'posts' ? '/posts' : ''

  return doc?.slug ? `${base}${prefix}/${doc.slug}` : base
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // Added last so collections injected by the plugins above (redirects, forms,
  // search) already exist and receive the tenant field. header/footer are
  // marked `isGlobal` so each tenant gets exactly one document.
  multiTenantPlugin({
    collections: {
      pages: {},
      posts: {},
      categories: {},
      media: {},
      header: { isGlobal: true },
      footer: { isGlobal: true },
      redirects: {},
      forms: {},
      search: {},
    },
    tenantsSlug: 'tenants',
    userHasAccessToAllTenants: (user) => isSuperAdmin(user),
  }),
]
