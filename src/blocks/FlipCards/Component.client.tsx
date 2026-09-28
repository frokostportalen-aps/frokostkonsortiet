'use client'

import React, { useState } from 'react'
import { RotateCw } from 'lucide-react'

import type { FlipCardsBlock as FlipCardsBlockProps } from '@/payload-types'
import type { EyebrowStyle } from '@/themes/dialect'

import { ICON_COMPONENTS } from '@/blocks/IconRow/icons'
import { resolveTone, toneClass } from '@/utilities/tones'

import { CARD_PRESS, CardBadge, CardBand, CardLabel } from '@/components/CardChrome'
import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { RailArrows, useRail } from '@/components/Rail'
import { cn } from '@/utilities/ui'

type Card = NonNullable<FlipCardsBlockProps['cards']>[number]
type Props = FlipCardsBlockProps & { eyebrowStyle?: EyebrowStyle }

/** Both faces share one grid cell, so the card is as tall as its taller face
 *  and neither side can overflow or need its own scrollbar. Grid items stretch
 *  on their own, which is where the faces get their size. */
const FACE =
  'relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-lg backface-hidden'

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
              <CardLabel eyebrowStyle={eyebrowStyle}>{card.label}</CardLabel>
            </div>
          ) : (
            <>
              <div className="relative aspect-[4/5] bg-secondary">
                {card.image && typeof card.image === 'object' && (
                  <Media fill imgClassName="object-cover" resource={card.image} size={imageSizes} />
                )}
              </div>
              <CardBand eyebrowStyle={eyebrowStyle} tone={tone}>
                {card.label}
              </CardBand>
            </>
          )}

          {/* The affordance the design draws as an arrow: something here turns. */}
          <CardBadge icon={RotateCw} />
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
        className={CARD_PRESS}
        onClick={() => setFlip((f) => (f === 'pinned' ? 'suppressed' : 'pinned'))}
        onPointerLeave={() => setFlip((f) => (f === 'suppressed' ? 'auto' : f))}
        type="button"
      />
    </div>
  )
}

/**
 * A row of cards that turn over. Up to three stand side by side as drawn; from
 * the fourth the row becomes a scroll-snapped rail (see `useRail`).
 */
export const FlipCardsClient: React.FC<Props> = ({
  heading,
  eyebrow,
  intro,
  cards,
  eyebrowStyle,
}) => {
  const rail = useRail(cards?.length ?? 0)

  if (!cards?.length) return null

  return (
    <div className="container">
      <SectionHeader
        heading={heading}
        eyebrow={eyebrow}
        intro={intro}
        eyebrowStyle={eyebrowStyle}
      />

      <ul
        aria-label={rail.isRail ? 'Kort – rul til siden for at se flere' : undefined}
        {...rail.listProps}
      >
        {cards.map((card, i) => (
          <li className={rail.itemClassName} key={card.id ?? i}>
            <FlipCard
              card={card}
              eyebrowStyle={eyebrowStyle}
              imageSizes={rail.imageSizes}
              index={i}
              railDragging={rail.dragging}
            />
          </li>
        ))}
      </ul>

      {rail.isRail && (
        <RailArrows labels={{ prev: 'Forrige kort', next: 'Næste kort' }} rail={rail} />
      )}
    </div>
  )
}
