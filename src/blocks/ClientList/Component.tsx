import React from 'react'

import type { ClientListBlock as ClientListBlockProps } from '@/payload-types'

/**
 * A typographic "logo wall": the workplaces already eating with us, set in the
 * tenant's heading face. Social proof without needing a single logo file.
 */
export const ClientListBlock: React.FC<ClientListBlockProps> = ({ heading, clients }) => {
  if (!clients?.length) return null

  return (
    <div className="container text-center">
      {heading && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {heading}
        </p>
      )}
      <ul className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4">
        {clients.map((client, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span className="font-heading whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/55 md:text-xl">
              {client.name}
            </span>
            {i < clients.length - 1 && (
              <span aria-hidden className="size-1 rounded-full bg-primary/50" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
