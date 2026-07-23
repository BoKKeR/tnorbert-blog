import { L } from '@/components/L'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Homelab - deployonfri.day',
  description:
    'A 6-node bare-metal Kubernetes cluster - hardware, Ceph storage, Flux GitOps, Grafana monitoring, and how traffic reaches this site.',
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
}

interface CephNode {
  name: string
  drives: string[]
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const clusterNodes: ClusterNode[] = [
  {
    name: 'cat01',
    role: 'controller',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb'],
  },
  {
    name: 'cat02',
    role: 'controller',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb'],
  },
  {
    name: 'cat03',
    role: 'controller',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb'],
  },
  {
    name: 'cat04',
    role: 'worker',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb', '1x Micron 7450 Pro 960gb'],
  },
  {
    name: 'cat05',
    role: 'worker',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb', '1x Micron 7450 Pro 960gb'],
  },
  {
    name: 'cat06',
    role: 'worker',
    cpu: 'Intel Core i5-9500T · 6 cores',
    ram: '32 GB DDR4',
    drives: ['1x Samsung PM991 128gb', '1x Micron 7450 Pro 960gb'],
  },
]

const cephNodes: CephNode[] = [
  { name: 'cat04', drives: ['Micron 7450 Pro 960gb (OSD)'] },
  { name: 'cat05', drives: ['Micron 7450 Pro 960gb (OSD)'] },
  { name: 'cat06', drives: ['Micron 7450 Pro 960gb (OSD)'] },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomelabPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-10 pb-24">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          ← Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">Homelab</h1>
        <p className="text-base text-foreground/80 leading-relaxed">
          Six Lenovo <L href="/thinkcentre">ThinkCentre</L> M920Q &ldquo;Tiny&rdquo; nodes running
          bare-metal Kubernetes using <L href="https://www.siderolabs.com/talos-linux">Talos</L>.
          Managed with <L href="https://fluxcd.io">FluxCD</L> and Ansible, observed with Grafana,
          stored on <L href="https://rook.io">Rook-Ceph</L> and a remote NFS server.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/rack_combined_nobg.png"
          alt="Rack front and back"
          className="w-full mt-8"
        />
      </div>

      {/* Cluster Overview */}
      <section aria-labelledby="overview-heading" className="mb-14">
        <h2
          id="overview-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Cluster Overview
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {['6 nodes', '3 controllers · 3 workers', 'k8s v1.35.3'].map((pill) => (
            <span
              key={pill}
              className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20 font-mono"
            >
              {pill}
            </span>
          ))}
        </div>
        <dl className="flex flex-col gap-3">
          {(
            [
              {
                label: 'Networking',
                value: (
                  <>
                    1 GbE management ·{' '}
                    <L href="/thinkcentre">Mellanox ConnectX-4 Lx</L>{' '}
                    25 GbE point-to-point mesh between workers (2 ports per card, no 25 GbE switch)
                  </>
                ),
              },
              {
                label: 'Controllers',
                value:
                  '3 nodes -run control plane components and also schedule workload pods (no NoSchedule taint)',
              },
              {
                label: 'Workers',
                value: '3 nodes -primary workload hosts, Ceph OSD nodes, 25 GbE interconnect',
              },
            ] as { label: string; value: React.ReactNode }[]
          ).map((item) => (
            <div
              key={item.label}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <dt className="shrink-0 w-28 text-sm font-mono text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-sm text-foreground/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Node Grid */}
      <section aria-labelledby="nodes-heading" className="mb-14">
        <h2
          id="nodes-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Nodes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clusterNodes.map((node) => (
            <div
              key={node.name}
              className="border border-border rounded-sm p-4 flex flex-col gap-3"
            >
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
                  <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-warning/10 text-warning border-warning/20">
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
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section aria-labelledby="network-heading" className="mb-14">
        <h2
          id="network-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Infrastructure
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: 'Dell X1026',
              role: 'Switch',
              specs: [
                ['Ports', '24× 1 GbE + 2× SFP uplink'],
                ['Role', 'Management network'],
              ],
            },
            {
              name: 'Intel NUC6CAYH',
              role: 'Pi-hole',
              specs: [
                ['CPU', 'Intel Celeron J3455'],
                ['Role', 'DNS · ad filtering'],
              ],
            },
            {
              name: 'Unraid Server',
              role: 'NAS',
              specs: [
                ['CPU', 'Intel Core Ultra 7 265K'],
                ['RAM', '96 GiB DDR5'],
                ['MB', 'Gigabyte Z890'],
                ['OS', 'Unraid OS Plus'],
                ['Role', 'NAS · NFS server for cluster'],
              ],
            },
          ].map((device) => (
            <div
              key={device.name}
              className="border border-border rounded-sm p-4 flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-foreground">{device.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-muted text-muted-foreground border-border">
                  {device.role}
                </span>
              </div>
              <dl className="flex flex-col gap-1 text-xs">
                {device.specs.map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <dt className="w-12 shrink-0 font-mono text-muted-foreground">{label}</dt>
                    <dd className="text-foreground/80">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Storage */}
      <section aria-labelledby="storage-heading" className="mb-14">
        <h2
          id="storage-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Storage
        </h2>

        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          Persistent storage runs on{' '}
          <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded-sm">Rook-Ceph</span>{' '}
          across all three worker nodes. Each M920Q has a{' '}
          <span className="font-semibold">
            <L href="/thinkcentre">TinyRiser PCIe expansion card</L>
          </span>{' '}
          - an open-source riser that adds a PCIe x4 slot with an additional NVME M.2 capable slot
          to the M920Q/M720Q&apos;s. Ceph uses these drives as OSDs and presents block and
          filesystem storage classes to the cluster.
        </p>

        {/* Cluster stats */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['1 TB raw', '3 OSDs', '3x replication', 'block + filesystem'].map((pill) => (
            <span
              key={pill}
              className="text-xs px-2 py-1 rounded-sm bg-accent/10 text-accent border border-accent/20 font-mono"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Per-node drive inventory */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Drive Inventory
        </h3>
        <dl className="flex flex-col gap-3">
          {cephNodes.map((node) => (
            <div
              key={node.name}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <dt className="shrink-0 w-28 text-sm font-mono text-muted-foreground">{node.name}</dt>
              <dd className="text-sm text-foreground/80">{node.drives.join(' · ')}</dd>
            </div>
          ))}
        </dl>

        {/* Unraid NAS */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4 mt-10">
          Unraid NAS · NFS
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['40 TB raw', '5 data disks + parity', 'NFS → cluster'].map((pill) => (
            <span
              key={pill}
              className="text-xs px-2 py-1 rounded-sm bg-accent/10 text-accent border border-accent/20 font-mono"
            >
              {pill}
            </span>
          ))}
        </div>
        <dl className="flex flex-col gap-3 mb-4">
          {[
            ['Array', '6× WD 8 TB (5 data + 1 parity) · xfs'],
            ['Cache', 'Samsung 970 EVO Plus 1 TB NVMe · xfs'],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 py-2 border-b border-border/50 last:border-0">
              <dt className="shrink-0 w-28 text-sm font-mono text-muted-foreground">{label}</dt>
              <dd className="text-sm text-foreground/80">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Management */}
      <section aria-labelledby="management-heading" className="mb-14">
        <h2
          id="management-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Flux */}
          <div className="border border-border rounded-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-serif font-bold text-foreground">Flux</h3>
              <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-primary/10 text-primary border-primary/20">
                GitOps
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              All cluster state is declared in Git. Flux watches the repository and reconciles the
              cluster to match - Helm releases via{' '}
              <span className="font-mono text-xs">HelmRelease</span> CRDs, Kubernetes manifests
              applied automatically. Drift is detected and corrected without manual intervention.
              Image update automation bumps tags and opens PRs.
            </p>
          </div>

          {/* Ansible */}
          <div className="border border-border rounded-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-serif font-bold text-foreground">Ansible</h3>
              <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-accent/10 text-accent border-accent/20">
                Provisioning
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Node bootstrapping and OS-level configuration are handled by Ansible playbooks —
              generating Talos machine configs, applying them via talosctl, and handling Kubernetes
              version upgrades. Playbooks are idempotent; re-running them against any node brings it
              to the desired state without side effects.
            </p>
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section aria-labelledby="monitoring-heading" className="mb-14">
        <h2
          id="monitoring-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Monitoring
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          The{' '}
          <L href="https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack">
            kube-prometheus-stack
          </L>{' '}
          - metrics, logs, and dashboards - runs inside the cluster. Prometheus scrapes
          node-exporter, kube-state-metrics, and annotated application pods. Loki collects all pod
          logs via Promtail. Grafana is the single pane of glass for both. Alertmanager routes
          firing alerts.
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              name: 'Prometheus',
              category: 'Metrics',
              description:
                'Scrapes node-exporter, kube-state-metrics, ceph-exporter, and app pods. Retention: 400 days.',
            },
            {
              name: 'Grafana',
              category: 'Dashboards',
              description:
                'Node health, cluster overview, Ceph pool and OSD status, application metrics, and Loki log explorer.',
            },
            {
              name: 'Loki + Promtail',
              category: 'Logs',
              description:
                'All pod logs shipped via Promtail DaemonSet. Queryable in Grafana with LogQL.',
            },
            {
              name: 'Alertmanager',
              category: 'Alerting',
              description: 'Routes firing alerts to notification channels.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex gap-4 items-start py-3 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-32">
                <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-warning/10 text-warning border-warning/20">
                  {item.category}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-serif font-semibold text-sm text-foreground mb-0.5">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traffic Flow */}
      <section aria-labelledby="traffic-heading" className="mb-14">
        <h2
          id="traffic-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Traffic Flow
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-8">
          How a request for this site travels from a browser to a pod.
        </p>

        {/* Flow steps */}
        <ol className="flex flex-col gap-0">
          {[
            {
              step: '1',
              label: 'DNS → Cloudflare',
              detail:
                'The domain resolves to a Cloudflare-proxied IP. Cloudflare handles DDoS protection, caching, and TLS at the edge.',
            },
            {
              step: '2',
              label: 'Cloudflare → Envoy',
              detail:
                "Cloudflare forwards the request to the cluster's public IP. Envoy (ingress controller) terminates TLS using a certificate issued by cert-manager via Let's Encrypt DNS-01 challenge.",
            },
            {
              step: '3',
              label: 'Envoy → Service',
              detail:
                'Envoy matches the host/path against HTTPRoute rules and routes to the corresponding Kubernetes Service.',
            },
            {
              step: '4',
              label: 'Service → Pod',
              detail:
                'kube-proxy (iptables) load-balances across the healthy pods backing the Service. The request reaches the Next.js container.',
            },
          ].map((item, idx, arr) => (
            <li key={item.step} className="flex gap-4">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 shrink-0 rounded-sm border border-border bg-muted flex items-center justify-center font-mono text-xs text-muted-foreground">
                  {item.step}
                </div>
                {idx < arr.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
              </div>
              {/* Content */}
              <div className="pb-6 min-w-0">
                <p className="font-serif font-semibold text-sm text-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Internal DNS note */}
        <div className="mt-2 border border-border rounded-sm p-4 bg-muted/30">
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-foreground font-semibold">Internal DNS:</span> CoreDNS handles
            service discovery inside the cluster. Services are reachable at{' '}
            <span className="font-mono">service.namespace.svc.cluster.local</span>.
          </p>
        </div>
      </section>

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
