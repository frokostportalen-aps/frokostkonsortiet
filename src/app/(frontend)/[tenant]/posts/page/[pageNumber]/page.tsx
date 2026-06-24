import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { getAllTenantSlugs, getTenantBySlug } from '@/utilities/getTenant'
import { getTenantPostsWhere } from '@/utilities/tenantPostsFilter'

export const revalidate = 600

type Args = {
  params: Promise<{
    tenant: string
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { tenant, pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    where: await getTenantPostsWhere(tenant),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { tenant, pageNumber } = await paramsPromise
  const tenantDoc = await getTenantBySlug(tenant)
  return {
    title: `${tenantDoc?.name ?? 'Frokost Konsortiet'} Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const slugs = await getAllTenantSlugs()

  const params: { tenant: string; pageNumber: string }[] = []

  for (const tenant of slugs) {
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
      where: await getTenantPostsWhere(tenant),
    })

    const totalPages = Math.ceil(totalDocs / 10)

    for (let i = 1; i <= totalPages; i++) {
      params.push({ tenant, pageNumber: String(i) })
    }
  }

  return params
}
