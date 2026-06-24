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
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
