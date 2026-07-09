/**
 * The need choices shared by the Payload config (admin select options) and the
 * client component (labels) — one list, no drift between admin and frontend.
 */
export const NEED_OPTIONS = [
  { label: 'Daglig frokost', value: 'frokost' },
  { label: 'Kantine', value: 'kantine' },
  { label: 'Catering & selskaber', value: 'catering' },
] as const

export const needLabel = (value: string): string =>
  NEED_OPTIONS.find((option) => option.value === value)?.label ?? value
