'use client'

import React from 'react'
import Link from 'next/link'
import { CardFace } from '../_CardFace'
import { CardBack } from '../_CardBack'

const CARDS_PER_SHEET = 2

export default function TinyRiserCardSheetPage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none !important; border: none; }
          .fold-card { display: flex; width: 296mm; }
          .card-sheet { display: flex; flex-direction: column; width: 296mm; }
          @page { size: 297mm 210mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only flex flex-col items-center gap-4 py-10 px-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-sm text-muted-foreground font-mono">
            A4 landscape — {CARDS_PER_SHEET} fold cards · print → fold each right half behind left
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

      <div
        className="card-sheet"
        style={{ display: 'flex', flexDirection: 'column', width: '296mm', margin: '0 auto' }}
      >
        {Array.from({ length: CARDS_PER_SHEET }).map((_, i) => (
          <div key={i} className="fold-card" style={{ display: 'flex', width: '296mm' }}>
            <CardFace />
            <CardBack />
          </div>
        ))}
      </div>
    </>
  )
}
