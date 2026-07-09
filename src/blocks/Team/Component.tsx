import React from 'react'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'

/**
 * The people behind the food: portraits with a personal one-liner. Faces build
 * the trust a B2B lunch buyer is actually shopping for.
 */
export const TeamBlock: React.FC<TeamBlockProps> = ({ heading, intro, members }) => {
  if (!members?.length) return null

  const cols =
    members.length === 1
      ? 'mx-auto max-w-[26rem]'
      : members.length === 2
        ? 'sm:grid-cols-2 mx-auto max-w-[56rem]'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="container">
      <SectionHeader heading={heading} intro={intro} className="mb-10" />

      <div className={`grid gap-8 md:gap-10 ${cols}`}>
        {members.map((member, i) => (
          <figure key={i} className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)]">
              {member.image && typeof member.image === 'object' && (
                <Media fill imgClassName="object-cover" resource={member.image} size="33vw" />
              )}
            </div>
            <figcaption className="mt-5">
              <p className="font-heading text-xl font-semibold tracking-tight">
                {member.name}
              </p>
              {member.role && <p className="mt-0.5 text-sm text-muted-foreground">{member.role}</p>}
              {member.quote && (
                <blockquote className="mt-3 border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
