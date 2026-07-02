import { describe, it, expect } from 'vitest'
import { createElement as h } from 'react'
import { render } from '@testing-library/react'

import { HeaderThemeProvider, useHeaderTheme, useHeaderThemeSync } from '@/providers/HeaderTheme'

describe('useHeaderThemeSync', () => {
  it('sets the header theme while mounted and clears it on unmount', () => {
    const seen: (string | null | undefined)[] = []

    const Observer = () => {
      seen.push(useHeaderTheme().headerTheme)
      return null
    }
    const Setter = ({ theme }: { theme: 'light' | 'dark' | null }) => {
      useHeaderThemeSync(theme)
      return null
    }

    const tree = (withSetter: boolean) =>
      h(
        HeaderThemeProvider,
        null,
        h(Observer),
        withSetter ? h(Setter, { theme: 'dark' }) : null,
      )

    const { rerender } = render(tree(true))
    expect(seen.at(-1)).toBe('dark')

    // Unmounting the hero returns the header to the ambient theme — the reset is
    // owned by the hook, not by every call site.
    rerender(tree(false))
    expect(seen.at(-1)).toBe(null)
  })
})
