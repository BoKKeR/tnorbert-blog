# Homelab Page Redesign — Design Spec

**Date:** 2026-05-09
**Status:** Approved

## Overview

Replace the existing `/homelab` page with a detailed, Kubernetes-focused page that tells the full story of the cluster: hardware, storage, management tooling, monitoring, and how traffic reaches the site. Numeric values (uptime, pod counts, RAM, CPU) are placeholder text so real data can be dropped in later.

The page follows the existing blog style: single-column `max-w-2xl`, serif headings, mono labels/tags, border-heavy Tailwind design, cream/ink/orange/blue palette.

---

## Sections

### 1. Header + Cluster Overview

- Back link (`← Home`)
- `<h1>` title: "Homelab"
- Intro prose: 6x Lenovo Thinkcentre M920Q "TinyRiser" nodes on bare metal, self-managed with Flux and Ansible
- Stat pill row: `6 nodes` · `3 controllers / 3 workers` · `XX pods running` · `k8s vX.XX.X`
- Pills use the existing `bg-primary/10 text-primary border-primary/20` token style

### 2. Node Grid

- `<section>` with `<h2>` "Nodes"
- 2-column CSS grid (`grid-cols-1 sm:grid-cols-2`), 6 cards total
- Each card (`border border-border rounded-sm p-4`):
  - Node name in `font-mono` (e.g. `controller-01`) + role badge (`Controller` or `Worker`)
  - CPU line: model + core count (placeholder: `Intel Core iX-XXXX · X cores`)
  - RAM line: `XX GB DDR4`
  - Drives line: list drives with size (placeholder: `1× NVMe 512 GB`)
  - Stat row at bottom: `↑ XXd uptime` · `XX pods`
  - Worker nodes: additional `25GbE` badge
  - Controllers: small note "(schedules pods)"
- All placeholder values marked with `XX` pattern for easy find-and-replace

### 3. Storage: Ceph Cluster

- `<section>` with `<h2>` "Storage"
- Prose explaining Rook-Ceph running across the 3 worker nodes
- Explain TinyRiser PCIe expansion cards: the M920Q has a proprietary riser slot; TinyRiser cards add a PCIe x4 slot, enabling NVMe or SAS drives that wouldn't otherwise fit the tiny chassis
- Drive inventory table-style list: node name → drives (placeholder)
- Cluster stats row: `XX TB raw` · `X OSDs` · `3× replication`
- Mention storage classes exposed to Kubernetes (block, filesystem)

### 4. Management

- `<section>` with `<h2>` "Management"
- Two sub-cards side by side (`grid-cols-1 sm:grid-cols-2`):
  - **Flux**: GitOps operator, cluster state declared in Git, automatic reconciliation, Helm releases managed via HelmRelease CRDs, image update automation
  - **Ansible**: node bootstrapping, OS-level config (kernel params, containerd, kubeadm), Kubernetes version upgrades, idempotent playbooks

### 5. Monitoring

- `<section>` with `<h2>` "Monitoring"
- Prometheus scrapes node-exporter, kube-state-metrics, and application pods
- Grafana dashboards: node health, cluster overview, Ceph, application metrics
- Loki + Promtail for log aggregation; all pod logs queryable in Grafana
- Alertmanager for alerting (mention routing, silence, inhibition briefly)
- Visual: list of key dashboards as tagged items (same tag style as services)

### 6. Traffic Flow

- `<section>` with `<h2>` "Traffic Flow"
- Explains how a request reaches the blog:
  1. DNS resolves to Cloudflare (proxied)
  2. Cloudflare handles DDoS protection + TLS at edge
  3. Request forwarded to ingress controller (placeholder: fill in actual — nginx/Traefik/etc.) running in cluster
  4. Ingress routes to Kubernetes Service → Pod
- cert-manager issues TLS certificates via Let's Encrypt DNS-01 challenge
- Internal DNS via CoreDNS for service discovery
- Visual: a stepped text-flow block using bordered `<div>` elements and `→` arrows, styled with mono font

### 7. Footer

- Border-top divider
- Link to self-hosting posts: "I write about this stack on Fridays. Browse self-hosting posts →"

---

## Data / Placeholder Strategy

All real metrics use a consistent placeholder pattern:
- Numbers: `XX` (e.g. `XX GB`, `XX pods`, `XXd uptime`)
- Versions: `vX.XX.X`
- Node names: `controller-01` through `controller-03`, `worker-01` through `worker-03`

This makes a future find-and-replace straightforward and keeps the page visually complete without real data.

---

## Implementation Notes

- Single file: `src/app/(frontend)/homelab/page.tsx` — full replacement
- No new dependencies; pure Tailwind + React
- No client components needed (static data only)
- Follow existing pattern from `about/page.tsx` and current `homelab/page.tsx`
- `categoryColors` pattern reused for role/badge colouring
