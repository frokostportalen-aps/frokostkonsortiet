/** Shared helpers for reasoning about which database a script targets. */

// Host names that mean "this is a local/dev database" (docker service names and
// loopback). Anything else is treated as production for the destructive guards.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', 'mongo', 'mongodb', 'db']

const dbHost = (url: string): string => {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

/** Treat the target as production unless it's clearly a local/dev database. */
export const isProduction = (): boolean => {
  if (/production/i.test(process.env.DOTENV_CONFIG_PATH ?? '')) return true
  const host = dbHost(process.env.DATABASE_URL ?? '')
  return host !== '' && !LOCAL_HOSTS.includes(host)
}

/** The target database URL with credentials stripped, for logging. */
export const targetLabel = (): string =>
  (process.env.DATABASE_URL || '(DATABASE_URL not set)').replace(/:\/\/[^@]*@/, '://')
