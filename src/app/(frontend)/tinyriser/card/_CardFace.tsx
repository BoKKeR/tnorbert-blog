'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { TINYRISER_URL } from './constants'

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
              margin: 0,
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Scan the QR code for compatible PCIe cards, community builds, setup guides,
            and upgrade references for your ThinkCentre Tiny.
          </p>
        </div>

        {/* Assembly + shipping note */}
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
            Hand-assembled & tested — stencil, reflow, inspected under a microscope.
            Shipped from Sweden, the country that brought you Spotify.
            Questions? <span style={{ color: '#111111' }}>deployonfri.day</span>
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
          TinyRiser by Norbert
        </p>
      </div>
    </div>
  )
}
