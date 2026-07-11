'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mid-page videos are multi-MB files — with `autoPlay` they'd all download
  // at page load and compete with the hero image. Start playback (and the
  // bulk of the download) only when the video nears the viewport, and pause
  // it again when it scrolls away.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [resource])

  if (resource && typeof resource === 'object') {
    // Use the resource's own URL (the Payload media endpoint) — NOT the
    // static /media/ path. In production files live in R2 and are streamed
    // through /api/media/file/<name> with Range support; the static path
    // only exists on local disk.
    const { mimeType, updatedAt, url } = resource

    // Plays muted (browsers block autoplay WITH sound), but the controls
    // let the viewer unmute, scrub and pause — the videos carry their audio.
    return (
      <video
        ref={videoRef}
        // `fill` mirrors next/image: cover the nearest positioned ancestor —
        // so a video chosen as hero/card media behaves like a photo would.
        className={cn('h-full w-full object-cover', fill && 'absolute inset-0', videoClassName)}
        controls
        loop
        muted
        onClick={onClick}
        playsInline
        preload="metadata"
      >
        <source src={getMediaUrl(url, updatedAt)} type={mimeType || undefined} />
      </video>
    )
  }

  return null
}
