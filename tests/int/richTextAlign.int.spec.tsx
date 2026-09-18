import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// The code block pulls in Payload's admin UI, whose .scss imports Vitest cannot
// resolve. Alignment is a property of the text nodes, so stub it out.
vi.mock('@/blocks/Code/Component', () => ({ CodeBlock: () => null }))

import RichText from '@/components/RichText'

/**
 * AlignFeature stores the editor's choice on the element node's `format`, and
 * Payload's converter turns that into `text-align` on the rendered element.
 * These tests pin that the choice survives to the page — i.e. that nothing here
 * grows a `disableTextAlign` or an override that drops the format on the way.
 */
const doc = (node: Record<string, unknown>) =>
  ({
    root: {
      type: 'root',
      children: [{ children: [{ type: 'text', text: 'Tekst', version: 1 }], version: 1, ...node }],
      version: 1,
    },
  }) as unknown as DefaultTypedEditorState

const align = (selector: string, container: HTMLElement) =>
  container.querySelector<HTMLElement>(selector)!.style.textAlign

afterEach(cleanup)

describe('RichText alignment', () => {
  it('centres a paragraph the editor centred', () => {
    const { container } = render(<RichText data={doc({ type: 'paragraph', format: 'center' })} />)

    expect(align('p', container)).toBe('center')
  })

  it('centres a heading the editor centred', () => {
    const { container } = render(
      <RichText data={doc({ type: 'heading', tag: 'h2', format: 'center' })} />,
    )

    expect(align('h2', container)).toBe('center')
  })

  it('leaves an unaligned paragraph alone', () => {
    const { container } = render(<RichText data={doc({ type: 'paragraph', format: '' })} />)

    expect(align('p', container)).toBe('')
  })
})
