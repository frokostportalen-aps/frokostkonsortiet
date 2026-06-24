import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getTenantFromHost } from '@/utilities/getTenantFromHost'
import { getTenantServerURL } from '@/utilities/getURL'

const getPagesSitemap = (tenantSlug: string, siteUrl: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const results = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          and: [{ _status: { equals: 'published' } }, { 'tenant.slug': { equals: tenantSlug } }],
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      const dateFallback = new Date().toISOString()

      const defaultSitemap = [
        { loc: `${siteUrl}/search`, lastmod: dateFallback },
        { loc: `${siteUrl}/posts`, lastmod: dateFallback },
      ]

      const sitemap = results.docs
        ? results.docs
            .filter((page) => Boolean(page?.slug))
            .map((page) => ({
              loc: page?.slug === 'home' ? `${siteUrl}/` : `${siteUrl}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }))
        : []

      return [...defaultSitemap, ...sitemap]
    },
    [`pages-sitemap-${tenantSlug}`],
    {
      tags: [`pages-sitemap-${tenantSlug}`],
    },
  )

export async function GET() {
  const tenant = await getTenantFromHost()
  if (!tenant?.slug) return getServerSideSitemap([])

  const siteUrl = getTenantServerURL(tenant)
  const sitemap = await getPagesSitemap(tenant.slug, siteUrl)()

  return getServerSideSitemap(sitemap)
}
