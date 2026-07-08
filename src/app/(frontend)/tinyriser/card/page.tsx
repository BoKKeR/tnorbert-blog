'use client'

import React from 'react'
import Link from 'next/link'
import { CardFace } from './_CardFace'
import { CardBack } from './_CardBack'

export default function TinyRiserCardPage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none !important; border: none; }
          .fold-card { display: flex; width: 296mm; }
          @page { size: 296mm 74mm; margin: 0; }
        }
      `}</style>

      <div className="screen-only flex flex-col items-center gap-4 py-10 px-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-sm text-muted-foreground font-mono">
            Fold card · print → fold right half behind left
          </p>
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
            Print A4 sheet (2 cards) →
          </Link>
        </div>
        <p className="text-xs text-muted-foreground font-mono tracking-widest">
          ← front &nbsp;·&nbsp; fold here &nbsp;·&nbsp; back →
        </p>
      </div>

      <div
        className="fold-card"
        style={{ display: 'flex', width: '296mm', margin: '0 auto' }}
      >
        <CardFace />
        <CardBack />
      </div>
    </>
  )
}
