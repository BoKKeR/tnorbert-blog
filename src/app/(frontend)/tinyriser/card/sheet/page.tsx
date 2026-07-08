'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CardFace } from '../_CardFace'
import { CardBack } from '../_CardBack'

type Side = 'fronts' | 'backs'

const CARDS_PER_SHEET = 4

export default function TinyRiserCardSheetPage() {
  const [side, setSide] = useState<Side>('fronts')

  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none !important; border: none; }
          @page { size: 210mm 297mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only max-w-xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* Back link */}
        <Link href="/tinyriser/card" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
          ← Single card
        </Link>

        {/* Steps */}
        <div className="flex flex-col gap-4">

          {/* Step 1 */}
          <div className={`border rounded-sm p-4 flex items-start gap-4 transition-colors ${side === 'fronts' ? 'border-primary/40 bg-primary/[0.03]' : 'border-border'}`}>
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 1</span>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm font-mono">Load A4, print the fronts.</p>
              <button
                onClick={() => { setSide('fronts'); requestAnimationFrame(() => requestAnimationFrame(() => window.print())) }}
                className="self-start text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
              >
                Print fronts →
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border border-border rounded-sm p-4 flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 2</span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-mono">Flip the sheet on the long edge and put it back in the tray.</p>
              <p className="text-xs font-mono text-muted-foreground">Portrait · long edge = the tall side</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`border rounded-sm p-4 flex items-start gap-4 transition-colors ${side === 'backs' ? 'border-primary/40 bg-primary/[0.03]' : 'border-border'}`}>
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 3</span>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm font-mono">Print the backs on the same sheet.</p>
              <button
                onClick={() => { setSide('backs'); requestAnimationFrame(() => requestAnimationFrame(() => window.print())) }}
                className="self-start text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
              >
                Print backs →
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="border border-border rounded-sm p-4 flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 4</span>
            <p className="text-sm font-mono">Cut into 4 strips. Each strip is one finished card — front on one side, back on the other.</p>
          </div>

        </div>

        {/* Preview label */}
        <p className="text-xs text-muted-foreground font-mono">
          previewing: <span className="text-foreground">{side}</span>
        </p>
      </div>

      {/* Cards — only the active side is shown on screen; both render in DOM so print picks up the right one */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '148mm', margin: '0 auto' }}>
        {side === 'fronts'
          ? Array.from({ length: CARDS_PER_SHEET }).map((_, i) => <CardFace key={i} />)
          : Array.from({ length: CARDS_PER_SHEET }).map((_, i) => <CardBack key={i} />).reverse()
        }
      </div>
    </>
  )
}
