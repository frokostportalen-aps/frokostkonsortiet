import { getAllTenantSlugs } from '@/utilities/getTenant'
import PageTemplate, { generateMetadata } from './[slug]/page'

// The tenant home page renders the `home` page document for that site.
export async function generateStaticParams() {
  const slugs = await getAllTenantSlugs()
  return slugs.map((tenant) => ({ tenant }))
}

export default PageTemplate

export { generateMetadata }
