'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

export function CardBack() {
  return (
    <div
      className="card"
      style={{
        width: '105mm',
        height: '59mm',
        background: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: UPS icon */}
      <div style={{ width: '44mm', height: '59mm', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5pt solid #374151', gap: '2.5mm', padding: '4mm' }}>
        <svg viewBox="0 0 48 48" style={{ width: '22mm', height: '22mm' }} aria-hidden="true">
          {/* UPS chassis */}
          <rect x="3" y="11" width="42" height="26" rx="2" fill="none" stroke="#111111" strokeWidth="2.5" />
          {/* Terminal posts */}
          <rect x="15" y="7" width="7" height="5" rx="1" fill="#111111" />
          <rect x="26" y="7" width="7" height="5" rx="1" fill="#111111" />
          {/* Lightning bolt */}
          <path d="M28 18 L20 27 L24.5 27 L20 36 L30 25 L25 25 Z" fill="#111111" />
        </svg>
        <p style={{ fontSize: '5pt', color: '#374151', margin: 0, fontFamily: mono, textAlign: 'center', lineHeight: 1.4 }}>
          1U · 10{'″'} rack<br />USB PD
        </p>
      </div>

      {/* Right: teaser */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4mm 4mm 3.5mm 4mm',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
          <p style={{ fontSize: '7pt', fontWeight: 700, color: '#9ca3af', margin: 0, fontFamily: mono, letterSpacing: '-0.01em' }}>
            {'// next_build'}
          </p>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: '#111111', margin: 0, fontFamily: mono, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Rack UPS
          </p>
          <p style={{ fontSize: '6.5pt', color: '#374151', margin: 0, fontFamily: mono, lineHeight: 1.4 }}>
            A 1U 10{'″'} UPS with USB-C PD output - built for small-rack homelabs. Open hardware, assembled in Sweden.
          </p>
        </div>

        <div style={{ borderTop: '1.5pt solid #374151', paddingTop: '2.5mm' }}>
          <p style={{ fontSize: '6.5pt', color: '#111111', margin: 0, fontFamily: mono, fontWeight: 700 }}>
            sign up for updates
          </p>
          <p style={{ fontSize: '5.5pt', color: '#6b7280', margin: '0.5mm 0 0', fontFamily: mono }}>
            deployonfri.day/ups
          </p>
        </div>
      </div>
    </div>
  )
}
