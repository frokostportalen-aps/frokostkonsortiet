import type { Where } from 'payload'

import { getTenantBySlug } from './getTenant'

/**
 * Builds the `where` clause that scopes posts to a site.
 *
 * The main "Frokost Konsortiet" tenant is an aggregator: it lists and renders
 * posts from every kitchen, so it gets no tenant constraint. Each kitchen site
 * only ever sees its own posts.
 */
export async function getTenantPostsWhere(tenantSlug: string): Promise<Where> {
  const tenant = await getTenantBySlug(tenantSlug)

  if (tenant?.isMain) {
    return {}
  }

  return {
    'tenant.slug': {
      equals: tenantSlug,
    },
  }
}
