/**
 * The card tones an editor can pick from — shared by every block that draws
 * the coloured card (vendekort, galleri), so the palette steps stay one list.
 *
 * Deliberately a short list of *theme tokens* rather than a colour picker: the
 * design asks for "skiftende farver", and on a platform where every site has
 * its own palette that has to mean "another step in this site's palette", not a
 * hex value typed into one page. A picked colour would look right on the site
 * it was chosen for and wrong on the next one — and would quietly survive a
 * rebrand.
 */
export const TONE_OPTIONS = [
  { label: 'Skiftevis (følger rækken)', value: 'auto' },
  { label: 'Brandfarve', value: 'brand' },
  { label: 'Mørk', value: 'ink' },
  { label: 'Sand', value: 'sand' },
  { label: 'Dæmpet', value: 'muted' },
] as const

export type ToneName = (typeof TONE_OPTIONS)[number]['value']
type FixedTone = Exclude<ToneName, 'auto'>

/** Surface + text for each tone, as a pair — a band or a card's back is a solid
 *  panel and everything on it (rules, footnote) inherits `currentColor`. */
export const toneClass: Record<FixedTone, string> = {
  brand: 'bg-primary text-primary-foreground',
  ink: 'bg-foreground text-background',
  sand: 'bg-secondary text-secondary-foreground',
  muted: 'bg-muted text-foreground',
}

/**
 * The order `auto` walks — deliberately alternating a saturated tone with a
 * quiet one. Grouping the two dark tones (`brand`, `ink`) would read as one
 * long band on the sites whose brand colour is already close to their ink, and
 * two of the three family palettes are exactly that.
 */
const TONE_CYCLE: FixedTone[] = ['brand', 'sand', 'ink', 'muted']

/** The tone a card actually renders in: its own choice, or its place in the row. */
export const resolveTone = (tone: ToneName | null | undefined, index: number): FixedTone =>
  tone && tone !== 'auto' ? tone : TONE_CYCLE[index % TONE_CYCLE.length]
