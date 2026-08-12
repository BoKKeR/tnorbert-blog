'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

/*
  Cabinet oblique — 30°, 50% foreshortening. Depth recedes UP-RIGHT.
    Δx_per_depth = cos(30°)×0.5 ≈ +0.433   (rightward)
    Δy_per_depth = sin(30°)×0.5 ≈ −0.250   (upward in screen coords)

  Chassis  W=84  H=19 (1U exaggerated)  D=28
    Δx = 28×0.433 = 12.1   Δy = 28×0.250 = 7.0

  Front face (y=0):
    TL=(8,22)  TR=(92,22)  BR=(92,41)  BL=(8,41)

  Top face — back edge is 12.1 right and 7.0 UP:
    FL=(8,22)  FR=(92,22)  BR=(104,15)  BL=(20,15)

  Right side face:
    TF=(92,22)  TB=(104,15)  BB=(104,34)  BF=(92,41)

  ViewBox "0 10 108 36"  →  y visible 10..46, x 0..108
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
      <div style={{ width: '44mm', height: '59mm', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5pt solid #374151', padding: '2mm 1.5mm' }}>
        <svg viewBox="0 10 108 36" style={{ width: '100%' }} aria-hidden="true">
          <defs>
            <pattern id="grille" x="0" y="0" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
              <line x1="0" y1="3.2" x2="3.2" y2="0"   stroke="#666" strokeWidth="0.45"/>
              <line x1="0" y1="0"   x2="3.2" y2="3.2" stroke="#666" strokeWidth="0.45"/>
            </pattern>
            <clipPath id="gc">
              <rect x="16" y="23" width="50" height="17"/>
            </clipPath>
          </defs>

          {/* ── RIGHT SIDE FACE (draw first — behind top) ── */}
          <polygon
            points="92,22 104,15 104,34 92,41"
            fill="#d0d0d0" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>
          {/* right side shading lines */}
          <line x1="92" y1="26" x2="104" y2="19" stroke="#bbb" strokeWidth="0.35"/>
          <line x1="92" y1="30" x2="104" y2="23" stroke="#bbb" strokeWidth="0.35"/>
          <line x1="92" y1="34" x2="104" y2="27" stroke="#bbb" strokeWidth="0.35"/>
          <line x1="92" y1="38" x2="104" y2="31" stroke="#bbb" strokeWidth="0.35"/>

          {/* ── TOP FACE (recedes up-right) ── */}
          <polygon
            points="8,22 92,22 104,15 20,15"
            fill="#ebebeb" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>
          {/* top face depth seam lines */}
          <line x1="8"  y1="22" x2="20"  y2="15" stroke="#bbb" strokeWidth="0.4"/>
          <line x1="92" y1="22" x2="104" y2="15" stroke="#bbb" strokeWidth="0.4"/>
          {/* vent slot marks on top */}
          <line x1="28"  y1="21.2" x2="40.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
          <line x1="33"  y1="21.2" x2="45.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
          <line x1="55"  y1="21.2" x2="67.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
          <line x1="60"  y1="21.2" x2="72.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>

          {/* ── FRONT FACE ── */}
          <rect x="8" y="22" width="84" height="19" fill="white" stroke="#111" strokeWidth="1.5"/>

          {/* ── LEFT RACK EAR ── */}
          <rect x="8" y="22" width="7" height="19" fill="#ddd" stroke="#111" strokeWidth="0.9"/>
          <circle cx="11.5" cy="25.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
          <circle cx="11.5" cy="37.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
          <line x1="15" y1="22" x2="15" y2="41" stroke="#999" strokeWidth="0.5"/>

          {/* ── RIGHT RACK EAR ── */}
          <rect x="85" y="22" width="7" height="19" fill="#ddd" stroke="#111" strokeWidth="0.9"/>
          <circle cx="88.5" cy="25.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
          <circle cx="88.5" cy="37.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
          <line x1="85" y1="22" x2="85" y2="41" stroke="#999" strokeWidth="0.5"/>

          {/* ── VENT GRILLE ── */}
          <rect x="16" y="23" width="50" height="17"
            fill="url(#grille)" stroke="#444" strokeWidth="0.65"/>
          {/* grille inset shadow */}
          <line x1="16" y1="23" x2="66" y2="23" stroke="#aaa" strokeWidth="0.35"/>
          <line x1="16" y1="23" x2="16" y2="40" stroke="#aaa" strokeWidth="0.35"/>

          {/* ── DIVIDER ── */}
          <line x1="66" y1="22" x2="66" y2="41" stroke="#666" strokeWidth="0.9"/>

          {/* ── CONTROL / PORT PANEL ── */}
          <rect x="66" y="22" width="19" height="19" fill="#f6f6f6" stroke="none"/>

          {/* 6 USB-C ports in 3 rows × 2 cols */}
          {([
            [70, 26], [78, 26],
            [70, 31.5], [78, 31.5],
            [70, 37],   [78, 37],
          ] as [number, number][]).map(([cx, cy], i) => (
            <g key={i}>
              <rect x={cx-2.2} y={cy-1.4} width="4.4" height="2.8" rx="1.0"
                fill="white" stroke="#333" strokeWidth="0.6"/>
              <rect x={cx-0.8} y={cy-0.5} width="1.6" height="1.0" rx="0.25"
                fill="#bbb" stroke="none"/>
            </g>
          ))}

          {/* Status LED */}
          <circle cx="82" cy="26" r="1.3" fill="none" stroke="#111" strokeWidth="0.55"/>
          <circle cx="82" cy="26" r="0.65" fill="#22c55e"/>

          {/* ── FRONT FACE OUTER STROKE (redraw on top) ── */}
          <rect x="8" y="22" width="84" height="19"
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2mm' }}>
          <p style={{ fontSize: '5pt', fontWeight: 700, color: '#9ca3af', margin: 0, fontFamily: mono }}>
            {'// next_product_build'}
          </p>
          <p style={{ fontSize: '9.5pt', fontWeight: 700, color: '#111111', margin: 0, fontFamily: mono, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            10{'″'} 1U Rack UPS<br />with USB-C PD outputs
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55mm', marginTop: '0.5mm' }}>
            {[
              '6× USB-PD 3.0 · 5–20V PPS',
              'per-port power monitoring',
              'Prometheus · Home Assistant',
              'NUT server built-in',
              'USB-C to barrel jack support',
              'web UI · per-port power control',
            ].map((f) => (
              <p key={f} style={{ fontSize: '5pt', color: '#374151', margin: 0, fontFamily: mono, display: 'flex', gap: '1.5mm', alignItems: 'baseline' }}>
                <span style={{ color: '#9ca3af', flexShrink: 0 }}>-</span>
                {f}
              </p>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1.5pt solid #374151', paddingTop: '2.5mm' }}>
          <p style={{ fontSize: '5.5pt', color: '#374151', margin: '0 0 0.8mm', fontFamily: mono, lineHeight: 1.4 }}>
            <span style={{ fontWeight: 700, color: '#111111' }}>Sign up for updates,</span>{' '}
            share your feedback. No spam, promise.
          </p>
          <p style={{ fontSize: '5.5pt', color: '#6b7280', margin: 0, fontFamily: mono }}>
            deployonfri.day/ups
          </p>
        </div>
      </div>
    </div>
  )
}
