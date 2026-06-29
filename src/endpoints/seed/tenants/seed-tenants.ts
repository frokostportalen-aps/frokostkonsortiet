import type { File, Payload } from 'payload'

import { heading, list, p, richText } from './lexical'
import {
  CONSORTIUM_PAGES,
  kitchenPages,
  TENANTS,
  type PageSection,
  type SeedPage,
  type SeedTenant,
} from './seed-data'

const ctx = { disableRevalidate: true }
const PORT = 3000

// Cross-site links point at another tenant's own domain (locally on :3000).
const urlForDomain = (domain: string) =>
  domain.includes('localhost') ? `http://${domain}:${PORT}/` : `https://${domain}/`

/**
 * Which of a tenant's domains the cross-site menu should link to. A local seed
 * links to the `*.localhost` dev domains; a production seed sets
 * `SEED_LINK_DOMAIN=public` to link to the public `new.*` domains instead
 * (falling back to the first non-localhost domain, then the first domain).
 */
const preferPublicLinks = process.env.SEED_LINK_DOMAIN === 'public'
const linkDomain = (domains: string[]): string =>
  preferPublicLinks
    ? (domains.find((d) => d.startsWith('new.')) ??
      domains.find((d) => !d.includes('localhost')) ??
      domains[0])
    : (domains.find((d) => d.includes('localhost')) ?? domains[0])

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
    // One media+text split per feature, alternating the image side (and image)
    // down the page.
    ...t.features.map((f, i) => ({
      blockType: 'mediaContent',
      blockName: `Billede + tekst ${i + 1}`,
      media: i % 2 === 0 ? blockMedia : heroMedia,
      imagePosition: i % 2 === 0 ? 'left' : 'right',
      richText: richText(heading('h2', f.heading), p(f.body)),
      links: [customLink('Om os', '/om-os')],
    })),
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
    // A standalone split (separated by the archive above and CTA below, so it
    // keeps all four rounded corners rather than merging).
    {
      blockType: 'mediaContent',
      blockName: 'Billede + tekst (spotlight)',
      media: blockMedia,
      imagePosition: 'right',
      richText: richText(heading('h2', t.spotlight.heading), p(t.spotlight.body)),
      links: [customLink('Om os', '/om-os')],
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

// A column inside a Content block.
const column = (size: string, ...nodes: Parameters<typeof richText>) => ({
  size,
  enableLink: false,
  richText: richText(...nodes),
})

/** Optional full-width heading + intro column shared by several section kinds. */
const headerColumns = (heading_?: string, intro?: string) =>
  heading_ || intro
    ? [column('full', ...(heading_ ? [heading('h2', heading_)] : []), ...(intro ? [p(intro)] : []))]
    : []

/** Turn a single page section into one Content block. */
const sectionToBlock = (s: PageSection) => {
  switch (s.kind) {
    case 'text':
      return {
        blockType: 'content',
        blockName: s.heading ?? 'Tekst',
        columns: [
          column(
            'full',
            ...(s.heading ? [heading('h2', s.heading)] : []),
            ...(s.paragraphs ?? []).map(p),
            ...(s.bullets ? [list(s.bullets)] : []),
          ),
        ],
      }
    case 'columns':
      return {
        blockType: 'content',
        blockName: s.heading ?? 'Kolonner',
        columns: [
          ...headerColumns(s.heading, s.intro),
          ...s.columns.map((c) => column('oneThird', heading('h3', c.heading), p(c.body))),
        ],
      }
    case 'pricing':
      return {
        blockType: 'content',
        blockName: s.heading ?? 'Priser',
        columns: [
          ...headerColumns(s.heading, s.intro),
          ...s.items.map((it) =>
            column(
              'oneThird',
              heading('h3', it.name),
              ...(it.price ? [heading('h4', it.price)] : []),
              list(it.lines),
            ),
          ),
          ...(s.note ? [column('full', p(s.note))] : []),
        ],
      }
    case 'faq':
      return {
        blockType: 'faq',
        blockName: s.heading ?? 'FAQ',
        ...(s.heading ? { heading: s.heading } : {}),
        items: s.items.map((qa) => ({ question: qa.q, answer: richText(p(qa.a)) })),
      }
    case 'partners':
      return {
        blockType: 'content',
        blockName: s.heading ?? 'Partnere',
        columns: [
          ...headerColumns(s.heading, s.intro),
          ...TENANTS.filter((k) => !k.isMain).map((k) => ({
            size: 'oneThird',
            enableLink: true,
            link: {
              type: 'custom',
              appearance: 'default',
              label: `Besøg ${k.name}`,
              url: urlForDomain(linkDomain(k.domains)),
              newTab: false,
            },
            richText: richText(heading('h3', k.name), p(k.tagline)),
          })),
        ],
      }
  }
}

/** Build a standalone content page (Services, FAQ, Catering, …). */
const contentPage = (page: SeedPage, tenantID: string, heroMedia: string) => ({
  title: page.title,
  slug: page.slug,
  _status: 'published',
  tenant: tenantID,
  hero: {
    type: 'mediumImpact',
    media: heroMedia,
    richText: richText(
      heading('h1', page.hero.heading),
      ...(page.hero.intro ? [p(page.hero.intro)] : []),
    ),
  },
  layout: [
    ...page.sections.map(sectionToBlock),
    ...(page.cta
      ? [
          {
            blockType: 'cta',
            blockName: 'CTA',
            links: [customLink(page.cta.linkLabel ?? 'Kontakt os', page.cta.linkUrl ?? '/om-os')],
            richText: richText(heading('h3', page.cta.heading), p(page.cta.body)),
          },
        ]
      : []),
  ],
  meta: {
    title: page.title,
    description: page.metaDescription ?? page.hero.intro ?? page.hero.heading,
    image: heroMedia,
  },
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

    // The mockup pages: consortium nav for the main site, the kitchen page set
    // (in the tenant's own voice) for every kitchen.
    const extraPages = t.isMain ? CONSORTIUM_PAGES : kitchenPages(t.name)
    for (const page of extraPages) {
      await payload.create({
        collection: 'pages',
        context: ctx,
        data: contentPage(page, tenantID, heroMedia.id as string) as never,
      })
    }

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

    // Header menu mirrors the mockup. The main site shows the consortium nav;
    // each kitchen shows its service nav plus a link back to the consortium and
    // the customer login. (Cross-site links between kitchens live on the main
    // site's Partnere page.)
    const headerNavItems = t.isMain
      ? [
          { type: 'link', link: { type: 'custom', label: 'Services', url: '/services' } },
          { type: 'link', link: { type: 'custom', label: 'FrokostPortalen', url: '/frokostportalen' } },
          {
            // Partnere is a dropdown: the overview page plus a cross-site link to
            // each kitchen (env-aware via urlForDomain/linkDomain).
            type: 'dropdown',
            label: 'Partnere',
            subItems: [
              { link: { type: 'custom', label: 'Overblik', url: '/partnere' } },
              ...TENANTS.filter((k) => !k.isMain).map((k) => ({
                link: { type: 'custom', label: k.name, url: urlForDomain(linkDomain(k.domains)) },
              })),
            ],
          },
          { type: 'link', link: { type: 'custom', label: 'Netværk', url: '/netvaerk' } },
          { type: 'link', link: { type: 'custom', label: 'Om os', url: '/om-os' } },
          { type: 'link', link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
        ]
      : [
          { type: 'link', link: { type: 'custom', label: 'Frokost ud af huset', url: '/frokost-ud-af-huset' } },
          { type: 'link', link: { type: 'custom', label: 'Kantine', url: '/kantine' } },
          {
            // A dropdown: just a label + sub items, no unused URL. The Catering
            // overview is the first choice so the page stays reachable.
            type: 'dropdown',
            label: 'Catering',
            subItems: [
              { link: { type: 'custom', label: 'Overblik', url: '/catering' } },
              { link: { type: 'custom', label: 'Mødeforplejning', url: '/moedeforplejning' } },
              { link: { type: 'custom', label: 'Frugtordning', url: '/frugtordning' } },
              { link: { type: 'custom', label: 'Drikkevarer', url: '/drikkevarer' } },
            ],
          },
          { type: 'link', link: { type: 'custom', label: 'Bæredygtighed', url: '/baeredygtighed' } },
          { type: 'link', link: { type: 'custom', label: 'Nem bestilling & tilretning', url: '/kundeportal' } },
          { type: 'link', link: { type: 'custom', label: 'FAQ', url: '/faq' } },
        ]
    const footerNavItems = t.isMain
      ? [
          { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
          { link: { type: 'custom', label: 'Partnere', url: '/partnere' } },
          { link: { type: 'custom', label: 'Netværk', url: '/netvaerk' } },
          { link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
          { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
        ]
      : [
          {
            link: { type: 'custom', label: mainTenant.name, url: urlForDomain(linkDomain(mainTenant.domains)) },
          },
          { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
          { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
          { link: { type: 'custom', label: 'Kundelogin', url: 'https://min.frokostportal.dk', newTab: true } },
          { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
        ]

    await upsertNav(payload, 'header', t.slug, tenantID, headerNavItems)
    await upsertNav(payload, 'footer', t.slug, tenantID, footerNavItems)

    payload.logger.info(
      `✓ ${t.slug}: ${t.posts.length} indlæg, ${2 + extraPages.length} sider → ${t.domains.join(', ')}`,
    )
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
