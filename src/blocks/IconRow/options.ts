/**
 * The pictograms an editor can choose from. A curated list rather than a free
 * upload: every mark then comes from the same line-art family and the same
 * stroke, which is what makes a row of them read as one set. Shared by the
 * block config (the select) and the renderer (the name → component map), so the
 * two can't drift apart.
 */
export const ICON_OPTIONS = [
  { label: 'Blad (vegetar)', value: 'leaf' },
  { label: 'Spire (vegansk)', value: 'sprout' },
  { label: 'Aks (gluten)', value: 'wheat' },
  { label: 'Mælk (laktose)', value: 'milk' },
  { label: 'Skinke (svinekød)', value: 'ham' },
  { label: 'Kød', value: 'beef' },
  { label: 'Fisk', value: 'fish' },
  { label: 'Æg', value: 'egg' },
  { label: 'Nødder & gulerod', value: 'carrot' },
  { label: 'Salat', value: 'salad' },
  { label: 'Suppe', value: 'soup' },
  { label: 'Æble', value: 'apple' },
  { label: 'Brød', value: 'croissant' },
  { label: 'Kokkehue', value: 'chef-hat' },
  { label: 'Hjerte', value: 'heart' },
  { label: 'Lastbil (levering)', value: 'truck' },
  { label: 'Bestik', value: 'utensils-crossed' },
] as const

export type IconName = (typeof ICON_OPTIONS)[number]['value']
