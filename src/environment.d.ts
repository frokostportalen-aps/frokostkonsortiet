declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      // Comma-separated list of every tenant origin, e.g.
      // "https://frokostkonsortiet.dk,https://smagssans.dk,https://frajorden.dk".
      // Used for CORS and next/image remote patterns across all sites.
      TENANT_ORIGINS: string
      // Optional stable origin the proxy uses to fetch the domain→tenant map
      // (e.g. http://localhost:3000 inside Docker). Falls back to the request URL.
      INTERNAL_URL: string
      // Resend API key. When absent — e.g. local dev — Payload keeps its
      // default adapter and logs mails instead of sending them.
      RESEND_API_KEY: string
      // Platform fallback sender, used for Payload's own auth mail (password
      // resets) and for any site without its own `senderEmail`. Its domain
      // must be verified in Resend. Defaults to
      // "Frokost Konsortiet <no-reply@frokostkonsortiet.dk>".
      EMAIL_DEFAULT_FROM_ADDRESS: string
      EMAIL_DEFAULT_FROM_NAME: string
      // Optional: redirect every outgoing mail here instead of the real
      // recipient. For staging/testing only — never set it in production.
      EMAIL_OVERRIDE_RECIPIENT: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
