'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { TINYRISER_URL } from './constants'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

export function CardFace() {
  return (
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
            fontFamily: mono,
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
        {/* Heading */}
        <div>
          <p
            style={{
              fontSize: '13pt',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 3mm 0',
              fontFamily: mono,
              letterSpacing: '-0.02em',
            }}
          >
            {'> order_confirmed'}
          </p>
          <p
            style={{
              fontSize: '7.5pt',
              color: '#374151',
              lineHeight: 1.55,
              margin: 0,
              fontFamily: mono,
            }}
          >
            scan the QR for PCIe compat, community builds, setup notes,
            and upgrade refs for your ThinkCentre Tiny.
          </p>
        </div>

        {/* Note */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4mm' }}>
          <p
            style={{
              fontSize: '7.5pt',
              color: '#6b7280',
              lineHeight: 1.55,
              margin: 0,
              fontFamily: mono,
            }}
          >
            {'// '}design by WifiCable — made & assembled by Norbert in Sweden.
            {' '}questions?{' '}
            <span style={{ color: '#111111', fontWeight: 700 }}>deployonfri.day</span>
          </p>
        </div>

      </div>
    </div>
  )
}
