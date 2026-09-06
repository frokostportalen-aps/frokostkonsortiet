/**
 * Plain-text reads of a Lexical rich-text value.
 *
 * Layouts that need the *words* rather than the markup — a hero that sets its
 * headline as a two-tone wordmark, say — can't render `<RichText>`: they have to
 * lay out the characters themselves. These helpers pull the text back out of the
 * editor JSON, so such a layout still takes its content from the CMS field the
 * editor already fills in.
 */

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

const isNode = (value: unknown): value is LexicalNode => typeof value === 'object' && value !== null

/** Every text leaf under `node`, joined — the node's visible words. */
const textOf = (node: LexicalNode): string =>
  [
    typeof node.text === 'string' ? node.text : '',
    ...(Array.isArray(node.children) ? node.children.map(textOf) : []),
  ]
    .join('')
    .trim()

/** Depth-first search for the first node matching `predicate`. */
const find = (node: LexicalNode, predicate: (n: LexicalNode) => boolean): LexicalNode | null => {
  if (predicate(node)) return node
  for (const child of node.children ?? []) {
    const hit = find(child, predicate)
    if (hit) return hit
  }
  return null
}

const rootOf = (data: unknown): LexicalNode | null => {
  const root = (data as { root?: unknown } | null | undefined)?.root
  return isNode(root) ? root : null
}

/** Text of the first heading with `tag` (default `h1`), or '' when there is none. */
export const headingText = (data: unknown, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h1'): string => {
  const root = rootOf(data)
  const heading = root && find(root, (n) => n.type === 'heading' && n.tag === tag)
  return heading ? textOf(heading) : ''
}

/**
 * The hero's two lines in the order they were written, each carrying whether the
 * editor marked it as the page's heading.
 *
 * A wordmark hero sets two lines of type: the big lockup and a small line under
 * it. Which of them is the page's `h1` is a content question, not a layout one —
 * a front page leads with the brand name, while a section page has to lead with
 * its own subject or it disappears from search. So the editor decides it by
 * writing one line as a heading and the other as a paragraph, and the layout
 * puts the heading tag wherever they put it.
 */
export type HeroLockup = { wordmark: string; subline: string; headingIsSubline: boolean }

export const heroLockup = (data: unknown): HeroLockup => {
  const root = rootOf(data)
  const lines = (root?.children ?? [])
    .filter((n) => n.type === 'heading' || n.type === 'paragraph')
    .slice(0, 2)
    .map((n) => ({ text: textOf(n), isHeading: n.type === 'heading' }))
    .filter((line) => line.text.length > 0)
  const [first, second] = lines
  return {
    wordmark: first?.text ?? '',
    subline: second?.text ?? '',
    headingIsSubline: Boolean(second?.isHeading && !first?.isHeading),
  }
}
