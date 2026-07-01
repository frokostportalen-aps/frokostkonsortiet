import type { NavFactory } from '../types'

export const menu: NavFactory = ({ tenants, siteUrl }) => {
  const main = tenants.find((t) => t.isMain)!
  return {
    header: [
      {
        type: 'dropdown',
        label: 'Frokost',
        subItems: [
          { link: { type: 'custom', label: 'Frokostordning', url: '/frokost-ud-af-huset' } },
          { link: { type: 'custom', label: 'Kantineordning', url: '/kantine' } },
          { link: { type: 'custom', label: 'Menuvariationer', url: '/menuvariationer' } },
        ],
      },
      {
        type: 'dropdown',
        label: 'Catering',
        subItems: [
          { link: { type: 'custom', label: 'Overblik', url: '/catering' } },
          { link: { type: 'custom', label: 'Mødeforplejning', url: '/moedeforplejning' } },
          { link: { type: 'custom', label: 'Mejeri & frugt', url: '/frugtordning' } },
        ],
      },
      { type: 'link', link: { type: 'custom', label: 'Bæredygtighed', url: '/baeredygtighed' } },
      { type: 'link', link: { type: 'custom', label: 'Nem bestilling & tilretning', url: '/kundeportal' } },
      { type: 'link', link: { type: 'custom', label: 'FAQ', url: '/faq' } },
      { type: 'link', link: { type: 'custom', label: 'Om os', url: '/om-os' } },
    ],
    footer: [
      { link: { type: 'custom', label: main.name, url: siteUrl(main.slug) } },
      { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
      { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
      { link: { type: 'custom', label: 'Kundelogin', url: 'https://min.frokostportal.dk', newTab: true } },
      { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
    ],
  }
}
