import type { Payload } from 'payload'

import { readdir, readFile } from 'fs/promises'
import path from 'path'

import { TENANTS } from './data'
import type { PageContext, SeedDoc, TenantMeta } from './data/types'

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

// ── idempotent upsert helpers ──────────────────────────────────────────────
//
// Every helper is keyed so re-running is safe:
//   - pages/posts on (tenant, slug) — backed by the unique [tenant, slug] index
//   - media on (tenant, filename-prefix)
// Default (force: false) is additive: existing docs are left untouched, so
// editor-written content survives a re-seed. With force: true the doc is
// overwritten (pages/posts updated in place; media replaced), which is how the
// `--force` CLI reset rebuilds a site from the seed data.

type UpsertOpts = { force: boolean }

/** A page/post result: its id plus whether this run created it. */
type UpsertResult = { id: string; created: boolean }

async function findBySlug(
  payload: Payload,
  collection: 'pages' | 'posts',
  tenantID: string,
  slug: string,
) {
  return (
    await payload.find({
      collection,
      where: { and: [{ tenant: { equals: tenantID } }, { slug: { equals: slug } }] },
      limit: 1,
      pagination: false,
    })
  ).docs[0]
}

/**
 * Create a doc if (tenant, slug) is free; with force, overwrite an existing one.
 * `upsertPage`/`upsertPost` are thin wrappers so callers don't pass the slug.
 */
async function upsertDoc(
  payload: Payload,
  collection: 'pages' | 'posts',
  tenantID: string,
  data: SeedDoc,
  { force }: UpsertOpts,
): Promise<UpsertResult> {
  const existing = await findBySlug(payload, collection, tenantID, data.slug)
  if (existing) {
    if (force) {
      await payload.update({ collection, id: existing.id, context: ctx, data: data as never })
    }
    return { id: existing.id as string, created: false }
  }
  const doc = await payload.create({ collection, context: ctx, data: data as never })
  return { id: doc.id as string, created: true }
}

export const upsertPage = (payload: Payload, tenantID: string, data: SeedDoc, opts: UpsertOpts) =>
  upsertDoc(payload, 'pages', tenantID, data, opts)

export const upsertPost = (payload: Payload, tenantID: string, data: SeedDoc, opts: UpsertOpts) =>
  upsertDoc(payload, 'posts', tenantID, data, opts)

// ── images (loaded from each tenant's images/ folder) ──────────────────────—

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
}

/** Reuse an existing image (matched on its filename prefix) or upload it fresh. */
async function upsertMediaFile(
  payload: Payload,
  tenantID: string,
  baseName: string,
  filePath: string,
  ext: string,
  alt: string,
  { force }: UpsertOpts,
): Promise<string> {
  // Match the exact stored filename, not a `like` substring: a substring match
  // makes a shorter basename collide with a longer one (e.g. `smagssans-hero`
  // matches `smagssans-hero-transparent.webp`), so seeding both would delete the
  // freshly-created longer one under `--force` and leave a dangling reference.
  const filename = `${baseName}${ext}`
  const existing = (
    await payload.find({
      collection: 'media',
      where: { and: [{ tenant: { equals: tenantID } }, { filename: { equals: filename } }] },
      limit: 1,
      pagination: false,
    })
  ).docs[0]
  if (existing && !force) return existing.id as string
  if (existing && force) {
    await payload.delete({ collection: 'media', id: existing.id, context: ctx })
  }
  const data = await readFile(filePath)
  const doc = await payload.create({
    collection: 'media',
    context: ctx,
    data: { alt, tenant: tenantID } as never,
    file: {
      name: filename,
      data,
      mimetype: MIME[ext] ?? 'image/jpeg',
      size: data.byteLength,
    },
  })
  return doc.id as string
}

/**
 * Upload every image in a tenant's `images/` folder and return a `name → media
 * id` map. The name is the filename without extension, so `images/hero.jpg`
 * becomes `img('hero')`. Uploads are keyed `${slug}-${name}` so additive runs
 * reuse them instead of re-uploading.
 */
async function loadImages(
  payload: Payload,
  slug: string,
  tenantID: string,
  imagesDir: string,
  opts: UpsertOpts,
): Promise<Record<string, string>> {
  let files: string[] = []
  try {
    files = await readdir(imagesDir)
  } catch {
    return {}
  }
  const map: Record<string, string> = {}
  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase()
    if (!MIME[ext]) continue
    const key = path.basename(filename, path.extname(filename))
    map[key] = await upsertMediaFile(
      payload,
      tenantID,
      `${slug}-${key}`,
      path.join(imagesDir, filename),
      ext,
      `${slug} – ${key}`,
      opts,
    )
  }
  return map
}

// ── engine ───────────────────────────────────────────────────────────────────

export type SeedOptions = {
  /**
   * `false` (default): additive — only create what's missing, never touch
   * existing docs. Safe to run after editors have written real content.
   * `true`: destructive reset — wipe each tenant's posts/pages/media and rebuild
   * from the seed data.
   */
  force?: boolean
}

export async function seedTenants(payload: Payload, opts: SeedOptions = {}): Promise<void> {
  const force = opts.force ?? false

  // Author for the seeded posts. Prefer an existing super-admin, then any
  // existing user; only create the dev admin when the database has NO users at
  // all (a fresh local DB). This means seeding a populated database — i.e.
  // production — reuses your real super-admin and never adds the
  // admin@example.com / password test user.
  let admin =
    (
      await payload.find({
        collection: 'users',
        where: { roles: { in: ['super-admin'] } },
        limit: 1,
        pagination: false,
      })
    ).docs[0] ??
    (
      await payload.find({
        collection: 'users',
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
    payload.logger.info('✓ dev super-admin oprettet (tom DB): admin@example.com / password')
  }

  const tenantMetas: TenantMeta[] = TENANTS.map((t) => ({
    name: t.name,
    slug: t.slug,
    isMain: t.isMain,
    domains: t.domains,
    tagline: t.tagline,
  }))
  // Absolute URL to another tenant's site (env-aware), for cross-site links.
  const tenantBySlug = new Map(TENANTS.map((t) => [t.slug, t]))
  const siteUrl = (slug: string): string => {
    const t = tenantBySlug.get(slug)
    if (!t) throw new Error(`siteUrl: unknown tenant '${slug}'`)
    return urlForDomain(linkDomain(t.domains))
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

    // Force = full reset: wipe this tenant's content, then recreate it below
    // (the upsert helpers find nothing and create fresh). Additive runs skip this
    // and leave existing pages/posts/media — including editor edits — untouched.
    if (force) {
      for (const collection of ['posts', 'pages', 'media'] as const) {
        await payload.delete({
          collection,
          where: { tenant: { equals: tenantID } },
          context: ctx,
        })
      }
    }

    // Upload this tenant's images and build the `img('name')` resolver.
    const images = await loadImages(payload, t.slug, tenantID, path.join(t.dir, 'images'), { force })
    const img = (key: string): string => {
      const id = images[key]
      if (!id) {
        throw new Error(`Tenant '${t.slug}' has no image '${key}' (looked in ${t.dir}/images)`)
      }
      return id
    }

    const pageCtx: PageContext = {
      tenantID,
      authorID: admin.id as string,
      img,
      tenants: tenantMetas,
      siteUrl,
    }

    // Pages — one factory per file in the tenant's pages/ folder.
    const pageResults: UpsertResult[] = []
    for (const page of t.pages) {
      pageResults.push(await upsertPage(payload, tenantID, page(pageCtx), { force }))
    }

    // Posts. Cross-link only the posts this run created, so editor-curated
    // `relatedPosts` on existing posts is preserved.
    const postIDs: string[] = []
    const postCreated: boolean[] = []
    for (const post of t.posts) {
      const result = await upsertPost(payload, tenantID, post(pageCtx), { force })
      postIDs.push(result.id)
      postCreated.push(result.created)
    }
    for (let i = 0; i < postIDs.length; i++) {
      if (!postCreated[i]) continue
      await payload.update({
        collection: 'posts',
        id: postIDs[i],
        context: ctx,
        data: { relatedPosts: postIDs.filter((_, j) => j !== i) } as never,
      })
    }

    // Header + footer navigation come from the tenant's menu.ts.
    const { header, footer } = t.menu(pageCtx)
    await upsertNav(payload, 'header', t.slug, tenantID, header, { force })
    await upsertNav(payload, 'footer', t.slug, tenantID, footer, { force })

    const newPages = pageResults.filter((r) => r.created).length
    const newPosts = postCreated.filter(Boolean).length
    payload.logger.info(
      `✓ ${t.slug}: +${newPosts}/${t.posts.length} indlæg, +${newPages}/${t.pages.length} sider → ${t.domains.join(', ')}`,
    )
  }
}

/**
 * Create the nav if the tenant has none; with force, refresh an existing one.
 * Additive runs leave an existing nav untouched (it may have been edited).
 */
async function upsertNav(
  payload: Payload,
  collection: 'header' | 'footer',
  tenantSlug: string,
  tenantID: string,
  navItems: unknown[],
  { force }: UpsertOpts,
) {
  const existing = await payload.find({
    collection,
    where: { 'tenant.slug': { equals: tenantSlug } },
    limit: 1,
    pagination: false,
  })
  if (existing.docs[0]) {
    if (force) {
      await payload.update({
        collection,
        id: existing.docs[0].id,
        context: ctx,
        data: { navItems } as never,
      })
    }
  } else {
    await payload.create({
      collection,
      context: ctx,
      data: { tenant: tenantID, navItems } as never,
    })
  }
}
