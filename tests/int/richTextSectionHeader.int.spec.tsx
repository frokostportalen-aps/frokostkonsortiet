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

  it('sets the eyebrow under the heading, in spaced capitals by default', () => {
    const { container } = render(
      <RichText data={doc({ heading: 'Overskrift', eyebrow: 'Fire grunde' })} />,
    )

    expect(screen.getByText('Fire grunde')).not.toBeNull()
    expect(container.querySelector('.uppercase')).not.toBeNull()
  })
})
