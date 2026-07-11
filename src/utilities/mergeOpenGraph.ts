import type { Metadata } from 'next'

// Bare family-wide defaults. Everything tenant- or page-specific (siteName,
// title, description, images) is passed in by the caller — the tenant layout
// and `generateMeta` — so no single site's copy leaks onto the others.
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Frokost Konsortiet',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
  }
}
