'use client'

import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, Maximize2, XIcon } from 'lucide-react'

import type { GalleryBlock as GalleryBlockProps, Media as MediaType } from '@/payload-types'
import type { EyebrowStyle } from '@/themes/dialect'

import { resolveTone, toneClass } from '@/utilities/tones'

import { CARD_PRESS, CardBadge, CardBand } from '@/components/CardChrome'
import { Media } from '@/components/Media'
import { RailArrows, useRail } from '@/components/Rail'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

type Item = NonNullable<GalleryBlockProps['images']>[number]
type Shown = Item & { image: MediaType }
type Props = GalleryBlockProps & { eyebrowStyle?: EyebrowStyle }

/** What names a picture to someone who can't see it: its caption, else its alt text. */
const describe = (item: Shown) => item.caption || item.image.alt || 'Billede'

/**
 * One picture, drawn as the front of a vendekort: the photo in 4:5 and, when
 * there is a caption, the coloured band under it in the site's label voice.
 * Where the vendekort shows a turn arrow, this shows an expand mark — the
 * press opens the picture large instead of turning it.
 *
 * Memoised with a stable `onOpen`, so stepping through the lightbox doesn't
 * re-render every card in the row behind it.
 */
const GalleryCard = memo<{
  item: Shown
  index: number
  /** Place among the *captioned* pictures — the ones with a band to colour. */
  bandIndex: number
  eyebrowStyle?: EyebrowStyle
  imageSizes: string
  onOpen: (index: number) => void
  /** The rail is being pulled — as on the vendekort, the cards the pointer
   *  crosses on its way somewhere shouldn't react to it. */
  railDragging: boolean
}>(function GalleryCard({
  item,
  index,
  bandIndex,
  eyebrowStyle,
  imageSizes,
  onOpen,
  railDragging,
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg">
      {/* In a row that mixes captioned and bare pictures, the bare ones take the
          band's height as more photo, so every card still ends on one line. */}
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden bg-secondary',
          !item.caption && 'grow',
        )}
      >
        <Media
          fill
          imgClassName={cn(
            'object-cover transition-transform duration-500 ease-(--ease-settle) motion-reduce:transition-none',
            !railDragging && 'group-hover:scale-[1.03]',
          )}
          resource={item.image}
          size={imageSizes}
        />
      </div>
      {item.caption && (
        <CardBand eyebrowStyle={eyebrowStyle} tone={toneClass[resolveTone(item.tone, bandIndex)]}>
          {item.caption}
        </CardBand>
      )}

      <CardBadge icon={Maximize2} />

      <button
        aria-label={`Vis stort: ${describe(item)}`}
        className={CARD_PRESS}
        data-gallery-index={index}
        onClick={() => onOpen(index)}
        type="button"
      />
    </div>
  )
})

const NAV_BUTTON =
  'flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * The picture large, over a dimmed page. Radix gives it the dialog contract —
 * focus moved in and trapped, Esc to close — and the arrow keys step through
 * the set, wrapping at the ends since a lightbox has no reason to stop.
 *
 * Open and index are separate on purpose: closing only drops `open`, so the
 * picture is still there to fade out with the overlay.
 *
 * Focus is handed back by hand: the dialog is opened from state rather than a
 * `Dialog.Trigger`, so Radix has no trigger to return to, and `onReturnFocus`
 * puts it back on the card of the picture last shown.
 */
const Lightbox: React.FC<{
  items: Shown[]
  index: number
  open: boolean
  onStep: (index: number) => void
  onClose: () => void
  onReturnFocus: (index: number) => void
}> = ({ items, index, open, onStep, onClose, onReturnFocus }) => (
  <Dialog.Root onOpenChange={(next) => !next && onClose()} open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <LightboxContent
        index={index}
        item={items[index]!}
        onClose={onClose}
        onReturnFocus={() => onReturnFocus(index)}
        onStep={(direction) => onStep((index + direction + items.length) % items.length)}
        total={items.length}
      />
    </Dialog.Portal>
  </Dialog.Root>
)

/** Room the frame loses to its padding, the caption rows and the gap between them. */
const FRAME_CHROME_HEIGHT = '10rem'

/**
 * What the browser should download for the large picture. It is contained in
 * a frame the viewport less the chrome, so a portrait photo shows only as wide
 * as its height allows — asking for the frame's full width would fetch two to
 * three times the pixels on every step.
 */
const lightboxSizes = (image: MediaType) => {
  const phone = 'calc(100vw - 2rem)'
  const wide = 'calc(100vw - 12rem)'
  if (!image.width || !image.height) return `(max-width: 640px) ${phone}, ${wide}`
  // `svh` is the viewport with the mobile toolbars showing — the height the
  // picture actually gets.
  const byHeight = `calc((100svh - ${FRAME_CHROME_HEIGHT}) * ${(image.width / image.height).toFixed(3)})`
  // A browser that can't parse `min()` or `svh` in `sizes` drops that entry
  // and takes the next one, so each fitted size is followed by its plain
  // frame width rather than letting the whole list fall back to 100vw.
  return [
    `(max-width: 640px) min(${phone}, ${byHeight})`,
    `(max-width: 640px) ${phone}`,
    `min(${wide}, ${byHeight})`,
    wide,
  ].join(', ')
}

/**
 * One pair of arrows: beside the picture from `sm`, and dropped into the
 * bottom corners on a phone, where the picture needs the full width.
 */
const LightboxContent: React.FC<{
  item: Shown
  index: number
  total: number
  onStep: (direction: 1 | -1) => void
  onClose: () => void
  onReturnFocus: () => void
}> = ({ item, index, total, onStep, onClose, onReturnFocus }) => {
  const many = total > 1

  const arrow = (direction: 1 | -1) =>
    many && (
      <button
        aria-label={direction === 1 ? 'Næste billede' : 'Forrige billede'}
        className={cn(
          NAV_BUTTON,
          'max-sm:absolute max-sm:bottom-4',
          direction === 1 ? 'max-sm:right-4' : 'max-sm:left-4',
        )}
        onClick={() => onStep(direction)}
        type="button"
      >
        {direction === 1 ? (
          <ChevronRight aria-hidden className="size-6" />
        ) : (
          <ChevronLeft aria-hidden className="size-6" />
        )}
      </button>
    )

  return (
    <Dialog.Content
      aria-describedby={undefined}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:p-10"
      onCloseAutoFocus={(event) => {
        event.preventDefault()
        onReturnFocus()
      }}
      // The content covers the whole screen, so Radix never sees a click
      // "outside" it. The dark space is closed by hand instead: the boxes that
      // make it up are marked as backdrop, and a primary press landing on one
      // of them — not on the picture, its text or a control — closes.
      data-lightbox-backdrop=""
      onPointerDown={(event) => {
        if (
          event.button === 0 &&
          (event.target as HTMLElement).hasAttribute('data-lightbox-backdrop')
        )
          onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') onStep(1)
        if (event.key === 'ArrowLeft') onStep(-1)
      }}
    >
      <Dialog.Title className="sr-only">{describe(item)}</Dialog.Title>

      <div
        className="flex w-full min-h-0 flex-1 items-center gap-2 md:gap-4"
        data-lightbox-backdrop=""
      >
        {arrow(-1)}
        {/* The picture is drawn at its own size inside the frame, not filled
            across it, so the dark bars beside a portrait photo are the frame —
            backdrop — rather than transparent parts of the image. */}
        <div
          className="flex h-full min-h-0 min-w-0 flex-1 items-center justify-center"
          data-lightbox-backdrop=""
        >
          {/* No wrapper of Media's own: the <img> has to be the frame's direct
              flex child for `max-h-full` to resolve against the frame. */}
          <Media
            htmlElement={null}
            imgClassName="h-auto max-h-full w-auto max-w-full"
            key={item.image.id}
            pictureClassName="contents"
            loading="eager"
            resource={item.image}
            size={lightboxSizes(item.image)}
          />
        </div>
        {arrow(1)}
      </div>

      {/* On a phone the arrows sit in this row's corners; the padding keeps
          the caption clear of them. */}
      <div
        className="w-full max-w-3xl text-center text-white max-sm:min-h-11 max-sm:px-14"
        data-lightbox-backdrop=""
      >
        {item.caption && <p className="mx-auto w-fit text-sm md:text-base">{item.caption}</p>}
        {many && (
          <p aria-live="polite" className="mx-auto mt-1 w-fit text-xs tabular-nums text-white/60">
            {index + 1} / {total}
          </p>
        )}
      </div>

      <Dialog.Close
        aria-label="Luk"
        className={cn(NAV_BUTTON, 'absolute right-4 top-4 md:right-6 md:top-6')}
      >
        <XIcon aria-hidden className="size-5" />
      </Dialog.Close>
    </Dialog.Content>
  )
}

/**
 * A row of pictures in the vendekort's look. Up to three stand side by side;
 * from the fourth the row becomes the same rail the vendekort use, so the two
 * blocks move alike. A press opens the picture in the lightbox.
 */
export const GalleryClient: React.FC<Props> = ({
  heading,
  eyebrow,
  intro,
  images,
  eyebrowStyle,
}) => {
  // A picture whose upload is gone (deleted media, unpopulated depth) has
  // nothing to show — drop it rather than draw an empty card.
  const items = useMemo(
    () =>
      (images ?? []).filter(
        (item): item is Shown => Boolean(item.image) && typeof item.image === 'object',
      ),
    [images],
  )
  const rowRef = useRef<HTMLDivElement>(null)
  const returnFocus = useCallback((index: number) => {
    rowRef.current?.querySelector<HTMLElement>(`[data-gallery-index="${index}"]`)?.focus()
  }, [])
  const rail = useRail(items.length)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  if (!items.length) return null

  // Clamped, because live preview can take pictures away under an open
  // lightbox — and an index past the end would leave the overlay up with no
  // content (and so no way to close it) on top of it.
  const shown = Math.min(index, items.length - 1)
  // "Skiftevis" walks the bands that are actually drawn: counting the bare
  // pictures too would skip steps and could set the two dark tones side by side.
  let band = 0

  return (
    <div className="container" ref={rowRef}>
      <SectionHeader
        heading={heading}
        eyebrow={eyebrow}
        intro={intro}
        eyebrowStyle={eyebrowStyle}
      />

      <ul
        aria-label={rail.isRail ? 'Billeder – rul til siden for at se flere' : undefined}
        {...rail.listProps}
      >
        {items.map((item, i) => (
          <li className={rail.itemClassName} key={item.id ?? i}>
            <GalleryCard
              eyebrowStyle={eyebrowStyle}
              imageSizes={rail.imageSizes}
              bandIndex={item.caption ? band++ : band}
              index={i}
              item={item}
              onOpen={openAt}
              railDragging={rail.dragging}
            />
          </li>
        ))}
      </ul>

      {rail.isRail && (
        <RailArrows labels={{ prev: 'Forrige billeder', next: 'Næste billeder' }} rail={rail} />
      )}

      <Lightbox
        index={shown}
        items={items}
        onClose={() => setOpen(false)}
        onReturnFocus={returnFocus}
        onStep={setIndex}
        open={open}
      />
    </div>
  )
}
