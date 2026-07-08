'use client'

import React from 'react'
import Link from 'next/link'
import { CardFace } from '../_CardFace'

const CARDS_PER_SHEET = 4

export default function TinyRiserCardSheetPage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none !important; border: none; }
          .card-sheet { width: 210mm; display: flex; flex-direction: column; align-items: center; }
          @page { size: 210mm 297mm; margin: 0; }
        }
      `}</style>

      {/* Screen-only: label + controls */}
      <div className="screen-only flex flex-col items-center gap-6 py-10 px-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-sm text-muted-foreground font-mono">
            A4 sheet — {CARDS_PER_SHEET} cards · 210 × 297 mm
          </p>
          <button
            onClick={() => window.print()}
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print →
          </button>
          <Link
            href="/tinyriser/card"
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            ← Single card
          </Link>
        </div>
      </div>

      {/* 4 cards — stacked vertically, centred on the A4 sheet */}
      <div
        className="card-sheet"
        style={{ width: '148mm', margin: '0 auto', display: 'flex', flexDirection: 'column' }}
      >
        {Array.from({ length: CARDS_PER_SHEET }).map((_, i) => (
          <CardFace key={i} />
        ))}
      </div>
    </>
  )
}
