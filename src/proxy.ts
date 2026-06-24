import { NextResponse, type NextRequest } from 'next/server'

import { resolveTenantSlug, type TenantDomainData } from '@/utilities/tenantDomains'

const EMPTY: TenantDomainData = { map: {}, mainSlug: null }

/**
 * Resolves the incoming host to a tenant and rewrites the request to an internal
 * `/{tenantSlug}/...` path so the `app/(frontend)/[tenant]` route tree (and the
 * Next Full Route Cache) become tenant-aware. The tenant slug is also exposed on
 * the `x-tenant` request header as a convenience for server components.
 */
export default async function proxy(req: NextRequest) {
  const host = req.headers.get('host') || ''

  let data: TenantDomainData = EMPTY
  try {
    const res = await fetch(new URL('/api/tenant-domains', req.url), {
      next: { tags: ['tenant-domains'] },
    })
    if (res.ok) {
      data = (await res.json()) as TenantDomainData
    }
  } catch {
    // If the lookup fails, fall through with no mapping and serve as-is.
  }

  // If the path is already tenant-scoped (e.g. a same-origin live-preview
  // redirect to `/{tenantSlug}/...`), don't prefix again — just expose the
  // tenant on the header and pass through. This keeps the middleware idempotent.
  const knownSlugs = new Set<string>([
    ...Object.values(data.map),
    ...(data.mainSlug ? [data.mainSlug] : []),
  ])
  const firstSegment = req.nextUrl.pathname.split('/')[1]
  if (firstSegment && knownSlugs.has(firstSegment)) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-tenant', firstSegment)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const tenantSlug = resolveTenantSlug(host, data)

  // No tenant could be resolved (no main tenant configured yet) — pass through.
  if (!tenantSlug) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${tenantSlug}${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-tenant', tenantSlug)

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  })
}

export const config = {
  // Exclude Payload (`/api`, `/admin`), Next internals (`/_next`), the preview
  // & seed handlers (`/next/...`), and any file with an extension (favicon,
  // sitemaps, images) — sitemaps resolve their own tenant from the host.
  matcher: ['/((?!api|admin|_next|next/|.*\\..*).*)'],
}
