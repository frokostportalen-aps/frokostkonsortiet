import React from 'react'

import type { TestimonialsBlock as Props } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

type Item = NonNullable<Props['items']>[number]

/** Up to two initials from a name, for the fallback avatar. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')

const Card: React.FC<{ item: Item }> = ({ item }) => {
  const { quote, author, role } = item

  return (
    // `mr-5` (not flex gap) so each card owns its trailing space — the track
    // duplicates the cards and animates by exactly -50%, so the trailing margin
    // has to be part of every card for the loop to be seamless.
    // Hover choreography (Tailwind): the marquee is the `group`, so hovering it
    // dims every card (`group-hover:opacity-60`); the card under the cursor wins
    // that back with `hover:!opacity-100` (the `!` beats group-hover's higher
    // specificity) and lifts + lights up its border.
    <figure className="mr-5 flex w-[19rem] shrink-0 flex-col gap-4 rounded-[calc(var(--radius)*1.25)] border border-border bg-card p-7 shadow-sm transition duration-300 group-hover:opacity-60 hover:!opacity-100 hover:-translate-y-1.5 hover:border-primary hover:shadow-xl md:w-[22rem]">
      <span aria-hidden className="font-serif text-5xl leading-[0.4] text-primary/40">
        &ldquo;
      </span>
      <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-card-foreground/90">
        {quote}
      </blockquote>
      <figcaption className="mt-2 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials(author)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{author}</span>
          {role && <span className="text-xs text-muted-foreground">{role}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

// Enough cards in one group that it always overflows even an ultra-wide screen.
// The seamless loop relies on one group being at least as wide as the viewport;
// otherwise empty space appears on one side before the cycle wraps.
const MIN_CARDS_PER_GROUP = 9

const Row: React.FC<{ items: Item[]; direction: 'ltr' | 'rtl' }> = ({ items, direction }) => {
  // Repeat the row's cards into a "group" wide enough to fill the screen, then
  // render the group twice. The two groups are identical, so the CSS loop's
  // -50% shift lands the copy exactly where the original was — no jump, no gap.
  const repeats = Math.max(2, Math.ceil(MIN_CARDS_PER_GROUP / items.length))
  const group = Array.from({ length: repeats }).flatMap(() => items)

  // Keep the scroll speed constant regardless of how many cards a group holds:
  // ~6s of travel per card.
  const duration = `${group.length * 6}s`
  const animation = direction === 'rtl' ? 'animate-testimonial-rtl' : 'animate-testimonial-ltr'
  const cards = group.map((item, i) => <Card key={i} item={item} />)

  return (
    // Pauses when the marquee (the `group`) is hovered; reduced-motion stops the
    // scroll and lets the row wrap into a centred grid instead.
    <div
      className={`flex w-max ${animation} group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center`}
      style={{ '--testimonial-duration': duration } as React.CSSProperties}
    >
      {cards}
      {/* Identical second copy, aria-hidden so screen readers hear each quote once. */}
      <div aria-hidden className="flex w-max">
        {cards}
      </div>
    </div>
  )
}

export const TestimonialsBlock: React.FC<Props> = ({ heading, intro, items }) => {
  if (!items?.length) return null

  // Two opposing rows built from DISJOINT halves (odd/even), so the same quote
  // never scrolls past twice in the viewport at once.
  const twoRows = items.length >= 6
  const rows: Item[][] = twoRows
    ? [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)]
    : [items]

  return (
    // Clip only the horizontal axis: the wide tracks must not create a
    // scrollbar, but the cards' shadow and hover-lift need to stay visible
    // vertically (overflow-hidden would crop the top/bottom row, obvious on zoom).
    // The tinted full-bleed band sets the voices apart from the white page —
    // the tenant's own `secondary` surface, so the break stays in-family.
    <section className="overflow-x-clip bg-secondary/60 py-16 md:py-20">
      <SectionHeader heading={heading} intro={intro} className="container mb-10" />
      {/* `group` drives the hover pause + dim on the tracks/cards below; py gives
          the shadow + hover-lift room so they aren't clipped. */}
      <div className="testimonial-marquee group flex flex-col gap-5 py-3">
        {rows.map((row, i) => (
          <Row key={i} items={row} direction={i % 2 === 1 ? 'rtl' : 'ltr'} />
        ))}
      </div>
    </section>
  )
}
