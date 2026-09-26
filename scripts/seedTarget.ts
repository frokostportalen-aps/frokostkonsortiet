/** Shared helpers for reasoning about which database a script targets. */

// Host names that mean "this is a local/dev database" (docker service names and
// loopback). Anything else counts as production, and every script here then
// refuses to run at all — nothing we run from a terminal may reach a live
// database, neither to write nor to read.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', 'mongo', 'mongodb', 'db']

/**
 * Split a Mongo connection string into scheme, authority (credentials + hosts)
 * and the rest. Hand-rolled because `new URL()` throws on the multi-host
 * replica-set form (`mongodb://a:27017,b:27017/db`).
 *
 * Everything below goes through this, because the interesting mistake is always
 * the same one: an `@` in the path or query (`…/prod?appName=seed@localhost`)
 * hijacks whatever reads the string, unless the path and query are cut off
 * FIRST. Mongo requires `@`, `/` and `:` to be percent-encoded inside
 * credentials, so the authority is the only place they appear unescaped.
 */
const splitUrl = (url: string): { scheme: string; authority: string; tail: string } | null => {
  const sep = url.indexOf('://')
  if (sep === -1) return null
  const rest = url.slice(sep + 3)
  const cut = rest.search(/[/?]/)
  return {
    scheme: url.slice(0, sep),
    authority: cut === -1 ? rest : rest.slice(0, cut),
    tail: cut === -1 ? '' : rest.slice(cut),
  }
}

/** Every host in a connection string, credentials and ports stripped. */
const dbHosts = (url: string): string[] => {
  const authority = splitUrl(url)?.authority.split('@').pop()
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

/**
 * The target database URL with credentials stripped, for logging. Strips only
 * inside the authority: a naive `://…@` would stop at an `@` in the query and
 * print `mongodb://localhost` for a production host, telling whoever ran the
 * script the opposite of the truth about what was refused.
 */
export const targetLabel = (): string => {
  const url = process.env.DATABASE_URL
  if (!url) return '(DATABASE_URL not set)'
  const parts = splitUrl(url)
  if (!parts) return url
  return `${parts.scheme}://${parts.authority.replace(/^[^@]*@/, '')}${parts.tail}`
}

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
