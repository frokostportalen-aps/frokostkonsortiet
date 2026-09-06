import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { Brand } from './Brand/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  collections: [Pages, Posts, Media, Categories, Users, Tenants, Header, Footer, Brand],
  // Every tenant serves the admin/API and live preview from its own domain, so
  // all of them must be allowed origins. Set TENANT_ORIGINS to a comma list.
  cors: [
    getServerSideURL(),
    ...(process.env.TENANT_ORIGINS?.split(',').map((o) => o.trim()) ?? []),
  ].filter(Boolean),
  // Transactional mail — form notifications and password resets — goes out
  // through Resend when an API key is present. Without one, e.g. local dev,
  // Payload keeps its default adapter, which logs the mail instead of sending
  // it, so nothing breaks and no real address is ever contacted by accident.
  //
  // These two are the *platform fallback*, not each site's identity: a site's
  // own sender and lead inbox live on its tenant definition and are seeded
  // onto its form. The fallback still matters because Payload's own auth mail
  // (password resets) is sent with `email.defaultFromName/Address` hardcoded
  // in `forgotPassword.ts` — there is no per-tenant seam for it.
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress:
            process.env.EMAIL_DEFAULT_FROM_ADDRESS || 'no-reply@frokostkonsortiet.dk',
          defaultFromName: process.env.EMAIL_DEFAULT_FROM_NAME || 'Frokost Konsortiet',
          // Staging safety valve: with this set, every mail is redirected here
          // instead of reaching the real recipient.
          ...(process.env.EMAIL_OVERRIDE_RECIPIENT
            ? { overrideRecipientAddress: process.env.EMAIL_OVERRIDE_RECIPIENT }
            : {}),
        }),
      }
    : {}),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
