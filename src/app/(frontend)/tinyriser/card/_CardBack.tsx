'use client'

import React from 'react'

const mono = 'ui-monospace, "Cascadia Code", "Fira Code", monospace'

const CLUSTER_IMG =
  'https://raw.githubusercontent.com/BoKKeR/awesome-thinkcentres/master/images/6bay-homelab.webp'

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
      {/* Left: B&W cluster photo */}
      <div
        style={{
          width: '74mm',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLUSTER_IMG}
          alt="Six ThinkCentre Tiny homelab cluster"
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

      {/* Right: homelab description */}
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
              margin: '0 0 3mm 0',
              fontFamily: mono,
              letterSpacing: '-0.02em',
            }}
          >
            {'// my homelab'}
          </p>
          <p
            style={{
              fontSize: '7.5pt',
              color: '#374151',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: mono,
            }}
          >
            Six ThinkCentre Tinys running
            as a cluster at home. Needed
            PCIe in a small form factor —
            so I started making these.
          </p>
        </div>

        <p
          style={{
            fontSize: '7pt',
            color: '#9ca3af',
            margin: 0,
            fontFamily: mono,
          }}
        >
          deployonfri.day/thinkcentre
        </p>
      </div>
    </div>
  )
}
