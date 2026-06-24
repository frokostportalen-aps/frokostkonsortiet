import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getTenantBySlug } from '@/utilities/getTenant'
import { getServerSideURL, getTenantServerURL } from '@/utilities/getURL'

type Args = {
  children: React.ReactNode
  params: Promise<{ tenant: string }>
}

export default async function TenantLayout({ children, params }: Args) {
  const { tenant } = await params

  return (
    <>
      <Header tenantSlug={tenant} />
      {children}
      <Footer tenantSlug={tenant} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenantBySlug(tenantSlug)

  return {
    metadataBase: new URL(tenant ? getTenantServerURL(tenant) : getServerSideURL()),
    title: tenant?.name ? { default: tenant.name, template: `%s | ${tenant.name}` } : undefined,
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
