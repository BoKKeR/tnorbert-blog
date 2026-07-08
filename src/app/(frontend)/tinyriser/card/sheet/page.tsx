'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CardFace } from '../_CardFace'
import { CardBack } from '../_CardBack'

type Side = 'fronts' | 'backs'

// 2 cols × 5 rows = 10 cards per A4 portrait (105mm × 59mm each)
const COLS = 2
const ROWS = 5
const TOTAL = COLS * ROWS

export default function TinyRiserCardSheetPage() {
  const [side, setSide] = useState<Side>('fronts')
  const [pendingPrint, setPendingPrint] = useState(false)

  // After React commits the new side to the DOM, wait for all images to load
  // before opening the print dialog.
  useEffect(() => {
    if (!pendingPrint) return

    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
    const unloaded = images.filter(img => !img.complete)

    const doPrint = () => {
      setPendingPrint(false)
      window.print()
    }

    if (unloaded.length === 0) {
      doPrint()
      return
    }

    let remaining = unloaded.length
    const onDone = () => { if (--remaining === 0) doPrint() }
    unloaded.forEach(img => {
      img.addEventListener('load',  onDone, { once: true })
      img.addEventListener('error', onDone, { once: true })
    })
    return () => {
      unloaded.forEach(img => {
        img.removeEventListener('load',  onDone)
        img.removeEventListener('error', onDone)
      })
    }
  }, [pendingPrint, side])

  const handlePrint = (newSide: Side) => {
    setSide(newSide)
    setPendingPrint(true)
  }

  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 105mm; height: 59mm; box-shadow: none !important; }
          .card-grid {
            display: grid;
            grid-template-columns: repeat(${COLS}, 105mm);
            grid-template-rows: repeat(${ROWS}, 59mm);
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

      {/* Preload the back image so it's cached before the user hits "Print backs" */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/rack_lineart.png" alt="" aria-hidden="true" style={{ display: 'none' }} />

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
                onClick={() => handlePrint('fronts')}
                disabled={pendingPrint}
                className="self-start text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors disabled:opacity-50"
              >
                {pendingPrint && side === 'fronts' ? 'Loading…' : 'Print fronts →'}
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
                onClick={() => handlePrint('backs')}
                disabled={pendingPrint}
                className="self-start text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors disabled:opacity-50"
              >
                {pendingPrint && side === 'backs' ? 'Loading…' : 'Print backs →'}
              </button>
            </div>
          </div>

          <div className="border border-border rounded-sm p-4 flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-0.5">step 4</span>
            <p className="text-sm font-mono">Cut along the dashed lines — 10 cards, each 105 × 59 mm.</p>
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
