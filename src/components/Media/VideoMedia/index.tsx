'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, onClick, resource, videoClassName } = props

  if (resource && typeof resource === 'object') {
    // Use the resource's own URL (the Payload media endpoint) — NOT the
    // static /media/ path. In production files live in R2 and are streamed
    // through /api/media/file/<name> with Range support; the static path
    // only exists on local disk.
    const { mimeType, updatedAt, url } = resource

    // Autoplays muted (browsers block autoplay WITH sound), but the controls
    // let the viewer unmute, scrub and pause — the videos carry their audio.
    return (
      <video
        autoPlay
        // `fill` mirrors next/image: cover the nearest positioned ancestor —
        // so a video chosen as hero/card media behaves like a photo would.
        className={cn('h-full w-full object-cover', fill && 'absolute inset-0', videoClassName)}
        controls
        loop
        muted
        onClick={onClick}
        playsInline
      >
        <source src={getMediaUrl(url, updatedAt)} type={mimeType || undefined} />
      </video>
    )
  }

  return null
}
