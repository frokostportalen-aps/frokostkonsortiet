/** Shared helpers for reasoning about which database a script targets. */

// Host names that mean "this is a local/dev database" (docker service names and
// loopback). Anything else counts as production: the content scripts
// (seed-tenants, add-page) then refuse to run at all, and the prune scripts
// require an explicit --yes.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', 'mongo', 'mongodb', 'db']

/**
 * Every host in a Mongo connection string, ports stripped. Hand-rolled because
 * `new URL()` throws on the multi-host replica-set form
 * (`mongodb://a:27017,b:27017/db`) — and a guard that throws its way to "not
 * production" is worse than no guard at all.
 *
 * Order matters: cut the path and query off FIRST, then take what follows the
 * last `@`. The other way round, an `@` anywhere in the path or query
 * (`…/prod?appName=seed@localhost`) decides which host gets checked. Mongo
 * requires `@`, `/` and `:` to be percent-encoded inside credentials, so the
 * authority is the only place they can appear unescaped.
 */
const dbHosts = (url: string): string[] => {
  const authority = url.split('://')[1]?.split(/[/?]/)[0].split('@').pop()
  if (!authority) return []
  return authority
    .split(',')
    .map((host) => host.trim().replace(/:\d+$/, '').toLowerCase())
    .filter(Boolean)
}

/**
 * Treat the target as production unless it is clearly a local/dev database.
 * Fails CLOSED: an empty, malformed or partly-remote connection string counts
 * as production, so a format we didn't anticipate can never open the door.
 */
export const isProduction = (): boolean => {
  if (/production/i.test(process.env.DOTENV_CONFIG_PATH ?? '')) return true
  const hosts = dbHosts(process.env.DATABASE_URL ?? '')
  return hosts.length === 0 || !hosts.every((host) => LOCAL_HOSTS.includes(host))
}

/** The target database URL with credentials stripped, for logging. */
export const targetLabel = (): string =>
  (process.env.DATABASE_URL || '(DATABASE_URL not set)').replace(/:\/\/[^@]*@/, '://')

/**
 * Exit before touching Payload unless the target is a local database. The
 * single home of the "content scripts never write to production" rule — the
 * live sites' content belongs to the editors who write it, so no flag overrides
 * this. `hint` says what to do instead, in the caller's own words.
 */
export const assertLocalDatabase = (hint: string): void => {
  if (!isProduction()) return
  console.error(
    [
      '',
      '⛔  Afvist: målet er ikke en lokal database.',
      `      DB: ${targetLabel()}`,
      '',
      `    ${hint}`,
      '',
    ].join('\n'),
  )
  process.exit(1)
}
