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

      {/* Cluster Overview */}
      <section aria-labelledby="overview-heading" className="mb-14">
        <h2 id="overview-heading" className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border">
          Cluster Overview
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            '6 nodes',
            '3 controllers · 3 workers',
            'XX pods running',
            'k8s vX.XX.X',
          ].map((pill) => (
            <span
              key={pill}
              className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20 font-mono"
            >
              {pill}
            </span>
          ))}
        </div>
        <dl className="flex flex-col gap-3">
          {[
            { label: 'Hardware', value: 'Lenovo Thinkcentre M920Q (TinyRiser) — Intel 8th-gen, mini-PC form factor with PCIe expansion via TinyRiser card' },
            { label: 'Networking', value: '1 GbE management · 25 GbE node-to-node on all 3 worker nodes' },
            { label: 'Controllers', value: '3 nodes — run control plane components and also schedule workload pods (no NoSchedule taint)' },
            { label: 'Workers', value: '3 nodes — primary workload hosts, Ceph OSD nodes, 25 GbE interconnect' },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-2 border-b border-border/50 last:border-0">
              <dt className="shrink-0 w-28 text-sm font-mono text-muted-foreground">{item.label}</dt>
              <dd className="text-sm text-foreground/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Node Grid */}
      <section aria-labelledby="nodes-heading" className="mb-14">
        <h2 id="nodes-heading" className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border">
          Nodes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clusterNodes.map((node) => (
            <div key={node.name} className="border border-border rounded-sm p-4 flex flex-col gap-3">
              {/* Name + badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-foreground">{node.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${
                    node.role === 'controller'
                      ? 'bg-accent/10 text-accent border-accent/20'
                      : 'bg-primary/10 text-primary border-primary/20'
                  }`}
                >
                  {node.role}
                </span>
                {node.role === 'worker' && (
                  <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-warning/10 text-warning-foreground border-warning/20">
                    25GbE
                  </span>
                )}
                {node.role === 'controller' && (
                  <span className="text-xs text-muted-foreground font-mono">(schedules pods)</span>
                )}
              </div>

              {/* Specs */}
              <dl className="flex flex-col gap-1 text-xs">
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-mono text-muted-foreground">CPU</dt>
                  <dd className="text-foreground/80">{node.cpu}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-mono text-muted-foreground">RAM</dt>
                  <dd className="text-foreground/80">{node.ram}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-mono text-muted-foreground">Drives</dt>
                  <dd className="text-foreground/80">{node.drives.join(' · ')}</dd>
                </div>
              </dl>

              {/* Stats */}
              <div className="flex gap-4 pt-2 border-t border-border/50 text-xs font-mono text-muted-foreground">
                <span>↑ {node.uptime} uptime</span>
                <span>{node.pods} pods</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TODO: remaining sections */}

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
