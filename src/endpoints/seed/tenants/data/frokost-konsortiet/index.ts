import type { TenantDef } from '../types'
import { folderOf } from '../dir'

import { menu } from './menu'
import { posts } from './posts'
import { home } from './pages/home'
import { omOs } from './pages/om-os'
import { services } from './pages/services'
import { frokostportalen } from './pages/frokostportalen'
import { partnere } from './pages/partnere'
import { netvaerk } from './pages/netvaerk'
import { kontakt } from './pages/kontakt'

/** The main consortium site. Acts as the fallback for unknown hosts. */
export const frokostKonsortiet: TenantDef = {
  name: 'Frokost Konsortiet',
  slug: 'frokost-konsortiet',
  isMain: true,
  domains: [
    'frokostkonsortiet.localhost',
    'localhost',
    'frokostkonsortiet.dk',
    'new.frokostkonsortiet.dk',
  ],
  tagline: 'Frokost, der samler os',
  dir: folderOf(import.meta.url),
  pages: [home, omOs, services, frokostportalen, partnere, netvaerk, kontakt],
  posts,
  menu,
}
