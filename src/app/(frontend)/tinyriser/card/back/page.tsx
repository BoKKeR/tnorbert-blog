'use client'

import React from 'react'
import Link from 'next/link'
import { CardBack } from '../_CardBack'

export default function TinyRiserCardBackPage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none !important; border: none; }
          @page { size: 148mm 74mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only flex flex-col items-center gap-6 py-10 px-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-sm text-muted-foreground font-mono">
            Shipment insert — back side · 148 × 74 mm
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
            ← Front side
          </Link>
          <Link
            href="/tinyriser/card/sheet/back"
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print A4 sheet (4 backs) →
          </Link>
        </div>
      </div>

      <CardBack />
    </>
  )
}
