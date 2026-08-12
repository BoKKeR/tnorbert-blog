'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

/*
  Isometric projection: iso(x, y, z) with translate(35, 22)
    sx = x*0.866 - y*0.866 + 35
    sy = x*0.5  + y*0.5  - z + 22

  Chassis: W=30, D=18, H=10  (1U wide, 10" deep-ish)
  3 prismatic batteries: each 8 wide x 14 deep x 7 tall,
    x positions 2-10, 11-19, 20-28  (y: 2-16)
*/

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
      {/* Left: isometric open-top UPS with prismatic batteries */}
      <div style={{ width: '44mm', height: '59mm', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5pt solid #374151', padding: '2mm 2mm 2mm 2mm' }}>
        <svg viewBox="0 0 70 52" style={{ width: '100%' }} aria-hidden="true">
          {/* === CHASSIS === */}
          {/* Back wall (y=18), draw first */}
          <polygon points="19,21 45,36 45,46 19,31" fill="#c9cacc" stroke="#111111" strokeWidth="0.8" strokeLinejoin="round"/>
          {/* Left wall (x=0) */}
          <polygon points="35,12 19,21 19,31 35,22" fill="#d1d3d6" stroke="#111111" strokeWidth="0.8" strokeLinejoin="round"/>
          {/* Interior floor (z=0) */}
          <polygon points="35,22 61,37 45,46 19,31" fill="#e9eaeb" stroke="none"/>
          {/* Front wall exterior (y=0) */}
          <polygon points="35,12 61,27 61,37 35,22" fill="#e5e7eb" stroke="#111111" strokeWidth="0.8" strokeLinejoin="round"/>
          {/* Right wall exterior (x=30) */}
          <polygon points="61,27 45,36 45,46 61,37" fill="#9ca3af" stroke="#111111" strokeWidth="0.8" strokeLinejoin="round"/>

          {/* === BATTERIES (prismatic cells) === */}
          {/* Battery 1 (x 2-10) front face */}
          <polygon points="35,17 42,21 42,28 35,24" fill="#c7d6e8" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>
          {/* Battery 1 top face */}
          <polygon points="35,17 42,21 30,28 23,24" fill="#ddeaf5" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>

          {/* Battery 2 (x 11-19) front face */}
          <polygon points="43,21.5 50,24.5 50,32.5 43,28.5" fill="#c7d6e8" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>
          {/* Battery 2 top face */}
          <polygon points="43,21.5 50,24.5 38,32.5 31,28.5" fill="#ddeaf5" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>

          {/* Battery 3 (x 20-28) front face */}
          <polygon points="51,25 58,28 58,37 51,33" fill="#c7d6e8" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>
          {/* Battery 3 top face */}
          <polygon points="51,25 58,28 45,36 38,32" fill="#ddeaf5" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>
          {/* Battery 3 right face (visible on rightmost cell) */}
          <polygon points="58,28 45,36 45,44 58,37" fill="#93b4cc" stroke="#111111" strokeWidth="0.6" strokeLinejoin="round"/>

          {/* === TOP RIM (open top edge) === */}
          <polyline points="35,12 61,27 45,36 19,21 35,12" fill="none" stroke="#111111" strokeWidth="1.2" strokeLinejoin="round"/>

          {/* === FRONT PANEL DETAILS === */}
          {/* 6 USB-PD port indicators along front face mid-height */}
          {([
            [36.5, 20],
            [38.9, 21.2],
            [41.3, 22.4],
            [43.7, 23.6],
            [46.1, 24.8],
            [48.5, 26],
          ] as [number, number][]).map(([cx, cy], i) => (
            <rect key={i} x={cx - 1} y={cy - 0.8} width="2" height="1.6" rx="0.3" fill="#374151"/>
          ))}
          {/* Power LED */}
          <circle cx="59" cy="30.5" r="1" fill="#22c55e"/>
        </svg>
        <p style={{ fontSize: '4.5pt', color: '#6b7280', margin: '1mm 0 0', fontFamily: mono, textAlign: 'center', lineHeight: 1.3 }}>
          1U · 10{'″'} rack
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5mm' }}>
          <p style={{ fontSize: '5pt', fontWeight: 700, color: '#9ca3af', margin: 0, fontFamily: mono }}>
            {'// next_product_build'}
          </p>
          <p style={{ fontSize: '12pt', fontWeight: 700, color: '#111111', margin: 0, fontFamily: mono, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Rack UPS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8mm' }}>
            <p style={{ fontSize: '5.5pt', color: '#374151', margin: 0, fontFamily: mono }}>
              6{'×'} USB-PD 3.0 outputs
            </p>
            <p style={{ fontSize: '5.5pt', color: '#374151', margin: 0, fontFamily: mono }}>
              PPS - 5V to 20V per port
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1.5pt solid #374151', paddingTop: '2.5mm' }}>
          <p style={{ fontSize: '5.5pt', color: '#374151', margin: '0 0 0.8mm', fontFamily: mono, lineHeight: 1.4 }}>
            Interested in giving feedback?{' '}
            <span style={{ fontWeight: 700, color: '#111111' }}>Sign up for updates.</span>
          </p>
          <p style={{ fontSize: '5.5pt', color: '#6b7280', margin: 0, fontFamily: mono }}>
            deployonfri.day/ups
          </p>
        </div>
      </div>
    </div>
  )
}
