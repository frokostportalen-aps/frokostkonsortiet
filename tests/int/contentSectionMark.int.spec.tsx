import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'

// The code block pulls in Payload's admin UI, whose .scss imports Vitest cannot
// resolve. Nothing here goes through it.
vi.mock('@/blocks/Code/Component', () => ({ CodeBlock: () => null }))

import { ContentBlock } from '@/blocks/Content/Component'
import { heading, p, richText, sectionHeader } from '@/stories/lexical'

const column = (size: string, node: Record<string, unknown>) => ({
  size,
  enableLink: false,
  richText: richText(node),
})

const renderBlock = (columns: object[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render(<ContentBlock {...({ columns } as any)} tenantSlug="frajorden" />)

/** Marks in the full-width intro column only — a signature card carries one of
 *  its own, which is a different motif in a different place. */
const marks = (container: HTMLElement) => {
  const intro = container.querySelector('.prose-inset')
  expect(intro, 'the full-width column wrapper').not.toBeNull()
  return intro!.querySelectorAll('.signature-mark').length
}

afterEach(cleanup)

/** The motif rule and an inserted section header must not both mark the same
 *  heading. */
describe('Content section mark', () => {
  it('draws the motif rule under a plain intro column', () => {
    const { container } = renderBlock([
      column('full', heading('h2', 'Fire grunde')),
      column('oneThird', p('Et kort')),
    ])

    expect(marks(container)).toBe(1)
  })

  it('stands down when the editor inserted a section header', () => {
    const { container } = renderBlock([
      column('full', sectionHeader('Fire grunde', 'Sådan løser vi dem')),
      column('oneThird', p('Et kort')),
    ])

    expect(marks(container)).toBe(0)
  })
})
