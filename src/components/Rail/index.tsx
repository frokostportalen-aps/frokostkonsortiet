'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

/** Beyond this many cards the row stops being a row and becomes a rail you
 *  swipe — the one number the design names ("flere end 3"). */
const GRID_MAX = 3

/** How far a mouse has to travel before the gesture counts as dragging the rail
 *  rather than pressing the card under it. Small enough that a deliberate pull
 *  takes hold at once, large enough that a click with an unsteady hand still
 *  lands on the card. */
const DRAG_THRESHOLD = 6

/**
 * A horizontal, scroll-snapped rail of cards — swipeable by hand on touch,
 * draggable with a mouse, stepped by the arrows and scrollable by keyboard
 * because the rail itself takes focus. Shared by the rows that outgrow a grid
 * (vendekort, galleri), so they move exactly alike.
 *
 * The rail is native overflow rather than a transformed strip (the way the
 * testimonials carousel is built): it is finite and its cards are interactive,
 * and a real scroll container is what gives touch its momentum and keeps focus
 * scrolled into view for free.
 *
 * The hook owns the whole layout decision, not just the rail half: up to
 * `GRID_MAX` cards stand side by side as a grid, and from the next one the row
 * becomes the rail. Callers pass the count and spread what comes back, so the
 * break, the grid widths and the image sizes can't drift between blocks.
 */
export const useRail = (count: number) => {
  const enabled = count > GRID_MAX
  const ref = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  // Only the *state* of dragging is React's — the scroll position itself is
  // written straight to the element, so a pull costs no renders per frame.
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ startX: 0, startLeft: 0, moved: false, active: false })

  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    // A fractional scroll position never lands exactly on the end, so leave a
    // pixel of slack rather than an arrow that can't be switched off.
    const start = el.scrollLeft <= 1
    const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
    // Returning the state unchanged lets React skip the re-render — this runs
    // on every scroll tick, and the answer only changes twice per traversal.
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  // Settle the arrows against the rail as it actually is: on a screen wide
  // enough to show every card there is nothing to scroll, and both arrows have
  // to start out switched off rather than wait for a scroll that never comes.
  // The rail's own box is what's watched, not the window — its width also
  // moves with the container — and `count` re-runs this when a card is added
  // in live preview, which grows the content without resizing the box.
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    onScroll()
    const observer = new ResizeObserver(onScroll)
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, count, onScroll])

  /**
   * Grabbing the rail and pulling it.
   *
   * Touch is deliberately left alone: a native scroll container already pans
   * with a finger, and it does it better than this could — momentum, rubber
   * band at the ends, the platform's own feel. Taking those events over would
   * be a downgrade. A mouse gets nothing for free, so it is the one that needs
   * the handler; a pen behaves like a mouse here and is treated as one.
   *
   * The catch is that every card carries a full-size button, so a pull and a
   * press start identically. Nothing happens until the pointer has travelled
   * `DRAG_THRESHOLD`; after that the gesture is a drag, and the click that
   * follows is swallowed in the capture phase before it can reach the card.
   */
  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current
    if (!el || event.pointerType === 'touch' || event.button !== 0) return
    drag.current = { startX: event.clientX, startLeft: el.scrollLeft, moved: false, active: true }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current
    if (!el || !drag.current.active) return
    const dx = event.clientX - drag.current.startX

    if (!drag.current.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      drag.current.moved = true
      setDragging(true)
      // Keep receiving moves when the pointer leaves the rail mid-pull, and
      // guarantee the matching pointerup even if it is released elsewhere.
      el.setPointerCapture(event.pointerId)
    }

    el.scrollLeft = drag.current.startLeft - dx
  }

  const endDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    if (!drag.current.moved) return
    setDragging(false)
    ref.current?.releasePointerCapture(event.pointerId)
    // The click a drag leaves behind is dispatched in the same task as the
    // pointerup, so clearing the flag on the next one lets `swallowClickAfterDrag`
    // see it — and still clears it when no click comes (a cancelled pointer, a
    // release off the rail). Left set, it would eat the next click the rail
    // gets, keyboard ones included.
    setTimeout(() => {
      drag.current.moved = false
    })
  }

  // Capture phase: this runs before the card's own button sees the click, so a
  // pull that happens to end on a card doesn't also press it.
  const swallowClickAfterDrag = (event: React.MouseEvent) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    event.preventDefault()
    event.stopPropagation()
  }

  const step = (direction: 1 | -1) => {
    const el = ref.current
    const first = el?.children[0] as HTMLElement | undefined
    const second = el?.children[1] as HTMLElement | undefined
    if (!el || !first || !second) return
    // One card plus its gap, measured off the rail itself — the widths are set
    // in CSS and a number duplicated here would drift the first time they move.
    el.scrollBy({ left: (second.offsetLeft - first.offsetLeft) * direction })
  }

  const className = cn(
    // Scrolling one axis makes the browser clip the other, and a card that
    // lifts or turns pokes out of the rail's box — enough to shave its corners
    // and cut the focus ring off a card at either end. The padding gives that
    // room back and the matching negative margin keeps the section's spacing
    // exactly as it was.
    'flex gap-5 overflow-x-auto -mx-4 -my-8 px-4 py-8 md:gap-6',
    // The scrollbar is drawn along the bottom of the padding box — which the
    // negative margin has pulled the arrow row into — so on any platform with
    // classic scrollbars (macOS the moment a mouse is plugged in, Windows
    // always) it runs through the buttons. Nothing is lost by hiding it: the
    // rail is already steerable by arrows, drag, swipe and keyboard.
    '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    // Snapping and smooth scrolling both fight a hand on the rail: one keeps
    // tugging the cards back to their marks mid-pull, the other animates
    // towards every position the drag passes through. They come back on
    // release, which is what settles the rail onto the nearest card.
    dragging
      ? 'cursor-grabbing snap-none select-none scroll-auto'
      : 'cursor-grab snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto',
  )

  return {
    dragging,
    edges,
    isRail: enabled,
    step,
    /** Spread onto the `<ul>`: the rail's handlers, or the grid's columns. */
    listProps: enabled
      ? {
          className,
          onClickCapture: swallowClickAfterDrag,
          onPointerCancel: endDrag,
          onPointerDown,
          onPointerMove,
          onPointerUp: endDrag,
          onScroll,
          ref,
          tabIndex: 0,
        }
      : { className: cn('grid gap-6 md:gap-8', GRID_COLS[count] ?? GRID_COLS[3]), ref },
    /** For each `<li>`: a fixed width on the rail, the grid cell otherwise. */
    itemClassName: enabled ? RAIL_ITEM : undefined,
    /** What the browser should download for one card's photo (see `IMAGE_SIZES`). */
    imageSizes: enabled ? IMAGE_SIZES.rail : (IMAGE_SIZES[count] ?? IMAGE_SIZES[3]),
  }
}

export type Rail = ReturnType<typeof useRail>

/** One or two cards stay at a card's width, centred, rather than stretching. */
const GRID_COLS: Record<number, string> = {
  1: 'mx-auto max-w-[22rem]',
  2: 'mx-auto max-w-[46rem] sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
}

/** The width each card takes on the rail. */
const RAIL_ITEM = 'w-60 shrink-0 snap-start sm:w-68'

/**
 * The `sizes` for each layout, kept next to the widths they describe. A rail
 * card is a *fixed* width at every viewport, and one or two grid cards are
 * capped by `GRID_COLS` — asking for a share of the viewport there fetches two
 * to four times the pixels the card can show.
 */
const IMAGE_SIZES: Record<number | 'rail', string> = {
  rail: '(max-width: 640px) 240px, 272px',
  // The single card is capped at 22rem at every width, phones included.
  1: '(max-width: 390px) 90vw, 352px',
  2: '(max-width: 640px) 90vw, 360px',
  3: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw',
}

/** The previous/next pair under a rail, switched off at either end. */
export const RailArrows: React.FC<{
  rail: Pick<Rail, 'edges' | 'step'>
  labels: { prev: string; next: string }
}> = ({ rail: { edges, step }, labels }) => (
  <div className="mt-6 flex justify-center gap-3">
    <Button
      aria-label={labels.prev}
      disabled={edges.start}
      onClick={() => step(-1)}
      size="icon"
      type="button"
      variant="outline"
    >
      <ChevronLeft aria-hidden className="size-5" />
    </Button>
    <Button
      aria-label={labels.next}
      disabled={edges.end}
      onClick={() => step(1)}
      size="icon"
      type="button"
      variant="outline"
    >
      <ChevronRight aria-hidden className="size-5" />
    </Button>
  </div>
)
