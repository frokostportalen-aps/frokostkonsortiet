import type { CollectionConfig } from 'payload'

import { createByTenant, mutateByTenant } from '@/access/byTenant'
import { revalidateBrand } from './hooks/revalidateBrand'

/**
 * A tenant-scoped global (one document per tenant, enforced by the multi-tenant
 * plugin's `isGlobal` option) holding a site's own identity: its logo, an
 * optional light-on-dark variant, a favicon, and the standing line its pages
 * carry above their headings. Kept separate
 * from Header (navigation) and from the code-based theme (colours/typography),
 * so a site's own editors manage what is theirs while the design system stays
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
    {
      name: 'tagline',
      type: 'text',
      label: 'Slogan',
      admin: {
        description:
          'Den korte linje over overskriften på sitets sider – fx "Siden 1980 · sæsonens køkken". Står feltet tomt, bruges sitets standardlinje fra temaet.',
      },
    },
    {
      name: 'organization',
      type: 'group',
      label: 'Virksomhedsoplysninger',
      admin: {
        description:
          'Vises ikke på sitet, men fortæller Google (og AI-søgninger) hvem virksomheden er, via structured data på forsiden. Udfyld det, der er relevant – tomme felter udelades.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'telephone', type: 'text', label: 'Telefon' },
            { name: 'email', type: 'email', label: 'E-mail' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'streetAddress', type: 'text', label: 'Adresse' },
            { name: 'postalCode', type: 'text', label: 'Postnr.' },
            { name: 'addressLocality', type: 'text', label: 'By' },
          ],
        },
        {
          name: 'areaServed',
          type: 'text',
          label: 'Leveringsområde',
          admin: {
            description: 'Hvor I leverer, fx "Storkøbenhavn" eller "Aarhus og omegn".',
          },
        },
        {
          name: 'sameAs',
          type: 'array',
          label: 'Profiler på andre sites',
          labels: { singular: 'Profil', plural: 'Profiler' },
          admin: {
            description: 'Fulde links til fx LinkedIn, Facebook og Instagram.',
          },
          fields: [{ name: 'url', type: 'text', label: 'URL', required: true }],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateBrand],
  },
}
