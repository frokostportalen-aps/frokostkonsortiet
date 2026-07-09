/** "9. juli 2026" — the site's Danish long date (bylines, published dates). */
export const formatDateDa = (date: string): string =>
  new Date(date).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
