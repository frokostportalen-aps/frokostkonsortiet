import { getServerSideSitemapIndex } from 'next-sitemap'

import { getTenantFromHost } from '@/utilities/getTenantFromHost'
import { getTenantServerURL, isTenantIndexable } from '@/utilities/getURL'

/** Per-site sitemap index pointing at that site's own page and post sitemaps. */
export async function GET() {
  const tenant = await getTenantFromHost()
  if (!tenant || !isTenantIndexable(tenant)) return getServerSideSitemapIndex([])

  const siteUrl = getTenantServerURL(tenant)
  return getServerSideSitemapIndex([`${siteUrl}/pages-sitemap.xml`, `${siteUrl}/posts-sitemap.xml`])
}
