import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  /** Which collection the doc came from — drives the og:url path prefix. */
  collection?: 'pages' | 'posts'
}): Promise<Metadata> => {
  const { doc, collection } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const siteName =
    (doc?.tenant && typeof doc.tenant === 'object' && doc.tenant.name) || 'Frokost Konsortiet'

  // The tenant layout defines a `%s | <site>` title template, so plain titles
  // get the site name appended automatically. When the editor already wrote
  // the site name into the meta title (e.g. "Smagssans – frokostordning …"),
  // opt out with `absolute` to avoid "Smagssans … | Smagssans".
  const metaTitle = doc?.meta?.title
  // The site name only counts as branding when the title *starts or ends*
  // with it ("Om Fra Jorden", "Smagssans – frokostordning …"). A title that
  // merely mentions the words mid-sentence ("Alt godt fra jorden i september")
  // still gets the "| <site>" suffix.
  const titleLower = metaTitle?.toLowerCase() ?? ''
  const siteNameLower = siteName.toLowerCase()
  const hasSiteName =
    !!metaTitle && (titleLower.startsWith(siteNameLower) || titleLower.endsWith(siteNameLower))
  const title: Metadata['title'] = metaTitle
    ? hasSiteName
      ? { absolute: metaTitle }
      : metaTitle
    : { absolute: siteName }
  const ogTitle = metaTitle ? (hasSiteName ? metaTitle : `${metaTitle} | ${siteName}`) : siteName

  // og:url must be the document's own path (resolved against metadataBase) —
  // posts live under /posts/, pages at the root, the front page at '/'.
  // Prefer the caller's explicit collection: the `heroImage` sniff fails for
  // posts without a hero image (mongoose omits unset fields entirely).
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  const isPost = collection ? collection === 'posts' : !!doc && 'heroImage' in doc
  const ogPath = !slug || slug === 'home' ? '/' : `${isPost ? '/posts' : ''}/${slug}`

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      siteName,
      title: ogTitle,
      url: ogPath,
    }),
    title,
  }
}
