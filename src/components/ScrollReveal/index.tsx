'use client'
import { useEffect } from 'react'

/**
 * Opts the page into scroll-reveal motion and marks `[data-reveal]` elements
 * as they enter the viewport (the CSS lives in globals.css). Progressive
 * enhancement: the hidden state is gated on the `data-motion` attribute this
 * component sets, so without JS — or with reduced motion — nothing is ever
 * hidden. A MutationObserver picks up nodes that arrive after mount
 * (client-side navigation, live-preview refreshes), so anything that renders
 * a `data-reveal` attribute is observed by construction.
 */
export const ScrollReveal: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Content already on screen was painted visible before this effect ran —
    // opt it out entirely rather than hiding and re-animating what the
    // visitor has already seen.
    for (const el of document.querySelectorAll('[data-reveal]')) {
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) el.removeAttribute('data-reveal')
    }

    document.documentElement.setAttribute('data-motion', '')

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in')
            intersection.unobserve(entry.target)
          }
        }
      },
      // Fire a touch before the block's own edge so the rise reads as the
      // content arriving, not as it popping in late.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    const seen = new WeakSet<Element>()
    const observeNew = () => {
      for (const el of document.querySelectorAll('[data-reveal]')) {
        if (!seen.has(el)) {
          seen.add(el)
          intersection.observe(el)
        }
      }
    }
    observeNew()

    const mutation = new MutationObserver(observeNew)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutation.disconnect()
      intersection.disconnect()
    }
  }, [])

  return null
}
