'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CardFace } from './_CardFace'
import { CardBack } from './_CardBack'

export default function TinyRiserCardPage() {
  const [side, setSide] = useState<'front' | 'back'>('front')

  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 105mm; height: 59mm; margin: 0; box-shadow: none !important; }
          @page { size: 105mm 59mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only flex flex-col items-center gap-4 py-10 px-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex gap-2 border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => setSide('front')}
              className={`text-sm font-mono px-3 py-2 transition-colors ${side === 'front' ? 'bg-foreground text-background' : 'bg-background hover:bg-muted'}`}
            >
              Front
            </button>
            <button
              onClick={() => setSide('back')}
              className={`text-sm font-mono px-3 py-2 transition-colors ${side === 'back' ? 'bg-foreground text-background' : 'bg-background hover:bg-muted'}`}
            >
              Back
            </button>
          </div>
          <button
            onClick={() => window.print()}
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print →
          </button>
          <Link
            href="/tinyriser/card/sheet"
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print A4 sheet (10 cards) →
          </Link>
        </div>
        <p className="text-xs text-muted-foreground font-mono">105 × 59 mm</p>
      </div>

      {side === 'front' ? <CardFace /> : <CardBack />}
    </>
  )
}
