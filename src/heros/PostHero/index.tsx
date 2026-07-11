import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateDa } from '@/utilities/formatDateTime'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  // Seeded posts carry no authors (a CMS account name is not a byline), so
  // this only renders when an editor deliberately credits real people.
  const authors = formatAuthors(populatedAuthors ?? []) ?? ''
  const hasAuthors = authors !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      {/* The photo — its own positioned layer, so `fill` has a valid parent. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} size="100vw" />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-2/3 bg-linear-to-t from-black/85 to-transparent" />
      </div>

      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-10">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          {Array.isArray(categories) && categories.length > 0 && (
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const isLast = index === categories.length - 1
                  return (
                    <React.Fragment key={index}>
                      {category.title || 'Kategori'}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          <h1 className="mb-6 max-w-[44rem] text-balance text-4xl font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="flex flex-col gap-2 text-sm text-white/85 md:flex-row md:items-center md:gap-3">
            {hasAuthors && <p className="font-medium">Af {authors}</p>}
            {hasAuthors && publishedAt && (
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-white/50 md:block" />
            )}
            {publishedAt && <time dateTime={publishedAt}>{formatDateDa(publishedAt)}</time>}
          </div>
        </div>
      </div>

      {/* Height spacer — photo and gradient are absolute. */}
      <div aria-hidden="true" className="min-h-[70vh]" />
    </div>
  )
}
