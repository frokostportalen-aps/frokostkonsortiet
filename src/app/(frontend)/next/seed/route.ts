import { getPayload } from 'payload'
import { seedTenants } from '@/endpoints/seed/tenants/seed-tenants'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Seed every tenant with the Danish multi-site content (the same engine the
    // `pnpm seed:tenants` CLI uses). Deletes are scoped per tenant, so re-running
    // refreshes each site without touching the others.
    await seedTenants(payload)

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
