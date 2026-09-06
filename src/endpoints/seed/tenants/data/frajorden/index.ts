import type { TenantDef } from '../types'
import { folderOf } from '../dir'
import { menu } from './menu'
import { home } from './pages/home'
import { frokostUdAfHuset } from './pages/frokost-ud-af-huset'
import { faqPage } from './pages/faq'

/**
 * Fra Jorden holder kun de sider, der har tekst fra Audryns oplæg: forsiden,
 * Frokostordning-fanen og FAQ. Kantinedrift, catering, bæredygtighed, om os og
 * kundeportalen var vores eget udkast og er taget ud, indtil der ligger rigtig
 * tekst — det gamle indhold ligger i backup/seed/ og i git.
 */
export const fraJorden: TenantDef = {
  name: 'Fra Jorden',
  slug: 'frajorden',
  isMain: false,
  domains: ['frajorden.localhost', 'frajorden.dk', 'new.frajorden.dk'],
  tagline: 'Fra jorden til jeres frokostbord',
  dir: folderOf(import.meta.url),
  contactEmail: 'frokost@frajorden.dk',
  pages: [home, frokostUdAfHuset, faqPage],
  posts: [],
  menu,
}
