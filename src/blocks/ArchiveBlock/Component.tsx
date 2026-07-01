import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { listPostsByCategory } from '@/data/tenantContent'

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
    populateBy,
    selectedDocs,
    tenantSlug,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  // Only fetch when scoped to a site — never fall back to an unscoped query,
  // which would aggregate every kitchen's posts (ADR-0001's leak risk).
  if (populateBy === 'collection' && tenantSlug) {
    const flattenedCategories = categories?.map((category) =>
      typeof category === 'object' ? category.id : category,
    )

    posts = await listPostsByCategory({ tenantSlug, categoryIds: flattenedCategories, limit })
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
