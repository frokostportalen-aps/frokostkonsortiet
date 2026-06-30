import type { NavFactory } from '../types'

/**
 * Header + footer for the main consortium site. Partnere is a dropdown: the
 * overview page plus an env-aware cross-site link to each kitchen.
 */
export const menu: NavFactory = ({ tenants, siteUrl }) => {
  const kitchens = tenants.filter((t) => !t.isMain)
  return {
    header: [
      { type: 'link', link: { type: 'custom', label: 'Services', url: '/services' } },
      { type: 'link', link: { type: 'custom', label: 'FrokostPortalen', url: '/frokostportalen' } },
      {
        type: 'dropdown',
        label: 'Partnere',
        subItems: [
          { link: { type: 'custom', label: 'Overblik', url: '/partnere' } },
          ...kitchens.map((k) => ({
            link: { type: 'custom', label: k.name, url: siteUrl(k.slug) },
          })),
        ],
      },
      { type: 'link', link: { type: 'custom', label: 'Netværk', url: '/netvaerk' } },
      { type: 'link', link: { type: 'custom', label: 'Om os', url: '/om-os' } },
      { type: 'link', link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
    ],
    footer: [
      { link: { type: 'custom', label: 'Om os', url: '/om-os' } },
      { link: { type: 'custom', label: 'Partnere', url: '/partnere' } },
      { link: { type: 'custom', label: 'Netværk', url: '/netvaerk' } },
      { link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
      { link: { type: 'custom', label: 'Nyheder', url: '/posts' } },
    ],
  }
}
