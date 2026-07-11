'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg',
        className,
      )}
      ref={card.ref}
    >
      {/* A fixed 3:2 frame keeps rows level regardless of the photo's own
          ratio; the slow zoom rewards the hover without shouting. */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        {metaImage && typeof metaImage !== 'string' ? (
          <Media
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            resource={metaImage}
            size="33vw"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 bg-secondary" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {showCategories && hasCategories && (
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
            {/* Stretched link: the whole card is one semantic click target, so
                middle-click/long-press work everywhere the hover promises. */}
            <Link href={href} ref={link.ref} className="after:absolute after:inset-0">
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
