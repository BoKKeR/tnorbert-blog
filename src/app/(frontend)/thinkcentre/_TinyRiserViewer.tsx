'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const VARIANTS = [
  {
    id: 'tiny5',
    label: 'Tiny5',
    sub: 'M920q · M720q · M920x',
    image: '/images/tinyriser-board.jpg',
  },
  {
    id: 'tiny6',
    label: 'Tiny6',
    sub: 'M90q Gen 1 & 2 · P340 · P350 Tiny',
    image: '/images/tinyriser-board.jpg',
  },
] as const

export function TinyRiserViewer() {
  const [active, setActive] = useState<'tiny5' | 'tiny6'>('tiny5')
  const variant = VARIANTS.find((v) => v.id === active)!

  return (
    <div className="w-full rounded-sm overflow-hidden border border-border bg-muted flex flex-col">
      {/* Toggle */}
      <div className="flex border-b border-border shrink-0">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={`flex-1 px-3 py-2 text-left transition-colors ${
              active === v.id ? 'bg-primary/10 border-b-2 border-primary' : 'hover:bg-muted/60'
            }`}
          >
            <span className={`text-xs font-mono font-bold ${active === v.id ? 'text-primary' : 'text-foreground'}`}>
              {v.label}
            </span>
            <span className="block text-xs font-mono text-muted-foreground leading-tight">{v.sub}</span>
          </button>
        ))}
      </div>

      {/* Image */}
      <div className="p-2">
        <div className="relative aspect-square rounded-sm overflow-hidden bg-background">
          <Image fill src={variant.image} alt={`TinyRiser ${variant.label}`} className="object-cover" sizes="400px" />
        </div>
      </div>
    </div>
  )
}
