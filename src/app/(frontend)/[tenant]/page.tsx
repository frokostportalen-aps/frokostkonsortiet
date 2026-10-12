import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { resolveTenantBrand } from '@/themes/resolveTenantBrand'
import { getAllTenantSlugs, getTenantBySlug } from '@/utilities/getTenant'
import { buildHomeGraph } from '@/utilities/structuredData'
import PageTemplate, { generateMetadata } from './[slug]/page'

// ISR for the tenant home page (route config must be re-declared per segment;
// it is not inherited from the re-exported [slug] template). Keeps the front
// page in sync with content changes without a redeploy.
export const revalidate = 600

// The tenant home page renders the `home` page document for that site.
export async function generateStaticParams() {
  const slugs = await getAllTenantSlugs()
  return slugs.map((tenant) => ({ tenant }))
}

type Args = {
  params: Promise<{ tenant: string }>
}

// The front page also tells search engines who the site belongs to. Both
// lookups are cached alongside the layout's and the template's own calls.
export default async function HomePage({ params }: Args) {
  const { tenant } = await params
  const [tenantDoc, brand] = await Promise.all([
    getTenantBySlug(tenant),
    resolveTenantBrand(tenant),
  ])

  return (
    <>
      {tenantDoc && (
        <JsonLd
          data={buildHomeGraph({
            tenant: tenantDoc,
            logo: brand.logo.src,
            organization: brand.organization,
          })}
        />
      )}
      <PageTemplate params={params} />
    </>
  )
}

export { generateMetadata }
