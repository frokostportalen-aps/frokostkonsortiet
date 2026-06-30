import { getAllTenantSlugs } from '@/utilities/getTenant'
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

export default PageTemplate

export { generateMetadata }
