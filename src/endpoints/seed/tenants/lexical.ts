/**
 * Small builders for Payload's Lexical rich-text JSON, so seed content can be
 * authored concisely instead of hand-writing every node.
 */
type Node = Record<string, unknown>

export const text = (value: string, format = 0): Node => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

/** Inline link node (use inside paragraph()). */
export const link = (label: string, url: string, newTab = false): Node => ({
  type: 'link',
  children: [text(label)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab, url },
  format: '',
  indent: 0,
  version: 3,
})

export const paragraph = (...children: Node[]): Node => ({
  type: 'paragraph',
  children: children.length ? children : [text('')],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

/** Paragraph from a plain string. */
export const p = (value: string): Node => paragraph(text(value))

export const heading = (tag: 'h1' | 'h2' | 'h3' | 'h4', value: string): Node => ({
  type: 'heading',
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

/** Bullet list from plain strings. */
export const list = (items: string[]): Node => ({
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items.map((item, i) => ({
    type: 'listitem',
    value: i + 1,
    children: [text(item)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

/** Wrap children in a Lexical root (the value stored on a richText field). */
export const richText = (...children: Node[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})
