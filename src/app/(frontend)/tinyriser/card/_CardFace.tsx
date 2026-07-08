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
        width: '105mm',
        height: '74mm',
        background: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: QR code */}
      <div
        style={{
          width: '46mm',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1.5pt solid #374151',
          padding: '5mm',
          gap: '2mm',
        }}
      >
        <QRCodeSVG
          value={TINYRISER_URL}
          size={106}
          bgColor="#ffffff"
          fgColor="#111111"
          level="M"
          aria-label="QR code linking to deployonfri.day/thinkcentre"
        />
        <p
          style={{
            fontSize: '6pt',
            color: '#6b7280',
            textAlign: 'center',
            margin: 0,
            fontFamily: mono,
          }}
        >
          deployonfri.day/thinkcentre
        </p>
      </div>

      {/* Right: text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '6mm 5mm 5mm 5mm',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '11pt',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 2.5mm 0',
              fontFamily: mono,
              letterSpacing: '-0.02em',
            }}
          >
            {'> order_fulfilled'}
          </p>
          <p
            style={{
              fontSize: '7pt',
              color: '#374151',
              lineHeight: 1.55,
              margin: 0,
              fontFamily: mono,
            }}
          >
            scan the QR for PCIe compatibility, community builds, setup
            notes, and upgrade refs for your ThinkCentre Tiny.
          </p>
        </div>

        <div style={{ borderTop: '1.5pt solid #374151', paddingTop: '3mm' }}>
          <p
            style={{
              fontSize: '7pt',
              color: '#6b7280',
              lineHeight: 1.5,
              margin: 0,
              fontFamily: mono,
            }}
          >
            Design by WifiCable — manufactured and assembled by Norbert in Sweden.
            Questions?{' '}
            <span style={{ color: '#111111', fontWeight: 700 }}>deployonfri.day</span>
          </p>
        </div>
      </div>
    </div>
  )
}
