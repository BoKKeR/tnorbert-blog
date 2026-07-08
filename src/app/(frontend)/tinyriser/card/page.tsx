'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { TINYRISER_URL } from './constants'

export default function TinyRiserCardPage() {
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

      {/* Screen-only: label + print button */}
      <div className="screen-only flex flex-col items-center gap-6 py-10 px-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            Shipment insert card — 148 × 74 mm
          </p>
          <button
            onClick={() => window.print()}
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print →
          </button>
        </div>
      </div>

      {/* Card — centered on screen, fills page when printed */}
      <div
        className="card"
        style={{
          width: '148mm',
          height: '74mm',
          background: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          margin: '0 auto',
          boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}
      >
        {/* Left column: QR code */}
        <div
          style={{
            width: '74mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #e5e7eb',
            padding: '8mm',
            gap: '3mm',
            flexShrink: 0,
          }}
        >
          <QRCodeSVG
            value={TINYRISER_URL}
            size={140}
            bgColor="#ffffff"
            fgColor="#111111"
            level="M"
            aria-label="QR code linking to deployonfri.day/thinkcentre"
          />
          <p
            style={{
              fontSize: '7pt',
              color: '#6b7280',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            deployonfri.day/thinkcentre
          </p>
        </div>

        {/* Right column: text */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8mm 8mm 6mm 8mm',
          }}
        >
          {/* Thank-you */}
          <div>
            <p
              style={{
                fontSize: '13pt',
                fontWeight: 700,
                color: '#111111',
                margin: '0 0 3mm 0',
                fontFamily: 'ui-serif, Georgia, serif',
              }}
            >
              Thanks for your order!
            </p>
            <p
              style={{
                fontSize: '7.5pt',
                color: '#374151',
                lineHeight: 1.5,
                margin: '0 0 2.5mm 0',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              Scan the QR code for compatible PCIe cards, community builds, setup guides,
              and upgrade references.
            </p>
            <p
              style={{
                fontSize: '7pt',
                color: '#6b7280',
                margin: 0,
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              M920Q · M720Q · M920x · P340 Tiny Gen 2 · M70q Gen 3+
            </p>
          </div>

          {/* Assembly note */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4mm' }}>
            <p
              style={{
                fontSize: '7.5pt',
                color: '#6b7280',
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              This board is{' '}
              <strong style={{ color: '#374151' }}>hand-assembled & tested</strong> — solder
              stencil, reflow, and inspected under a microscope before shipping. Questions?
              Reach out at <span style={{ color: '#111111' }}>deployonfri.day</span>.
            </p>
          </div>

          {/* Brand */}
          <p
            style={{
              fontSize: '6.5pt',
              color: '#9ca3af',
              margin: 0,
              textAlign: 'right',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            TinyRiser M920Q · Tiny6 — by Norbert
          </p>
        </div>
      </div>
    </>
  )
}
