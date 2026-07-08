'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

const RACK_IMG = '/images/rack_lineart.png'

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
      {/* Left: combined rack photo (front + back in one image) */}
      <div style={{ width: '74mm', height: '74mm', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={RACK_IMG}
          alt="Rack front and back"
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
          borderLeft: '1.5pt solid #374151',
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
            {'// what did you build?'}
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
              border: '1.5pt solid #374151',
              padding: '2mm',
            }}
          >
            <tbody>
              {[
                ['hw', '6× ThinkCentre M920Q'],
                ['os', 'Talos Linux'],
                ['nodes', '3 ctrl · 3 workers'],
                ['net', 'ConnectX-4 CX4121C · 25GbE SFP'],
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
        <p style={{ fontSize: '6.5pt', color: '#374151', margin: 0, fontFamily: mono, display: 'flex', alignItems: 'center', gap: '1.5mm' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: '8pt', height: '8pt', flexShrink: 0, display: 'block' }}
            aria-hidden="true"
          >
            <path
              fill="#111111"
              d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102a4 4 0 0 1 1.071-2.695c.733-.719 1.695-1.087 2.891-1.087 1.382 0 2.428.53 3.124 1.59l.675 1.131.676-1.13c.695-1.061 1.742-1.592 3.124-1.592 1.195 0 2.157.368 2.89 1.087a4 4 0 0 1 1.07 2.695v6.407z"
            />
          </svg>
          share yours → @norbert@social.deployonfri.day
        </p>
      </div>
    </div>
  )
}
