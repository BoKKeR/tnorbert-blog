'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

const RACK_IMG = '/images/rack_nobg.png'

export function CardBack() {
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
      {/* Left: rack photo, no bg */}
      <div style={{ width: '74mm', height: '74mm', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={RACK_IMG}
          alt="ThinkCentre rack"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Right: homelab summary */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '6mm 6mm 5mm 6mm',
          borderLeft: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
          {/* Headline */}
          <p
            style={{
              fontSize: '10pt',
              fontWeight: 700,
              color: '#111111',
              margin: 0,
              fontFamily: mono,
              letterSpacing: '-0.02em',
            }}
          >
            {'// what did you unlock?'}
          </p>

          {/* Homelab URL under headline */}
          <p style={{ fontSize: '6.5pt', color: '#9ca3af', margin: 0, fontFamily: mono }}>
            deployonfri.day/homelab
          </p>

          {/* Specs box */}
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              fontFamily: mono,
              fontSize: '6pt',
              border: '1px solid #e5e7eb',
              padding: '2mm',
            }}
          >
            <tbody>
              {[
                ['hw', '6× ThinkCentre M920Q'],
                ['os', 'Talos Linux'],
                ['nodes', '3 ctrl · 3 workers'],
                ['net', '25 GbE (workers)'],
                ['ingress', 'Envoy Gateway'],
                ['storage', 'Rook-Ceph via TinyRiser'],
                ['gitops', 'Flux + Ansible'],
                ['obs', 'Prometheus · Grafana · Loki'],
                ['hosts', 'keeb.build · deployonfri.day'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td
                    style={{
                      color: '#9ca3af',
                      paddingRight: '2mm',
                      paddingBottom: '1mm',
                      paddingLeft: '2mm',
                      verticalAlign: 'top',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ color: '#374151', paddingBottom: '1mm', paddingRight: '2mm', lineHeight: 1.3 }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mastodon CTA */}
        <p style={{ fontSize: '6.5pt', color: '#374151', margin: 0, fontFamily: mono }}>
          share yours → @norbert@social.deployonfri.day
        </p>
      </div>
    </div>
  )
}
