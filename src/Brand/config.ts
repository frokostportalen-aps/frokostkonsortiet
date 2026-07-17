import type { CollectionConfig } from 'payload'

import { createByTenant, mutateByTenant } from '@/access/byTenant'
import { revalidateBrand } from './hooks/revalidateBrand'

/**
 * A tenant-scoped global (one document per tenant, enforced by the multi-tenant
 * plugin's `isGlobal` option) holding a site's visual identity: its logo, an
 * optional light-on-dark logo variant, and an optional favicon. Kept separate
 * from Header (navigation) and from the code-based theme (colours/typography),
 * so a site's own editors manage the brand assets while the design system stays
 * in code.
 *
 * Every field is optional — a site with nothing uploaded falls back to its text
 * wordmark (from the theme, or the tenant name) and the generated letter-mark
 * favicon. See `resolveTenantBrand`.
 */
export const Brand: CollectionConfig = {
  slug: 'brand',
  access: {
    read: () => true,
    create: createByTenant,
    update: mutateByTenant,
    delete: mutateByTenant,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Firmaets logo (vises i header og footer). Uden logo vises firmanavnet som tekst.',
      },
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (lys variant)',
      admin: {
        description:
          'Lys udgave af logoet, til mørke flader (footer og mørke hero-baggrunde). Uden denne bruges det almindelige logo.',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Fanebladsikon. Brug en kvadratisk PNG/SVG. Uden favicon genereres et bogstavmærke ud fra temaets farver.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBrand],
  },
}
