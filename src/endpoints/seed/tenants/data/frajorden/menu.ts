import type { NavFactory } from '../types'

/**
 * Navigationen peger kun på sider, der findes. Designets øvrige punkter
 * (Kantinedrift, Catering, Ugens menu, Historie, Kontakt) kommer på, når de har
 * indhold.
 */
export const menu: NavFactory = ({ tenants, siteUrl }) => {
  const main = tenants.find((t) => t.isMain)!
  return {
    header: [
      { type: 'link', link: { type: 'custom', label: 'Frokostordning', url: '/frokost-ud-af-huset' } },
      { type: 'link', link: { type: 'custom', label: 'FAQ', url: '/faq' } },
    ],
    footer: [
      { link: { type: 'custom', label: main.name, url: siteUrl(main.slug) } },
      { link: { type: 'custom', label: 'Frokostordning', url: '/frokost-ud-af-huset' } },
      { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
      { link: { type: 'custom', label: 'Kundelogin', url: 'https://min.frokostportal.dk', newTab: true } },
    ],
  }
}
