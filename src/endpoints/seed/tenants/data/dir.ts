import path from 'path'
import { fileURLToPath } from 'url'

/**
 * The directory a tenant module lives in. Call with `import.meta.url` from a
 * tenant's `index.ts` so the engine can find its `images/` folder:
 *
 *   dir: folderOf(import.meta.url)
 */
export const folderOf = (importMetaUrl: string): string =>
  path.dirname(fileURLToPath(importMetaUrl))
