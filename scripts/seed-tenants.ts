import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * Seeds a few tenants with `.localhost` domains plus minimal, visually distinct
 * content so the multi-tenant routing can be exercised locally / in Docker.
 *
 *   pnpm seed:tenants
 *
 * Idempotent: re-running updates domains and skips content that already exists.
 */
const TENANTS = [
  {
    name: 'Frokost Konsortiet',
    slug: 'frokost-konsortiet',
    isMain: true,
    // Branded domain first (used to build cross-site links); `localhost` also
    // maps here as a convenient default.
    domains: ['frokostkonsortiet.localhost', 'localhost'],
  },
  { name: 'Smagssans', slug: 'smagssans', isMain: false, domains: ['smagssans.localhost'] },
  { name: 'Fra Jorden', slug: 'frajorden', isMain: false, domains: ['frajorden.localhost'] },
]

// Cross-site links point at another tenant's own domain. Locally that means
// http://<domain>:3000; real domains get https.
const PORT = 3000
const urlForDomain = (domain: string) =>
  domain.includes('localhost') ? `http://${domain}:${PORT}/` : `https://${domain}/`

const mainTenant = TENANTS.find((t) => t.isMain)!
const kitchens = TENANTS.filter((t) => !t.isMain)

// The "restaurants" menu shown on the main site, one entry per kitchen.
const kitchenNavItems = kitchens.map((k) => ({
  link: { type: 'custom' as const, label: k.name, url: urlForDomain(k.domains[0]), newTab: false },
}))

// Minimal valid Lexical rich-text value.
const richText = (text: string) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
      },
    ],
  },
})

const contentLayout = (text: string) =>
  [
    {
      blockType: 'content' as const,
      columns: [{ size: 'full' as const, richText: richText(text) }],
    },
  ] as never

const run = async () => {
  const payload = await getPayload({ config })
  const ctx = { disableRevalidate: true }

  for (const t of TENANTS) {
    const domains = t.domains.map((domain) => ({ domain }))

    const existing = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: t.slug } },
      limit: 1,
      pagination: false,
    })

    const tenant =
      existing.docs[0] ??
      (await payload.create({
        collection: 'tenants',
        context: ctx,
        data: { name: t.name, slug: t.slug, isMain: t.isMain, domains },
      }))

    if (existing.docs[0]) {
      await payload.update({
        collection: 'tenants',
        id: tenant.id,
        context: ctx,
        data: { name: t.name, isMain: t.isMain, domains },
      })
    }

    const tenantID = tenant.id

    const hasDoc = async (collection: 'header' | 'footer' | 'pages', where: object) =>
      (
        await payload.find({
          collection,
          where: where as never,
          limit: 1,
          pagination: false,
        })
      ).docs.length > 0

    // Header menu: the main site links out to every kitchen; each kitchen
    // links back to the main site.
    const headerNavItems = t.isMain
      ? [
          { link: { type: 'custom', label: 'Forsiden', url: '/' } },
          { link: { type: 'custom', label: 'Posts', url: '/posts' } },
          ...kitchenNavItems,
        ]
      : [
          {
            link: {
              type: 'custom',
              label: mainTenant.name,
              url: urlForDomain(mainTenant.domains[0]),
            },
          },
          { link: { type: 'custom', label: 'Posts', url: '/posts' } },
        ]

    const existingHeader = await payload.find({
      collection: 'header',
      where: { 'tenant.slug': { equals: t.slug } },
      limit: 1,
      pagination: false,
    })
    if (existingHeader.docs[0]) {
      // Update so re-running the seed refreshes the menu (e.g. new kitchens).
      await payload.update({
        collection: 'header',
        id: existingHeader.docs[0].id,
        context: ctx,
        data: { navItems: headerNavItems } as never,
      })
    } else {
      await payload.create({
        collection: 'header',
        context: ctx,
        data: { tenant: tenantID, navItems: headerNavItems } as never,
      })
    }

    if (!(await hasDoc('footer', { 'tenant.slug': { equals: t.slug } }))) {
      await payload.create({
        collection: 'footer',
        context: ctx,
        data: {
          tenant: tenantID,
          navItems: [{ link: { type: 'custom', label: `${t.name} ©`, url: '/' } }],
        } as never,
      })
    }

    const pages: Array<{ title: string; slug: string; body: string }> = [
      { title: `${t.name} Home`, slug: 'home', body: `Welcome to ${t.name} (tenant "${t.slug}").` },
      { title: `About ${t.name}`, slug: 'about', body: `This is the about page for ${t.name}.` },
    ]

    for (const page of pages) {
      const exists = await hasDoc('pages', {
        and: [{ slug: { equals: page.slug } }, { 'tenant.slug': { equals: t.slug } }],
      })
      if (!exists) {
        await payload.create({
          collection: 'pages',
          context: ctx,
          data: {
            title: page.title,
            slug: page.slug,
            _status: 'published',
            tenant: tenantID,
            hero: { type: 'lowImpact', richText: richText(page.title) },
            layout: contentLayout(page.body),
          } as never,
        })
      }
    }

    payload.logger.info(`✓ tenant "${t.slug}" → ${t.domains.join(', ')}`)
  }

  // Ensure a super-admin login exists.
  const users = await payload.find({ collection: 'users', limit: 1, pagination: false })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'password',
        roles: ['super-admin'],
      } as never,
    })
    payload.logger.info('✓ created super-admin: admin@example.com / password')
  }

  payload.logger.info('Done seeding tenants.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
