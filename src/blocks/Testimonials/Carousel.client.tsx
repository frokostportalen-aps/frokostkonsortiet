'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

import type { Item, VariantProps } from './shared'

import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

/**
 * The carousel layout: every quote is a card, the cards sit shoulder to
 * shoulder in one rail that bleeds off both edges of the screen, and the arrows
 * slide the rail one card at a time. Nothing moves on its own — the marquee's
 * job is to suggest a crowd, this layout's job is to let a named reference be
 * read to the end.
 *
 * The cards alternate between the sand ramp's two panel steps (`--secondary`
 * and `--border`), so the rail reads as a rhythm rather than one long band.
 * The tone is keyed to the quote's own index, not its position in the rendered
 * strip, so a given voice keeps its colour as the rail moves. (With an odd
 * number of quotes that leaves two same-toned cards meeting at the seam between
 * copies — the alternative is a card visibly changing colour under the reader
 * at the wrap, which is worse.)
 */

/**
 * How many cards can show either side of the centre one. `--slot-w` caps at
 * 22rem but the viewport does not, so an ultra-wide screen fits far more than
 * the five the layout is drawn around — a fixed strip length would leave a gap
 * at the rail's edge there.
 */
const MARGIN = 5

/**
 * How many copies of the list sit either side of the middle one. The position
 * is only folded back once a whole list has scrolled past, so the active card
 * ranges over `[base − count, base + count]` and the strip has to cover
 * `MARGIN` cards beyond that at both ends. Two copies is the floor the fold
 * rule itself needs; short lists want more, because each copy buys fewer cards.
 */
const halvesFor = (count: number) => Math.max(2, 1 + Math.ceil(MARGIN / count))

/** Whether the reader has asked for less motion — read in the click handler,
 *  never during render, so it can't desync server and client markup. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Card width and the space between cards — the one rhythm the rail, the slide
 *  distance and the arrow placement are all measured off. */
const RAIL = {
  '--slot-w': 'clamp(17rem, 24vw, 22rem)',
  '--rail-gap': 'clamp(1rem, 2.5vw, 2.25rem)',
} as React.CSSProperties

/** One card, its tone alternating with the quote's index. */
const Card: React.FC<{ item: Item; tone: 0 | 1; hidden: boolean }> = ({ item, tone, hidden }) => (
  <figure
    aria-hidden={hidden || undefined}
    className={cn(
      // The min-height carries the drawn proportion — the cards are noticeably
      // taller than they are wide, and left to the text alone a short quote
      // would collapse them into squat blocks.
      'flex min-h-[clamp(20rem,34vw,30rem)] w-[var(--slot-w)] shrink-0 flex-col items-center justify-center px-6 py-12 text-center text-foreground lg:px-10',
      tone === 0 ? 'bg-secondary' : 'bg-border',
    )}
  >
    {/* The opening quote is a mark, not type: sized so the glyph itself reads at
        the drawn size, with half-leading so its own (mostly empty) line box
        doesn't push the quote down the card. */}
    <span aria-hidden className="font-heading block text-[5.5rem] leading-[0.5]">
      &ldquo;
    </span>
    <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/90">
      {item.quote}
    </blockquote>
    <figcaption className="mt-7">
      <span className="block font-semibold">{item.author}</span>
      {item.role && <span className="block text-foreground/80">{item.role}</span>}
    </figcaption>
  </figure>
)

const Arrow: React.FC<{
  label: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}> = ({ label, onClick, className, children }) => (
  <Button
    aria-label={label}
    className={cn(
      'rounded-full bg-foreground/80 text-background hover:bg-foreground hover:text-background',
      // From `lg` up the pair straddles the outer edge of the two cards either
      // side of the middle one — half a card, a gap and a whole card out from
      // the centre line, exactly as the layout is drawn.
      'lg:absolute lg:top-1/2 lg:z-10 lg:-translate-y-1/2',
      className,
    )}
    onClick={onClick}
    size="icon"
    type="button"
    variant="ghost"
  >
    {children}
  </Button>
)

export const TestimonialsCarousel: React.FC<VariantProps> = ({ heading, intro, items }) => {
  // `pos` is how far the rail has been stepped from its resting place, in
  // cards; `sliding` is off for the one frame that folds it back, so the reader
  // sees the slide but never the jump. They live in one state because they have
  // to change together — a fold with the transition still on is a visible jump.
  const [rail, setRail] = useState({ pos: 0, sliding: true })
  const { pos, sliding } = rail

  const count = items.length
  // A single quote needs no strip and no arrows: one card, centred.
  const halves = count > 1 ? halvesFor(count) : 0
  const strip = Array.from({ length: halves * 2 + 1 }, () => items).flat()
  const base = halves * count

  const step = (delta: 1 | -1) => {
    const animates = !prefersReducedMotion()
    setRail((r) => ({
      // With no transition there is no `transitionend` to fold on, so the
      // position has to come back into range here instead — otherwise it walks
      // off the end of the strip and the rail runs out of cards.
      pos: animates ? r.pos + delta : (r.pos + delta) % count,
      sliding: animates,
    }))
  }

  const onSlideEnd = (event: React.TransitionEvent) => {
    if (event.propertyName !== 'transform') return
    // `% count`, not `− count`: a burst of clicks restarts the transition each
    // time, so only one `transitionend` arrives for the whole burst and the
    // position can be several lists past the limit. Returning the state
    // unchanged when it is already in range lets React skip the re-render.
    setRail((r) => (Math.abs(r.pos) < count ? r : { pos: r.pos % count, sliding: false }))
  }

  // The quote the rail is centred on — the one the arrows are "on".
  const activeIndex = (base + pos) % count

  return (
    // Clip the horizontal axis only: the rail is wider than the page by design,
    // and it must not turn that into a scrollbar.
    <section className="overflow-x-clip py-16 md:py-20">
      <SectionHeader className="container" heading={heading} intro={intro} />
      <div
        className="relative"
        style={{ ...RAIL, '--card': String(base + pos) } as React.CSSProperties}
      >
        <div aria-label="Kundecitater" className="flex justify-center" role="group">
          <div
            className={cn(
              'flex w-max gap-[var(--rail-gap)]',
              sliding && 'transition-transform duration-500 ease-(--ease-settle)',
              'motion-reduce:transition-none',
            )}
            onTransitionEnd={onSlideEnd}
            style={{
              // The flex parent centres the strip, so the slide has to undo that
              // first: `50%` is half the strip's own width (a transform
              // percentage resolves against the transformed box), and the rest
              // walks out to the active card's centre line.
              transform:
                'translateX(calc(50% - (var(--card) * (var(--slot-w) + var(--rail-gap)) + var(--slot-w) / 2)))',
            }}
          >
            {strip.map((item, i) => (
              // Exactly one copy is real to a screen reader; the rest exist so
              // the rail never runs off the end of its own strip. It has to be
              // the copy the rail is *currently* on, not a fixed one — pick the
              // middle copy and one step back would hide the very card the
              // reader is centred on.
              <Card
                hidden={Math.floor(i / count) !== Math.floor((base + pos) / count)}
                item={item}
                key={i}
                tone={(i % count) % 2 === 0 ? 0 : 1}
              />
            ))}
          </div>
        </div>

        {/* The rail is a visual affordance, so stepping it changes nothing a
            screen reader would otherwise notice. This says where you are. */}
        {count > 1 && (
          <p aria-live="polite" className="sr-only">
            Udtalelse {activeIndex + 1} af {count}
          </p>
        )}

        {/* The arrows leave the flow at `lg` (they are `lg:absolute`) and anchor
            to the wrapper above, so only this row's own top margin has to go. */}
        {count > 1 && (
          <div className="mt-8 flex justify-center gap-4 lg:mt-0">
            <Arrow
              className="lg:left-[calc(50%-var(--slot-w)*1.5-var(--rail-gap))] lg:-translate-x-1/2"
              label="Forrige udtalelse"
              onClick={() => step(-1)}
            >
              <ChevronLeft aria-hidden className="size-5" />
            </Arrow>
            <Arrow
              className="lg:left-[calc(50%+var(--slot-w)*1.5+var(--rail-gap))] lg:-translate-x-1/2"
              label="Næste udtalelse"
              onClick={() => step(1)}
            >
              <ChevronRight aria-hidden className="size-5" />
            </Arrow>
          </div>
        )}
      </div>
    </section>
  )
}
