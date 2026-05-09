import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Homelab — deployonfri.day',
  description:
    'A 6-node bare-metal Kubernetes cluster — hardware, Ceph storage, Flux GitOps, Grafana monitoring, and how traffic reaches this site.',
}

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

type NodeRole = 'controller' | 'worker'

interface ClusterNode {
  name: string
  role: NodeRole
  cpu: string
  ram: string
  drives: string[]
  uptime: string
  pods: string
}

interface CephNode {
  name: string
  drives: string[]
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const clusterNodes: ClusterNode[] = [
  { name: 'controller-01', role: 'controller', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB'], uptime: 'XXd', pods: 'XX' },
  { name: 'controller-02', role: 'controller', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB'], uptime: 'XXd', pods: 'XX' },
  { name: 'controller-03', role: 'controller', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB'], uptime: 'XXd', pods: 'XX' },
  { name: 'worker-01', role: 'worker', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB', '1× SSD XX GB'], uptime: 'XXd', pods: 'XX' },
  { name: 'worker-02', role: 'worker', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB', '1× SSD XX GB'], uptime: 'XXd', pods: 'XX' },
  { name: 'worker-03', role: 'worker', cpu: 'Intel Core i5-8500T · 6 cores', ram: 'XX GB DDR4', drives: ['1× NVMe XX GB', '1× SSD XX GB'], uptime: 'XXd', pods: 'XX' },
]

const cephNodes: CephNode[] = [
  { name: 'worker-01', drives: ['XX GB NVMe (OSD)', 'XX GB SSD (OSD)'] },
  { name: 'worker-02', drives: ['XX GB NVMe (OSD)', 'XX GB SSD (OSD)'] },
  { name: 'worker-03', drives: ['XX GB NVMe (OSD)', 'XX GB SSD (OSD)'] },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomelabPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 pb-24">
      {/* Back link */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
          ← Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">Homelab</h1>
        <p className="text-base text-foreground/80 leading-relaxed">
          Six Lenovo Thinkcentre M920Q &ldquo;TinyRiser&rdquo; nodes running bare-metal Kubernetes.
          Managed with Flux and Ansible, observed with Grafana, stored on Ceph. This page is a
          living document of what&apos;s running and how it all fits together.
        </p>
      </div>

      {/* TODO: sections go here */}

      {/* Footer */}
      <div className="border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          I write about this stack on Fridays.{' '}
          <Link href="/posts?category=self-hosting" className="text-primary hover:underline">
            Browse self-hosting posts →
          </Link>
        </p>
      </div>
    </main>
  )
}
