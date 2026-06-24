import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@payloadcms/plugin-multi-tenant/utilities'

export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    const authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
    user = authResult?.user
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // Enforce that the user may preview the tenant encoded in the path. The path
  // is `/{tenantSlug}/...`; super-admins bypass the check.
  if (!isSuperAdmin(user)) {
    const tenantSlug = path.split('/')[1]
    const { docs } = await payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1,
      pagination: false,
      where: { slug: { equals: tenantSlug } },
    })
    const tenantId = docs?.[0]?.id
    const userTenantIDs = getUserTenantIDs(user)

    if (!tenantId || !userTenantIDs.includes(tenantId)) {
      draft.disable()
      return new Response('You are not allowed to preview this page', { status: 403 })
    }
  }

  draft.enable()

  redirect(path)
}
