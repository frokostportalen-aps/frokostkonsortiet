import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getTenantFromHost } from '@/utilities/getTenantFromHost'
import { getTenantServerURL } from '@/utilities/getURL'

const getPostsSitemap = (tenantSlug: string, siteUrl: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const results = await payload.find({
        collection: 'posts',
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

      const sitemap = results.docs
        ? results.docs
            .filter((post) => Boolean(post?.slug))
            .map((post) => ({
              loc: `${siteUrl}/posts/${post?.slug}`,
              lastmod: post.updatedAt || dateFallback,
            }))
        : []

      return sitemap
    },
    [`posts-sitemap-${tenantSlug}`],
    {
      tags: [`posts-sitemap-${tenantSlug}`],
    },
  )

export async function GET() {
  const tenant = await getTenantFromHost()
  if (!tenant?.slug) return getServerSideSitemap([])

  const siteUrl = getTenantServerURL(tenant)
  const sitemap = await getPostsSitemap(tenant.slug, siteUrl)()

  return getServerSideSitemap(sitemap)
}
