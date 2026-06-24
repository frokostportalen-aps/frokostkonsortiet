import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, tenantSlug?: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(tenantSlug ? [{ 'tenant.slug': { equals: tenantSlug } }] : []),
      ],
    },
  })

  return page.docs[0]
}

/**
 * Returns an unstable_cache function tagged per collection + tenant + slug so
 * documents with the same slug on different sites do not collide in the cache.
 */
export const getCachedDocument = (collection: Collection, slug: string, tenantSlug?: string) =>
  unstable_cache(
    async () => getDocument(collection, slug, tenantSlug),
    [collection, tenantSlug ?? 'all', slug],
    {
      tags: [`${collection}_${tenantSlug ?? 'all'}_${slug}`],
    },
  )
