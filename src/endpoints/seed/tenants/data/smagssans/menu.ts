import type { NavFactory } from '../types'

export const menu: NavFactory = ({ tenants, siteUrl }) => {
  const main = tenants.find((t) => t.isMain)!
  return {
    header: [
      { type: 'link', link: { type: 'custom', label: 'Frokost ud af huset', url: '/frokost-ud-af-huset' } },
      { type: 'link', link: { type: 'custom', label: 'Kantine', url: '/kantine' } },
      {
        type: 'dropdown',
        label: 'Catering',
        subItems: [
          { link: { type: 'custom', label: 'Overblik', url: '/catering' } },
          { link: { type: 'custom', label: 'Mødeforplejning', url: '/moedeforplejning' } },
          { link: { type: 'custom', label: 'Frugtordning', url: '/frugtordning' } },
          { link: { type: 'custom', label: 'Drikkevarer', url: '/drikkevarer' } },
        ],
      },
      { type: 'link', link: { type: 'custom', label: 'Bæredygtighed', url: '/baeredygtighed' } },
      { type: 'link', link: { type: 'custom', label: 'Nem bestilling & tilretning', url: '/kundeportal' } },
      { type: 'link', link: { type: 'custom', label: 'FAQ', url: '/faq' } },
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
