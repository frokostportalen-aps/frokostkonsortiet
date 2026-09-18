import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// The code block pulls in Payload's admin UI, whose .scss imports Vitest cannot
// resolve. Nothing here goes through it.
vi.mock('@/blocks/Code/Component', () => ({ CodeBlock: () => null }))

import RichText from '@/components/RichText'

const doc = (fields: Record<string, unknown>) =>
  ({
    root: {
      type: 'root',
      children: [{ type: 'block', fields: { blockType: 'sectionHeader', ...fields }, version: 2 }],
      version: 1,
    },
  }) as unknown as DefaultTypedEditorState

afterEach(cleanup)

/** Pins that the block renders through the shared `SectionHeader`, and that the
 *  site's eyebrow casing reaches the converter as a prop. */
describe('RichText section header block', () => {
  it('renders the heading as an h2 on the section type scale', () => {
    render(<RichText data={doc({ heading: 'Vi tilpasser os jeres hverdag' })} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.textContent).toBe('Vi tilpasser os jeres hverdag')
    expect(heading.className).toContain('section-heading')
  })

  it("takes the site's own eyebrow casing", () => {
    const { container } = render(
      <RichText
        data={doc({ heading: 'Overskrift', eyebrow: 'Fire grunde' })}
        eyebrowStyle="smallcaps"
      />,
    )

    expect(container.querySelector('.tracking-smallcaps')).not.toBeNull()
    expect(container.querySelector('.uppercase')).toBeNull()
  })

  // The card in Content dims its paragraphs with a child selector, so that the
  // rule cannot reach past the header's own wrapper and grey out the eyebrow.
  it("keeps the eyebrow out of the rich text's own paragraph flow", () => {
    const { container } = render(
      <RichText
        data={
          {
            root: {
              type: 'root',
              version: 1,
              children: [
                {
                  type: 'block',
                  version: 2,
                  fields: { blockType: 'sectionHeader', heading: 'H', eyebrow: 'E' },
                },
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [{ type: 'text', text: 'Br\u00f8dtekst', version: 1 }],
                },
              ],
            },
          } as unknown as DefaultTypedEditorState
        }
      />,
    )
    const root = container.firstElementChild!

    const directParagraphs = [...root.children].filter((el) => el.tagName === 'P')
    expect(directParagraphs.map((el) => el.textContent)).toEqual(['Br\u00f8dtekst'])
  })

  it('sets the eyebrow under the heading, in spaced capitals by default', () => {
    const { container } = render(
      <RichText data={doc({ heading: 'Overskrift', eyebrow: 'Fire grunde' })} />,
    )

    expect(screen.getByText('Fire grunde')).not.toBeNull()
    expect(container.querySelector('.uppercase')).not.toBeNull()
  })
})
