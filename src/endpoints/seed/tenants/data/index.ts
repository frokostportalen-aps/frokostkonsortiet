/**
 * Danish seed content, split per tenant for easy overview and editing. Each
 * tenant has its own folder:
 *   - `index.ts`  — the TenantDef (meta + which pages/posts/menu it has)
 *   - `menu.ts`   — header + footer navigation
 *   - `pages/*`   — one file per page (each a PageFactory)
 *   - `posts.ts`  — the tenant's news posts
 *   - `images/`   — image files referenced in content via `img('name')`
 *
 * `../seed-tenants.ts` imports `TENANTS` from here and turns each TenantDef into
 * pages, posts, media, header and footer. To add a new site, create a folder
 * like the ones below and append its export to `TENANTS`.
 */
import type { TenantDef } from './types'

import { frokostKonsortiet } from './frokost-konsortiet'
import { smagssans } from './smagssans'
import { fraJorden } from './frajorden'

export const TENANTS: TenantDef[] = [frokostKonsortiet, smagssans, fraJorden]

export type { NavFactory, PageContext, PageFactory, PostFactory, SeedDoc, TenantDef, TenantMeta } from './types'
