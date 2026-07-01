import type { TenantDef } from '../types'
import { folderOf } from '../dir'
import { menu } from './menu'
import { posts } from './posts'
import { home } from './pages/home'
import { omOs } from './pages/om-os'
import { frokostUdAfHuset } from './pages/frokost-ud-af-huset'
import { kantine } from './pages/kantine'
import { catering } from './pages/catering'
import { moedeforplejning } from './pages/moedeforplejning'
import { frugtordning } from './pages/frugtordning'
import { menuvariationer } from './pages/menuvariationer'
import { baeredygtighed } from './pages/baeredygtighed'
import { kundeportal } from './pages/kundeportal'
import { faqPage } from './pages/faq'

export const smagssans: TenantDef = {
  name: 'Smagssans',
  slug: 'smagssans',
  isMain: false,
  domains: ['smagssans.localhost', 'smagssans.dk', 'new.smagssans.dk'],
  tagline: 'Det handler om at være glad for mad',
  dir: folderOf(import.meta.url),
  pages: [home, omOs, frokostUdAfHuset, kantine, menuvariationer, catering, moedeforplejning, frugtordning, baeredygtighed, kundeportal, faqPage],
  posts,
  menu,
}
