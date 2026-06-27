/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  if (!cacheTag) return url

  // The URL may already carry a query string (e.g. `?prefix=…` from the R2
  // storage adapter), so join the cache tag with the right separator instead of
  // always using `?` — a second `?` would corrupt the existing params and break
  // the media route's prefix lookup.
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${cacheTag}`
}
