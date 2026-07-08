'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CardFace } from '../_CardFace'
import { CardBack } from '../_CardBack'

type Side = 'fronts' | 'backs'

// 2 cols × 4 rows = 8 cards per A4 portrait (105mm × 74mm each)
const COLS = 2
const ROWS = 4
const TOTAL = COLS * ROWS

export default function TinyRiserCardSheetPage() {
  const [side, setSide] = useState<Side>('fronts')

  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 105mm; height: 74mm; box-shadow: none !important; }
          .card-grid {
            display: grid;
            grid-template-columns: repeat(${COLS}, 105mm);
            grid-template-rows: repeat(${ROWS}, 74mm);
            width: 210mm;
          }
          .card-cell {
            box-sizing: border-box;
            border-right: 0.5pt dashed #aaaaaa;
            border-bottom: 0.5pt dashed #aaaaaa;
          }
          .card-cell:nth-child(${COLS}n) { border-right: none; }
          .card-cell:nth-last-child(-n+${COLS}) { border-bottom: none; }
          @page { size: 210mm 297mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only max-w-xl mx-auto px-4 py-10 flex flex-col gap-8">
        <Link href="/tinyriser/card" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
          ← Single card
        </Link>

        <div className="flex flex-col gap-4">
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

          <div className="border border-border rounded-sm p-4 flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 2</span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-mono">Flip the sheet on the long edge and put it back in the tray.</p>
              <p className="text-xs font-mono text-muted-foreground">Portrait · long edge = the tall side</p>
            </div>
          </div>

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

          <div className="border border-border rounded-sm p-4 flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 4</span>
            <p className="text-sm font-mono">Cut along the dashed lines — 8 cards, each 105 × 74 mm.</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-mono">previewing: <span className="text-foreground">{side}</span></p>
      </div>

      {/* 2×4 print grid */}
      <div
        className="card-grid"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 105mm)`, width: '210mm', margin: '0 auto' }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="card-cell"
            style={{ boxSizing: 'border-box', border: '0.5pt dashed #aaaaaa' }}
          >
            {side === 'fronts' ? <CardFace /> : <CardBack />}
          </div>
        ))}
      </div>
    </>
  )
}
