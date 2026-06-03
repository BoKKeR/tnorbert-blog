'use client'

import type { StaticImageData } from 'next/image'
import { cn } from 'src/utilities/cn'
import React, { useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import { useLightbox } from '@/components/Lightbox'
import { getClientSideURL } from '@/utilities/getURL'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  const { register, open } = useLightbox()
  const idRef = useRef<string>('')

  useEffect(() => {
    if (typeof media !== 'object' || !media || !media.url) return
    const { id, unregister } = register({
      src: `${getClientSideURL()}${media.url}`,
      alt: media.alt || '',
      caption: media.caption ?? null,
      width: media.width ?? undefined,
      height: media.height ?? undefined,
    })
    idRef.current = id
    return unregister
  }, [register, media])

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={cn('', { container: enableGutter }, className)}>
      <button
        type="button"
        className="w-full cursor-zoom-in block border-0 bg-transparent p-0"
        onClick={() => {
          if (idRef.current) open(idRef.current)
        }}
        aria-label={
          media && typeof media === 'object' && media.alt
            ? `Enlarge: ${media.alt}`
            : 'Enlarge image'
        }
        title="Click to enlarge"
      >
        <Media
          imgClassName={cn('border border-border rounded-[0.4rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      </button>
      {media && typeof media === 'object' && media.alt && (
        <p className="text-xs text-muted-foreground mt-1.5 italic leading-snug">
          {media.alt}
        </p>
      )}
      {caption && (
        <div
          className={cn('mt-6', { container: !disableInnerContainer }, captionClassName)}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
