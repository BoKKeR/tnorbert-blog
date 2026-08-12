'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

/*
  Cabinet oblique projection — 30° angle, 50% depth foreshortening.
  Front face is a true rectangle.  Depth goes up-right:
    dx_per_unit = cos(30°)*0.5 = 0.433
    dy_per_unit = sin(30°)*0.5 = 0.250  (negative = up in screen)

  1U 10" chassis:
    W = 84   (10" width, to scale)
    H = 15   (1U height, slightly exaggerated for legibility)
    D = 26   (depth)  →  dx=11.3, dy=6.5 in screen

  Front face corners (y=0):
    TL=(8,10)  TR=(92,10)  BR=(92,25)  BL=(8,25)
  Top face:
    FL=(8,10)  FR=(92,10)  BR=(103.3,16.5)  BL=(19.3,16.5)
  Right side:
    TF=(92,10)  TB=(103.3,16.5)  BB=(103.3,31.5)  BF=(92,25)

  ViewBox: "0 0 110 40"
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
      {/* Left: 1U 10" rack UPS line art */}
      <div style={{ width: '44mm', height: '59mm', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5pt solid #374151', padding: '2mm 1mm' }}>
        <svg viewBox="0 0 110 40" style={{ width: '100%' }} aria-hidden="true">
          <defs>
            {/* Diagonal crosshatch for vent grille */}
            <pattern id="grille" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
              <line x1="0" y1="3.5" x2="3.5" y2="0" stroke="#555" strokeWidth="0.4"/>
              <line x1="0" y1="0"   x2="3.5" y2="3.5" stroke="#555" strokeWidth="0.4"/>
            </pattern>
            {/* Clip for the grille area */}
            <clipPath id="grilleClip">
              <rect x="16" y="11" width="52" height="13"/>
            </clipPath>
          </defs>

          {/* ── TOP FACE ── */}
          <polygon
            points="8,10 92,10 103.3,16.5 19.3,16.5"
            fill="#e8e8e8" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>

          {/* Top face depth lines (vent slots) */}
          <line x1="19.3" y1="16.5" x2="103.3" y2="16.5" stroke="#bbb" strokeWidth="0.4"/>
          <line x1="11" y1="11.8" x2="95" y2="11.8" stroke="#ccc" strokeWidth="0.35"/>
          <line x1="13" y1="13.4" x2="97" y2="13.4" stroke="#ccc" strokeWidth="0.35"/>
          <line x1="15" y1="15.0" x2="99" y2="15.0" stroke="#ccc" strokeWidth="0.35"/>

          {/* ── RIGHT SIDE FACE ── */}
          <polygon
            points="92,10 103.3,16.5 103.3,31.5 92,25"
            fill="#c8c8c8" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>

          {/* Right side subtle depth line */}
          <line x1="92" y1="10" x2="103.3" y2="16.5" stroke="#aaa" strokeWidth="0.5"/>

          {/* ── FRONT FACE (main rectangle) ── */}
          <rect x="8" y="10" width="84" height="15" fill="white" stroke="#111" strokeWidth="1.5"/>

          {/* ── LEFT RACK EAR ── */}
          <rect x="8" y="10" width="7" height="15" fill="#e0e0e0" stroke="#111" strokeWidth="0.9"/>
          {/* Mounting holes */}
          <circle cx="11.5" cy="13.5" r="1.4" fill="white" stroke="#333" strokeWidth="0.55"/>
          <circle cx="11.5" cy="21.5" r="1.4" fill="white" stroke="#333" strokeWidth="0.55"/>
          {/* Ear detail line */}
          <line x1="15" y1="10" x2="15" y2="25" stroke="#888" strokeWidth="0.4"/>

          {/* ── RIGHT RACK EAR ── */}
          <rect x="85" y="10" width="7" height="15" fill="#e0e0e0" stroke="#111" strokeWidth="0.9"/>
          <circle cx="88.5" cy="13.5" r="1.4" fill="white" stroke="#333" strokeWidth="0.55"/>
          <circle cx="88.5" cy="21.5" r="1.4" fill="white" stroke="#333" strokeWidth="0.55"/>
          <line x1="85" y1="10" x2="85" y2="25" stroke="#888" strokeWidth="0.4"/>

          {/* ── GRILLE AREA (between ears) ── */}
          {/* Grille border */}
          <rect x="16" y="11" width="52" height="13" fill="url(#grille)" stroke="#444" strokeWidth="0.6"/>

          {/* Grille inner shadow lines (top and left edge) */}
          <line x1="16" y1="11" x2="68" y2="11" stroke="#999" strokeWidth="0.3"/>
          <line x1="16" y1="11" x2="16" y2="24" stroke="#999" strokeWidth="0.3"/>

          {/* ── DIVIDER ── */}
          <line x1="68" y1="10" x2="68" y2="25" stroke="#555" strokeWidth="0.8"/>

          {/* ── CONTROL / PORT PANEL ── */}
          <rect x="68" y="10" width="17" height="15" fill="#f8f8f8" stroke="none"/>

          {/* 6 USB-C ports in 3×2 grid */}
          {([
            [71.5, 13.0], [78.5, 13.0],
            [71.5, 17.5], [78.5, 17.5],
            [71.5, 22.0], [78.5, 22.0],
          ] as [number, number][]).map(([cx, cy], i) => (
            <g key={i}>
              {/* Port housing */}
              <rect x={cx - 2} y={cy - 1.2} width="4" height="2.4" rx="0.8"
                fill="white" stroke="#333" strokeWidth="0.55"/>
              {/* USB-C center tongue (tiny) */}
              <rect x={cx - 0.7} y={cy - 0.45} width="1.4" height="0.9" rx="0.2"
                fill="#ccc" stroke="none"/>
            </g>
          ))}

          {/* Status LED */}
          <circle cx="81.5" cy="13.5" r="1.1" fill="none" stroke="#111" strokeWidth="0.5"/>
          <circle cx="81.5" cy="13.5" r="0.55" fill="#22c55e"/>

          {/* ── FRONT FACE OUTER STROKE (on top of everything) ── */}
          <rect x="8" y="10" width="84" height="15"
            fill="none" stroke="#111" strokeWidth="1.5"/>
        </svg>

        <p style={{ fontSize: '4.5pt', color: '#6b7280', margin: '1.5mm 0 0', fontFamily: mono, textAlign: 'center' }}>
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
