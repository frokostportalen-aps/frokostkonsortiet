import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ArrowLink } from '@/components/ArrowLink'

import { CollectionArchive } from '@/components/CollectionArchive'
import { getTenantPostsWhere } from '@/utilities/tenantPostsFilter'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    tenantSlug?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    linkLabel,
    linkUrl,
    populateBy,
    selectedDocs,
    tenantSlug,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    // Scope to the current site (the main tenant aggregates across kitchens).
    const tenantWhere = tenantSlug ? await getTenantPostsWhere(tenantSlug) : {}

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      where: {
        and: [
          tenantWhere,
          ...(flattenedCategories && flattenedCategories.length > 0
            ? [{ categories: { in: flattenedCategories } }]
            : []),
        ],
      },
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div id={`block-${id}`}>
      {/* The link fields work with or without an intro — an editor filling
          only linkLabel/linkUrl still gets the "see all" link. */}
      {(introContent || linkLabel || linkUrl) && (
        <div className="container mb-10 flex flex-wrap items-end justify-between gap-4">
          {introContent && (
            <RichText
              className="ms-0 max-w-[48rem] [&_h3]:text-3xl [&_h3]:font-semibold [&_h3]:tracking-tight md:[&_h3]:text-4xl [&_p]:mt-2 [&_p]:text-muted-foreground"
              data={introContent}
              enableGutter={false}
            />
          )}
          <ArrowLink className={introContent ? undefined : 'ms-auto'} href={linkUrl || '/posts'}>
            {linkLabel || 'Alle nyheder'}
          </ArrowLink>
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
