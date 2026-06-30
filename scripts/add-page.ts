import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'

import { heading, p, richText } from '../src/endpoints/seed/tenants/lexical'
import { upsertPage } from '../src/endpoints/seed/tenants/seed-tenants'

/**
 * Example of adding a single page programmatically — without touching the
 * declarative per-tenant seed data. Reuses the same `upsertPage` helper as the
 * seed engine, so it is additive by default: if a page with this (tenant, slug)
 * already exists it is left untouched. Pass `{ force: true }` to overwrite a
 * single page in place.
 *
 *   pnpm tsx scripts/add-page.ts
 *
 * Edit TENANT_SLUG and the page below, then run it. Safe to run against a live
 * database — it only creates what's missing.
 */
const TENANT_SLUG = 'smagssans'

const findTenantID = async (payload: Payload, slug: string): Promise<string> => {
  const tenant = (
    await payload.find({
      collection: 'tenants',
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
    })
  ).docs[0]
  if (!tenant) throw new Error(`Tenant not found: ${slug}`)
  return tenant.id as string
}

const run = async () => {
  const payload = await getPayload({ config })
  const tenantID = await findTenantID(payload, TENANT_SLUG)

  const page = {
    title: 'Catering',
    slug: 'catering',
    _status: 'published',
    tenant: tenantID,
    hero: {
      type: 'lowImpact',
      richText: richText(heading('h1', 'Catering')),
    },
    layout: [
      {
        blockType: 'content',
        blockName: 'Intro',
        columns: [
          {
            size: 'full',
            enableLink: false,
            richText: richText(
              heading('h2', 'Catering til enhver anledning'),
              p('Vi leverer catering til selskaber, receptioner og mærkedage.'),
            ),
          },
        ],
      },
    ],
    meta: { title: 'Catering', description: 'Catering til enhver anledning.' },
  }

  const { id, created } = await upsertPage(payload, tenantID, page, { force: false })
  payload.logger.info(`${created ? '✓ oprettet' : '• fandtes allerede'}: ${TENANT_SLUG}/${page.slug} (${id})`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
