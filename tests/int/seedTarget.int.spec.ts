import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { isProduction } from '../../scripts/seedTarget'

/**
 * `isProduction()` is what stops the content scripts (seed-tenants, add-page)
 * from writing to a live database — the customer's own editors own that
 * content. It has to fail CLOSED: anything it cannot confidently read as local
 * must count as production.
 *
 * Both cases below marked "regression" were real holes:
 *  - `new URL()` throws on the multi-host replica-set form, and the throw used
 *    to mean "no host", which meant "not production".
 *  - Taking the last `@` before cutting the path let `?appName=seed@localhost`
 *    decide which host got checked.
 */
describe('isProduction', () => {
  const env = { ...process.env }

  beforeEach(() => {
    // Empty rather than deleted: `isProduction()` reads both through `?? ''`,
    // so the two are equivalent to it, and `delete` doesn't typecheck on env.
    process.env = { ...env, DATABASE_URL: '', DOTENV_CONFIG_PATH: '' }
  })
  afterEach(() => {
    process.env = { ...env }
  })

  const target = (url: string, dotenvPath?: string): boolean => {
    process.env.DATABASE_URL = url
    if (dotenvPath) process.env.DOTENV_CONFIG_PATH = dotenvPath
    return isProduction()
  }

  describe('allows a local database', () => {
    it.each([
      ['the docker service', 'mongodb://mongo:27017/frokost-konsortiet'],
      ['loopback by name', 'mongodb://localhost:27017/x'],
      ['loopback by ip', 'mongodb://127.0.0.1:27017/x'],
      ['a local replica set', 'mongodb://localhost:27017,127.0.0.1:27018/x?replicaSet=rs0'],
      ['credentials in front of a local host', 'mongodb://user:pass@localhost:27017/db'],
    ])('%s', (_name, url) => {
      expect(target(url)).toBe(false)
    })
  })

  describe('refuses anything else', () => {
    it.each([
      ['a remote srv cluster', 'mongodb+srv://u:p@cluster0.example.mongodb.net/prod'],
      ['credentials in front of a remote host', 'mongodb://user:pass@prod.example.net:27017/db'],
      [
        'a remote replica set (regression: new URL() throws on this)',
        'mongodb://a.example.com:27017,b.example.com:27017/db?replicaSet=rs0',
      ],
      ['one remote host among local ones', 'mongodb://localhost:27017,evil.example.com:27017/db'],
      [
        'an @ in the query pointing at a local name (regression)',
        'mongodb://prod.example.net:27017/frokost-konsortiet-prod?appName=seed@localhost',
      ],
      [
        'an @ in the path pointing at a local name',
        'mongodb://prod.example.net:27017/db@localhost',
      ],
      ['an unset url', ''],
      ['an unparsable url', 'not a url at all'],
    ])('%s', (_name, url) => {
      expect(target(url)).toBe(true)
    })

    it('a production env file, even with a local url', () => {
      expect(target('mongodb://localhost:27017/x', '.env.production')).toBe(true)
    })
  })
})
