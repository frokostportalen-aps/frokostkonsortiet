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
import { drikkevarer } from './pages/drikkevarer'
import { baeredygtighed } from './pages/baeredygtighed'
import { kundeportal } from './pages/kundeportal'
import { faqPage } from './pages/faq'

export const smagssans: TenantDef = {
  name: 'Smagssans',
  slug: 'smagssans',
  isMain: false,
  domains: ['smagssans.localhost', 'smagssans.dk', 'new.smagssans.dk'],
  tagline: 'Frokost for alle sanser',
  dir: folderOf(import.meta.url),
  pages: [home, omOs, frokostUdAfHuset, kantine, catering, moedeforplejning, frugtordning, drikkevarer, baeredygtighed, kundeportal, faqPage],
  posts,
  menu,
}
