'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

const RACK_IMG =
  'https://raw.githubusercontent.com/BoKKeR/awesome-thinkcentres/master/images/10inch-rack-mount.webp'

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
      {/* Left: B&W rack photo */}
      <div style={{ width: '74mm', flexShrink: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={RACK_IMG}
          alt="ThinkCentre rack"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'grayscale(100%) contrast(1.1)',
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
          padding: '8mm 8mm 6mm 8mm',
          borderLeft: '1px solid #e5e7eb',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '10pt',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 3.5mm 0',
              fontFamily: mono,
              letterSpacing: '-0.02em',
            }}
          >
            {'// 6-node k8s'}
          </p>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              fontFamily: mono,
              fontSize: '6.5pt',
            }}
          >
            <tbody>
              {[
                ['hw', '6× ThinkCentre M920Q'],
                ['nodes', '3 ctrl · 3 workers'],
                ['net', '25 GbE (workers)'],
                ['storage', 'Rook-Ceph via TinyRiser'],
                ['gitops', 'Flux + Ansible'],
                ['obs', 'Prometheus · Grafana · Loki'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td
                    style={{
                      color: '#9ca3af',
                      paddingRight: '3mm',
                      paddingBottom: '1.5mm',
                      verticalAlign: 'top',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ color: '#374151', paddingBottom: '1.5mm', lineHeight: 1.4 }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            fontSize: '6.5pt',
            color: '#9ca3af',
            margin: 0,
            fontFamily: mono,
          }}
        >
          deployonfri.day/homelab
        </p>
      </div>
    </div>
  )
}
