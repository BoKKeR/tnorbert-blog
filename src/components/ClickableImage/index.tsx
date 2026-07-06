'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useLightbox } from '@/components/Lightbox'

type Props = {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export function ClickableImage({ src, alt, fill, width, height, className, sizes, priority }: Props) {
  const { register, open } = useLightbox()
  const idRef = useRef('')

  useEffect(() => {
    const { id, unregister } = register({ src, alt, caption: null })
    idRef.current = id
    return unregister
  }, [register, src, alt])

  return (
    <button
      type="button"
      className={
        fill
          ? 'absolute inset-0 cursor-zoom-in p-0 border-0 bg-transparent'
          : 'cursor-zoom-in block w-full h-full p-0 border-0 bg-transparent'
      }
      onClick={() => {
        if (idRef.current) open(idRef.current)
      }}
      aria-label={`Enlarge: ${alt}`}
      title="Click to enlarge"
    >
      {fill ? (
        <Image src={src} alt={alt} fill className={className} sizes={sizes} priority={priority} />
      ) : (
        <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />
      )}
    </button>
  )
}
