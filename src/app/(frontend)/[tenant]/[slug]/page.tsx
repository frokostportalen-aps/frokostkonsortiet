import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getTenantTheme } from '@/themes/tenantThemes'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Statically rendered with ISR: published pages refresh within this window, so
// out-of-band content changes (e.g. a `pnpm seed:tenants:prod` run) appear
// without a redeploy. Draft/live-preview requests bypass the cache and stay
// dynamic.
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    depth: 1,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })

  return (pages.docs ?? [])
    .filter((doc) => doc.slug !== 'home' && doc.tenant && typeof doc.tenant === 'object')
    .map((doc) => ({
      tenant: doc.tenant && typeof doc.tenant === 'object' ? doc.tenant.slug : '',
      slug: doc.slug,
    }))
}

type Args = {
  params: Promise<{
    tenant: string
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { tenant, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    tenantSlug: tenant,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects tenantSlug={tenant} url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound tenantSlug={tenant} url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} heroTheme={getTenantTheme(tenant)?.heroTheme} />
      <RenderBlocks blocks={layout} tenantSlug={tenant} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { tenant, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    tenantSlug: tenant,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, tenantSlug }: { slug: string; tenantSlug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      and: [{ slug: { equals: slug } }, { 'tenant.slug': { equals: tenantSlug } }],
    },
  })

  return result.docs?.[0] || null
})
