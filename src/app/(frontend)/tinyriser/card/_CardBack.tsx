'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

/*
  Isometric projection — translate(36, 20):
    screen_x = x * 0.866 - y * 0.866 + 36
    screen_y = x * 0.5  + y * 0.5  - z  + 20

  Chassis  W=40, D=20, H=10  (1U wide, 20″ deep)
  3 prismatic cells  x:[2-12] [15-25] [28-38], y:[2-18], z:[0-8]
  ViewBox 0 0 76 55
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
      {/* Left: isometric open-top UPS */}
      <div style={{ width: '44mm', height: '59mm', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5pt solid #374151', padding: '2mm' }}>
        <svg viewBox="0 0 76 55" style={{ width: '100%' }} aria-hidden="true">

          {/* ── INTERIOR BACK WALL (y=20) ── */}
          <polygon points="19,20 54,40 54,50 19,30"
            fill="#1e293b" stroke="#0f172a" strokeWidth="0.6"/>

          {/* ── INTERIOR LEFT WALL (x=0) ── */}
          <polygon points="36,10 19,20 19,30 36,20"
            fill="#1e293b" stroke="#0f172a" strokeWidth="0.6"/>

          {/* ── INTERIOR FLOOR (z=0) ── */}
          <polygon points="36,20 71,40 54,50 19,30"
            fill="#0f172a" stroke="none"/>

          {/* ── PRISMATIC CELL 1 (x 2-12) ── */}
          {/* front face y=2, z 0-8 */}
          <polygon points="36,14 45,19 45,27 36,22"
            fill="#2563eb" stroke="#1d4ed8" strokeWidth="0.6"/>
          {/* top face z=8 */}
          <polygon points="36,14 45,19 31,27 22,22"
            fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.6"/>
          {/* terminal tabs */}
          <rect x="29" y="13.5" width="2" height="1.2" rx="0.4" fill="#1e40af"/>
          <rect x="38.5" y="17.5" width="2" height="1.2" rx="0.4" fill="#1e40af"/>

          {/* ── PRISMATIC CELL 2 (x 15-25) ── */}
          <polygon points="47,20.5 56,25.5 56,33.5 47,28.5"
            fill="#2563eb" stroke="#1d4ed8" strokeWidth="0.6"/>
          <polygon points="47,20.5 56,25.5 42,33.5 33.5,28.5"
            fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.6"/>
          <rect x="40" y="20" width="2" height="1.2" rx="0.4" fill="#1e40af"/>
          <rect x="49.5" y="23.5" width="2" height="1.2" rx="0.4" fill="#1e40af"/>

          {/* ── PRISMATIC CELL 3 (x 28-38) ── */}
          <polygon points="58.5,28 67,32 67,40 58.5,35"
            fill="#2563eb" stroke="#1d4ed8" strokeWidth="0.6"/>
          {/* right face x=38 — only rightmost cell visible */}
          <polygon points="67,32 53,40 53,48 67,40"
            fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.6"/>
          <polygon points="58.5,28 67,32 53,40 45,35"
            fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.6"/>
          <rect x="51" y="27" width="2" height="1.2" rx="0.4" fill="#1e40af"/>
          <rect x="60.5" y="30.5" width="2" height="1.2" rx="0.4" fill="#1e40af"/>

          {/* ── CHASSIS FRONT WALL EXTERIOR (y=0) ── */}
          <polygon points="36,10 71,30 71,40 36,20"
            fill="#1e293b" stroke="#0f172a" strokeWidth="1.0"/>

          {/* Vent slot (lower third of front panel) */}
          <line x1="36" y1="36.5" x2="71" y2="36.5" stroke="#334155" strokeWidth="0.4"/>
          <line x1="36" y1="37.5" x2="71" y2="37.5" stroke="#334155" strokeWidth="0.4"/>
          <line x1="36" y1="38.5" x2="71" y2="38.5" stroke="#334155" strokeWidth="0.4"/>

          {/* 6 USB-C port cutouts on front panel (z≈5, x=4,9,14,19,24,29)
              Each port: parallelogram matching face angle, fill white */}
          {([
            [39.5, 17],
            [43.8, 19.5],
            [48.1, 22],
            [52.5, 24.5],
            [56.8, 27],
            [61.1, 29.5],
          ] as [number, number][]).map(([cx, cy], i) => (
            <polygon key={i}
              points={`${cx-0.87},${cy-1.05} ${cx+0.87},${cy-0.05} ${cx+0.87},${cy+1.05} ${cx-0.87},${cy+0.05}`}
              fill="#e2e8f0" stroke="#64748b" strokeWidth="0.3"/>
          ))}

          {/* Status LED */}
          <circle cx="68.5" cy="34.5" r="1.3" fill="#22c55e"/>

          {/* ── CHASSIS RIGHT WALL EXTERIOR (x=40) ── */}
          <polygon points="71,30 54,40 54,50 71,40"
            fill="#0f172a" stroke="#0f172a" strokeWidth="1.0"/>

          {/* ── TOP RIM (open edge, bold) ── */}
          <polyline points="36,10 71,30 54,40 19,20 36,10"
            fill="none" stroke="#111827" strokeWidth="2.0" strokeLinejoin="round"/>

          {/* Inner rim highlight */}
          <polyline points="36,10 71,30 54,40 19,20 36,10"
            fill="none" stroke="#475569" strokeWidth="0.6" strokeLinejoin="round"
            strokeDasharray="2 2"/>
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
          <p style={{ fontSize: '9.5pt', fontWeight: 700, color: '#111111', margin: 0, fontFamily: mono, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            10{'″'} 1U Rack UPS<br />with USB-C PD
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
