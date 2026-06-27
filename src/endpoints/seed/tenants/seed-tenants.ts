import type { File, Payload } from 'payload'

import { heading, p, richText } from './lexical'
import { TENANTS, type SeedTenant } from './seed-data'

const ctx = { disableRevalidate: true }
const PORT = 3000

// Cross-site links point at another tenant's own domain (locally on :3000).
const urlForDomain = (domain: string) =>
  domain.includes('localhost') ? `http://${domain}:${PORT}/` : `https://${domain}/`

const mainTenant = TENANTS.find((t) => t.isMain)!

// Used when a configured image URL can't be fetched.
const FALLBACK_IMAGE =
  'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp'

/** Fetch a configured image URL, falling back to a bundled placeholder. */
async function fetchImage(url: string, baseName: string): Promise<File> {
  for (const candidate of [url, FALLBACK_IMAGE]) {
    try {
      const res = await fetch(candidate, { method: 'GET' })
      if (!res.ok) continue
      const data = await res.arrayBuffer()
      if (!data.byteLength) continue
      const mimetype = res.headers.get('content-type')?.split(';')[0] || 'image/jpeg'
      const ext = mimetype.split('/')[1] || 'jpg'
      return {
        name: `${baseName}.${ext}`,
        data: Buffer.from(data),
        mimetype,
        size: data.byteLength,
      }
    } catch {
      // try the fallback
    }
  }
  throw new Error(`Could not fetch image: ${url}`)
}

const customLink = (label: string, url: string, appearance: 'default' | 'outline' = 'default') => ({
  link: { type: 'custom', appearance, label, url },
})

// ── page builders ──────────────────────────────────────────────────────────

const homePage = (t: SeedTenant, tenantID: string, heroMedia: string, blockMedia: string) => ({
  title: `${t.name} – frokost`,
  slug: 'home',
  _status: 'published',
  tenant: tenantID,
  hero: {
    type: 'highImpact',
    media: heroMedia,
    richText: richText(heading('h1', t.tagline), p(t.intro)),
    links: [customLink('Om os', '/om-os'), customLink('Nyheder', '/posts', 'outline')],
  },
  layout: [
    {
      blockType: 'content',
      blockName: 'Intro',
      columns: [
        { size: 'full', richText: richText(heading('h2', `Velkommen hos ${t.name}`)) },
        ...t.highlights.map((h) => ({
          size: 'oneThird',
          enableLink: false,
          richText: richText(heading('h3', h.heading), p(h.body)),
        })),
      ],
    },
    { blockType: 'mediaBlock', blockName: 'Billede', media: blockMedia },
    {
      blockType: 'archive',
      blockName: 'Nyheder',
      categories: [],
      introContent: richText(
        heading('h3', 'Seneste nyt'),
        p('Læs med, når vi deler historier, sæsoner og smage fra køkkenet.'),
      ),
      populateBy: 'collection',
      relationTo: 'posts',
    },
    {
      blockType: 'cta',
      blockName: 'CTA',
      links: [customLink('Kontakt os', '/om-os')],
      richText: richText(heading('h3', t.cta.heading), p(t.cta.body)),
    },
  ],
  meta: { title: t.name, description: t.intro, image: heroMedia },
})

const aboutPage = (t: SeedTenant, tenantID: string, heroMedia: string, blockMedia: string) => ({
  title: `Om ${t.name}`,
  slug: 'om-os',
  _status: 'published',
  tenant: tenantID,
  hero: {
    type: 'mediumImpact',
    media: heroMedia,
    richText: richText(heading('h1', `Om ${t.name}`), p(t.about.lead)),
  },
  layout: [
    {
      blockType: 'content',
      blockName: 'Om os',
      columns: [
        {
          size: 'full',
          richText: richText(
            ...t.about.sections.flatMap((s) => [
              ...(s.heading ? [heading('h2', s.heading)] : []),
              ...s.paragraphs.map(p),
            ]),
          ),
        },
      ],
    },
    { blockType: 'mediaBlock', blockName: 'Billede', media: blockMedia },
  ],
  meta: { title: `Om ${t.name}`, description: t.about.lead, image: heroMedia },
})

const postDoc = (
  t: SeedTenant,
  tenantID: string,
  authorID: string,
  heroMedia: string,
  post: SeedTenant['posts'][number],
) => ({
  title: post.title,
  slug: post.slug,
  _status: 'published',
  tenant: tenantID,
  authors: [authorID],
  heroImage: heroMedia,
  content: richText(
    heading('h2', post.description),
    ...post.sections.flatMap((s) => [
      ...(s.heading ? [heading('h2', s.heading)] : []),
      ...s.paragraphs.map(p),
    ]),
  ),
  meta: { title: post.title, description: post.description, image: heroMedia },
})

// ── engine ───────────────────────────────────────────────────────────────────

export async function seedTenants(payload: Payload): Promise<void> {
  // A super-admin to log in with and to author the posts.
  let admin = (
    await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@example.com' } },
      limit: 1,
      pagination: false,
    })
  ).docs[0]
  if (!admin) {
    admin = await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'password',
        roles: ['super-admin'],
      } as never,
    })
    payload.logger.info('✓ super-admin: admin@example.com / password')
  }

  for (const t of TENANTS) {
    const domains = t.domains.map((domain) => ({ domain }))

    // Upsert tenant.
    const existingTenant = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: t.slug } },
      limit: 1,
      pagination: false,
    })
    const tenant =
      existingTenant.docs[0] ??
      (await payload.create({
        collection: 'tenants',
        context: ctx,
        data: { name: t.name, slug: t.slug, isMain: t.isMain, domains },
      }))
    if (existingTenant.docs[0]) {
      await payload.update({
        collection: 'tenants',
        id: tenant.id,
        context: ctx,
        data: { name: t.name, isMain: t.isMain, domains },
      })
    }
    const tenantID = tenant.id as string

    // Clear this tenant's content so re-running yields fresh pages.
    for (const collection of ['posts', 'pages', 'media'] as const) {
      await payload.delete({
        collection,
        where: { tenant: { equals: tenantID } },
        context: ctx,
      })
    }

    // Media (hero + a second image for the media blocks).
    const heroFile = await fetchImage(t.images.hero, `${t.slug}-hero`)
    const blockFile = await fetchImage(t.images.block, `${t.slug}-block`)
    const heroMedia = await payload.create({
      collection: 'media',
      context: ctx,
      data: { alt: `${t.name} – stemningsbillede`, tenant: tenantID } as never,
      file: heroFile,
    })
    const blockMedia = await payload.create({
      collection: 'media',
      context: ctx,
      data: { alt: `${t.name} – fra køkkenet`, tenant: tenantID } as never,
      file: blockFile,
    })

    // Pages.
    await payload.create({
      collection: 'pages',
      context: ctx,
      data: homePage(t, tenantID, heroMedia.id as string, blockMedia.id as string) as never,
    })
    await payload.create({
      collection: 'pages',
      context: ctx,
      data: aboutPage(t, tenantID, heroMedia.id as string, blockMedia.id as string) as never,
    })

    // Posts — each with its own cover image (then cross-link them as related).
    const created: string[] = []
    for (const post of t.posts) {
      const postFile = await fetchImage(post.image, `${t.slug}-${post.slug}`)
      const postMedia = await payload.create({
        collection: 'media',
        context: ctx,
        data: { alt: post.title, tenant: tenantID } as never,
        file: postFile,
      })
      const doc = await payload.create({
        collection: 'posts',
        context: ctx,
        data: postDoc(t, tenantID, admin.id as string, postMedia.id as string, post) as never,
      })
      created.push(doc.id as string)
    }
    for (let i = 0; i < created.length; i++) {
      await payload.update({
        collection: 'posts',
        id: created[i],
        context: ctx,
        data: { relatedPosts: created.filter((_, j) => j !== i) } as never,
      })
    }

    // Header menu: the main site links out to every kitchen; each kitchen links
    // back to the main site. All sites get Om os + Nyheder.
    const kitchenNavItems = TENANTS.filter((k) => !k.isMain).map((k) => ({
      link: { type: 'custom', label: k.name, url: urlForDomain(k.domains[0]), newTab: false },
    }))
    const headerNavItems = t.isMain
      ? [
          { link: { type: 'custom', label: 'Forsiden', url: '/' } },
          { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
          { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
          ...kitchenNavItems,
        ]
      : [
          {
            link: { type: 'custom', label: mainTenant.name, url: urlForDomain(mainTenant.domains[0]) },
          },
          { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
          { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
        ]
    const footerNavItems = [
      { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
      { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
    ]

    await upsertNav(payload, 'header', t.slug, tenantID, headerNavItems)
    await upsertNav(payload, 'footer', t.slug, tenantID, footerNavItems)

    payload.logger.info(`✓ ${t.slug}: ${t.posts.length} indlæg, 2 sider → ${t.domains.join(', ')}`)
  }
}

async function upsertNav(
  payload: Payload,
  collection: 'header' | 'footer',
  tenantSlug: string,
  tenantID: string,
  navItems: unknown[],
) {
  const existing = await payload.find({
    collection,
    where: { 'tenant.slug': { equals: tenantSlug } },
    limit: 1,
    pagination: false,
  })
  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      context: ctx,
      data: { navItems } as never,
    })
  } else {
    await payload.create({
      collection,
      context: ctx,
      data: { tenant: tenantID, navItems } as never,
    })
  }
}
