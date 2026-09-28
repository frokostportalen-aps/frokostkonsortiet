'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

import type { FlipCardsBlock as FlipCardsBlockProps } from '@/payload-types'
import type { EyebrowStyle } from '@/themes/dialect'

import { ICON_COMPONENTS } from '@/blocks/IconRow/icons'
import { resolveTone, toneClass } from './options'

import { Eyebrow } from '@/components/Eyebrow'
import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type Card = NonNullable<FlipCardsBlockProps['cards']>[number]
type Props = FlipCardsBlockProps & { eyebrowStyle?: EyebrowStyle }

/** Beyond this many cards the row stops being a row and becomes a rail you
 *  swipe — the one number the design names ("flere end 3"). */
const GRID_MAX = 3

/** How far a mouse has to travel before the gesture counts as dragging the rail
 *  rather than pressing the card under it. Small enough that a deliberate pull
 *  takes hold at once, large enough that a click with an unsteady hand still
 *  turns the card. */
const DRAG_THRESHOLD = 6

/** Both faces share one grid cell, so the card is as tall as its taller face
 *  and neither side can overflow or need its own scrollbar. Grid items stretch
 *  on their own, which is where the faces get their size. */
const FACE =
  'relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-lg backface-hidden'

/**
 * What the browser should download for one card's photo.
 *
 * The two layouts need different answers and only the parent knows which is in
 * play: a rail card is a *fixed* width at every viewport, so asking for `30vw`
 * there fetches two to four times the pixels it can show.
 */
const IMAGE_SIZES = {
  rail: '(max-width: 640px) 240px, 272px',
  grid: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw',
}

/**
 * Which face is showing, as one value rather than a pair of booleans — the
 * three states are mutually exclusive and a pair would leave a fourth
 * combination that means nothing:
 *   • `auto`       – follows the pointer: hover turns the card, leaving turns it back
 *   • `pinned`     – held on the back by a press, hover no longer decides
 *   • `suppressed` – pressed back to the front while the pointer is still on it,
 *                    so hover must stay quiet until the pointer leaves
 */
type Flip = 'auto' | 'pinned' | 'suppressed'

/**
 * One card: a front you see and a back you turn to.
 *
 * Two ways in, per the design ("holde markøren over, eller trykke på det"), and
 * they have to agree or they fight each other. The rule is **hover previews,
 * press pins**: a pointer turns the card while it rests there, a press keeps it
 * turned. Pressing a pinned card turns it back — and suppresses the hover
 * preview until the pointer leaves, or the card would flip straight back under
 * the very finger that closed it.
 *
 * Both faces stay in the document and neither is hidden from assistive tech:
 * a reader who cannot turn a card still gets everything on it, and the one
 * control is the labelled overlay button.
 */
const FlipCard: React.FC<{
  card: Card
  index: number
  eyebrowStyle?: EyebrowStyle
  imageSizes: string
  /** The rail is being pulled, so the pointer is travelling across cards on its
   *  way somewhere — turning each one it crosses would be noise, not a preview. */
  railDragging?: boolean
}> = ({ card, index, eyebrowStyle, imageSizes, railDragging }) => {
  const [flip, setFlip] = useState<Flip>('auto')

  const tone = toneClass[resolveTone(card.tone, index)]
  const Icon = card.icon ? ICON_COMPONENTS[card.icon] : undefined
  const isIconFront = card.front === 'icon'

  // The card label is the site's own small-caps/uppercase/plain voice, like
  // every other label on the page — but it sits on a coloured band, so it
  // inherits that band's text colour instead of the eyebrow's brand colour.
  const label = (
    <Eyebrow className="justify-center text-current" style={eyebrowStyle}>
      {card.label}
    </Eyebrow>
  )

  return (
    <div className="group perspective-distant relative h-full">
      <div
        className={cn(
          'grid h-full transform-3d transition-transform duration-500 ease-(--ease-settle) motion-reduce:transition-none',
          flip === 'pinned' && 'rotate-y-180',
          flip === 'auto' && !railDragging && 'group-hover:rotate-y-180',
        )}
      >
        {/* Front */}
        <div className={cn(FACE, isIconFront && 'bg-secondary text-secondary-foreground')}>
          {isIconFront ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
              {Icon && <Icon className="size-20" strokeWidth={1} />}
              {label}
            </div>
          ) : (
            <>
              <div className="relative aspect-[4/5] bg-secondary">
                {card.image && typeof card.image === 'object' && (
                  <Media fill imgClassName="object-cover" resource={card.image} size={imageSizes} />
                )}
              </div>
              <div className={cn('flex flex-1 items-center justify-center px-4 py-5', tone)}>
                {label}
              </div>
            </>
          )}

          {/* The affordance the design draws as an arrow: something here turns. */}
          <span
            aria-hidden
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition group-hover:bg-background"
          >
            <RotateCw className="size-4" strokeWidth={1.75} />
          </span>
        </div>

        {/* Back */}
        <div className={cn(FACE, 'justify-center rotate-y-180 p-6 text-center md:p-7', tone)}>
          <h3 className="font-heading text-xl font-semibold uppercase tracking-tight">
            {card.title}
          </h3>
          {card.subtitle && <p className="mt-1 text-sm opacity-80">{card.subtitle}</p>}
          {card.body && <p className="mt-4 text-sm leading-relaxed opacity-90">{card.body}</p>}

          {card.lines && card.lines.length > 0 && (
            <ul className="mt-5 flex flex-col gap-3 text-left text-sm">
              {card.lines.map((line, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="leading-snug">
                    {line.name}
                    {line.note && <span className="block text-xs opacity-70">{line.note}</span>}
                  </span>
                  {/* The dotted leader, as on the menukort. */}
                  <span
                    aria-hidden
                    className="min-w-4 flex-1 -translate-y-0.5 border-b border-dotted border-current opacity-40"
                  />
                  <span className="font-heading whitespace-nowrap font-semibold">{line.price}</span>
                </li>
              ))}
            </ul>
          )}

          {card.note && <p className="mt-6 text-xs opacity-70">{card.note}</p>}
        </div>
      </div>

      {/* One control over the whole card — the press target the design asks for,
          and the only thing in here a keyboard has to reach. */}
      <button
        aria-label={`Vend kortet: ${card.label}`}
        aria-pressed={flip === 'pinned'}
        className="absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        onClick={() => setFlip((f) => (f === 'pinned' ? 'suppressed' : 'pinned'))}
        onPointerLeave={() => setFlip((f) => (f === 'suppressed' ? 'auto' : f))}
        type="button"
      />
    </div>
  )
}

/**
 * A row of cards that turn over. Up to three stand side by side as drawn; from
 * the fourth the row becomes a scroll-snapped rail — swipeable by hand on
 * touch, stepped by the arrows on a pointer, and scrollable by keyboard
 * because the rail itself takes focus.
 *
 * The rail is native overflow rather than a transformed strip (the way the
 * testimonials carousel is built): this one is finite and its cards are
 * interactive, and a real scroll container is what gives touch its momentum and
 * keeps focus scrolled into view for free.
 */
export const FlipCardsClient: React.FC<Props> = ({
  heading,
  eyebrow,
  intro,
  cards,
  eyebrowStyle,
}) => {
  const railRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  // Only the *state* of dragging is React's — the scroll position itself is
  // written straight to the element, so a pull costs no renders per frame.
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ startX: 0, startLeft: 0, moved: false, active: false })

  const isRail = (cards?.length ?? 0) > GRID_MAX

  const onScroll = useCallback(() => {
    const el = railRef.current
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
  useEffect(() => {
    if (!isRail) return
    onScroll()
    window.addEventListener('resize', onScroll)
    return () => window.removeEventListener('resize', onScroll)
  }, [isRail, onScroll])

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
    const el = railRef.current
    if (!el || event.pointerType === 'touch' || event.button !== 0) return
    drag.current = { startX: event.clientX, startLeft: el.scrollLeft, moved: false, active: true }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const el = railRef.current
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
    railRef.current?.releasePointerCapture(event.pointerId)
  }

  // Capture phase: this runs before the card's own button sees the click, so a
  // pull that happens to end on a card doesn't also turn it over.
  const swallowClickAfterDrag = (event: React.MouseEvent) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    event.preventDefault()
    event.stopPropagation()
  }

  const step = (direction: 1 | -1) => {
    const el = railRef.current
    const first = el?.children[0] as HTMLElement | undefined
    const second = el?.children[1] as HTMLElement | undefined
    if (!el || !first || !second) return
    // One card plus its gap, measured off the rail itself — the widths are set
    // in CSS and a number duplicated here would drift the first time they move.
    el.scrollBy({ left: (second.offsetLeft - first.offsetLeft) * direction })
  }

  if (!cards?.length) return null

  const gridCols =
    cards.length === 1
      ? 'mx-auto max-w-[22rem]'
      : cards.length === 2
        ? 'mx-auto max-w-[46rem] sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="container">
      <SectionHeader
        heading={heading}
        eyebrow={eyebrow}
        intro={intro}
        eyebrowStyle={eyebrowStyle}
      />

      <ul
        aria-label={isRail ? 'Kort – rul til siden for at se flere' : undefined}
        className={
          isRail
            ? cn(
                // Scrolling one axis makes the browser clip the other, and the
                // flip lifts a card's near edge ~24px out of the rail's box —
                // enough to shave its corners mid-turn and cut the focus ring
                // off a card at either end. The padding gives that room back
                // and the matching negative margin keeps the section's spacing
                // exactly as it was.
                'flex gap-5 overflow-x-auto -mx-4 -my-8 px-4 py-8 md:gap-6',
                // The scrollbar is drawn along the bottom of the padding box —
                // which the negative margin has pulled the arrow row into — so
                // on any platform with classic scrollbars (macOS the moment a
                // mouse is plugged in, Windows always) it runs through the
                // buttons. Nothing is lost by hiding it: the rail is already
                // steerable by arrows, drag, swipe and keyboard.
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                // Snapping and smooth scrolling both fight a hand on the rail:
                // one keeps tugging the cards back to their marks mid-pull, the
                // other animates towards every position the drag passes
                // through. They come back on release, which is what settles the
                // rail onto the nearest card.
                dragging
                  ? 'cursor-grabbing snap-none select-none scroll-auto'
                  : 'cursor-grab snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto',
              )
            : cn('grid gap-6 md:gap-8', gridCols)
        }
        onClickCapture={isRail ? swallowClickAfterDrag : undefined}
        onPointerCancel={isRail ? endDrag : undefined}
        onPointerDown={isRail ? onPointerDown : undefined}
        onPointerMove={isRail ? onPointerMove : undefined}
        onPointerUp={isRail ? endDrag : undefined}
        onScroll={isRail ? onScroll : undefined}
        ref={railRef}
        tabIndex={isRail ? 0 : undefined}
      >
        {cards.map((card, i) => (
          <li className={cn(isRail && 'w-60 shrink-0 snap-start sm:w-68')} key={card.id ?? i}>
            <FlipCard
              card={card}
              eyebrowStyle={eyebrowStyle}
              imageSizes={isRail ? IMAGE_SIZES.rail : IMAGE_SIZES.grid}
              index={i}
              railDragging={dragging}
            />
          </li>
        ))}
      </ul>

      {isRail && (
        <div className="mt-6 flex justify-center gap-3">
          <Button
            aria-label="Forrige kort"
            disabled={edges.start}
            onClick={() => step(-1)}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </Button>
          <Button
            aria-label="Næste kort"
            disabled={edges.end}
            onClick={() => step(1)}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronRight aria-hidden className="size-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
