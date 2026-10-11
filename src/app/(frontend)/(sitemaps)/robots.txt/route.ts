import { getTenantFromHost } from '@/utilities/getTenantFromHost'
import { getTenantServerURL, isTenantIndexable } from '@/utilities/getURL'

/**
 * Per-site robots.txt. One deployment serves every site, so this can't be a
 * static file: each host gets rules and sitemaps for its own tenant. A site
 * without a primary domain isn't live yet: it lists no sitemap, but stays
 * crawlable — a `Disallow: /` would hide the pages' noindex from Google and
 * leave already-indexed URLs stuck in the index.
 */
export async function GET() {
  const tenant = await getTenantFromHost()

  const lines = ['User-agent: *', 'Disallow: /admin/', '']
  if (tenant && isTenantIndexable(tenant)) {
    lines.push(`Sitemap: ${getTenantServerURL(tenant)}/sitemap.xml`, '')
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
