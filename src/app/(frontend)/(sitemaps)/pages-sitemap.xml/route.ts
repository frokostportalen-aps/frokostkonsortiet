import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getTenantFromHost } from '@/utilities/getTenantFromHost'
import { getTenantServerURL, isTenantIndexable } from '@/utilities/getURL'
import { ownedByTenant } from '@/data/tenantScope'

// Only the documents are cached; their URLs are built per request from the
// site's current origin, so a changed primary domain shows up immediately.
const getPublishedPages = (tenantSlug: string) =>
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
          and: [{ _status: { equals: 'published' } }, ownedByTenant(tenantSlug)],
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      return results.docs.filter((page) => Boolean(page?.slug))
    },
    // Distinct key from the old cached URL lists, so none of those is read back as docs.
    [`pages-sitemap-docs-${tenantSlug}`],
    {
      tags: [`pages-sitemap-${tenantSlug}`],
    },
  )

export async function GET() {
  const tenant = await getTenantFromHost()
  // Sites that aren't live yet list nothing (see robots.txt).
  if (!tenant || !isTenantIndexable(tenant)) return getServerSideSitemap([])

  const siteUrl = getTenantServerURL(tenant)
  const pages = await getPublishedPages(tenant.slug)()
  const dateFallback = new Date().toISOString()

  return getServerSideSitemap([
    { loc: `${siteUrl}/search`, lastmod: dateFallback },
    { loc: `${siteUrl}/posts`, lastmod: dateFallback },
    ...pages.map((page) => ({
      loc: page.slug === 'home' ? `${siteUrl}/` : `${siteUrl}/${page.slug}`,
      lastmod: page.updatedAt || dateFallback,
    })),
  ])
}
