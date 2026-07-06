# ThinkCentre Page — Design Spec

**Date:** 2026-07-06
**Status:** Approved

---

## Overview

A new static page at `/thinkcentre` serving as a community reference for the Lenovo ThinkCentre Tiny series (M920q, M720q, M920x, P330) used as homelab nodes. Content ported from the user's [awesome-thinkcentres](https://github.com/BoKKeR/awesome-thinkcentres) GitHub repo, focused on two areas: PCIe card compatibility and community builds/3D prints.

The page complements `/tinyriser` (which covers the board itself) and `/homelab` (which covers the user's cluster). Cross-links connect all three.

---

## Architecture

- Static hardcoded Next.js page — same pattern as `/tinyriser` and `/homelab`
- No CMS dependency
- Route: `src/app/(frontend)/thinkcentre/page.tsx`
- Data: `src/app/(frontend)/thinkcentre/data.ts` — typed `as const` arrays
- Tests: `src/__tests__/thinkcentre.test.ts` — vitest, node env, validates data shape
- Same layout: `max-w-2xl mx-auto px-4 pt-10 pb-24`, `font-serif` headings, `font-mono` labels, `border-border` separators
- `/thinkcentre` static route takes priority over the `[slug]` CMS catch-all — no conflict

---

## Sections

### 1. Header

- `<h1>` title: "ThinkCentre Tiny"
- One paragraph: what the M920q/M720q are (8th-gen Intel mini-PCs, $100–250 used), why they're popular homelab nodes, brief note that the page is a curated reference for builders
- Link to the source GitHub repo: `https://github.com/BoKKeR/awesome-thinkcentres`

### 2. PCIe Expansion Cards

Three sub-sections (Networking / Storage / GPU), each with a `<h3>` label and a `<dl>` bordered list.

Each entry: card name as `<dt>`, spec tag pill + compatibility note as `<dd>`.

**Networking entries:**
| Card | Tag | Note |
|---|---|---|
| Mellanox ConnectX-3 | 10G / 40G | Single or dual-port SFP+. Most common 10G choice for homelab. |
| Mellanox ConnectX-4 Lx | 25G / 100G | 25G SFP28 or 100G QSFP28. Used in high-throughput clusters. |
| Intel X520 | 10G | Dual-port SFP+. Well-supported in Linux, common in used market. |
| Intel X550 | 10G | RJ45 or SFP+. Higher power draw than X520 — check thermals. |
| Intel X710 | 10G | Good Linux support, lower power than X550. |
| Intel i350-AM4 | 1G | Quad-port 1GbE. Good for routing or management networks. |

**Storage entries:**
| Card | Tag | Note |
|---|---|---|
| Dell PERC H200 | SAS / SATA | HBA mode (IT firmware) for TrueNAS/ZFS. 8 ports SAS/SATA. |
| TISHRIC ASM1166 | 6× SATA | SATA controller for adding drives via TinyRiser PCIe slot. |

**GPU entries:**
| Card | Tag | Note |
|---|---|---|
| NVIDIA Quadro K1200 | GPU | Low-profile, 4× Mini DisplayPort, passive-friendly. |
| NVIDIA T600 | GPU | Low-profile, 4× Mini DP, 40W TDP. Good for light inference. |
| NVIDIA T1000 | GPU | Low-profile, 4× Mini DP, 50W TDP. Step up from T600. |
| NVIDIA RTX A2000 | GPU | Low-profile, 70W TDP. Best compute option for M920q. |

### 3. Community Builds

2-column card grid (same pattern as use cases on `/tinyriser`). Each card: title, description, tag pill, external link.

| Title | Tag | Description | Link |
|---|---|---|---|
| 4-bay NAS | nas | DIY 4-bay NAS from an M720q with 3D-printed enclosure and TinyRiser storage expansion. | Reddit |
| 6-bay 10G NAS | nas | 6-bay NAS with 10GbE networking built from an M720q. | Reddit |
| Kubernetes cluster | k8s | Multi-node bare-metal K8s cluster using M920q nodes — hardware selection and setup walkthrough. | Blog |
| OPNsense router | networking | M720q running OPNsense as a full-featured home router with Intel NIC via TinyRiser. | Reddit |
| Ceph storage mesh | storage | 10G Ceph storage mesh across multiple ThinkCentre nodes — distributed block storage for a homelab cluster. | Blog |

**External links (verbatim from source):**
- 4-bay NAS: `https://www.reddit.com/r/homelab/comments/1qllfjn/thinkbox_released_diy_4bay_nas_and_powerful/`
- 6-bay NAS: `https://www.reddit.com/r/homelab/comments/1sdmgzm/built_a_6bay_10gbps_nas_from_a_lenovo_m720q/`
- K8s cluster: `https://blog.zolty.systems/posts/2026-02-07-choosing-the-hardware`
- OPNsense: `https://www.reddit.com/r/homelab/comments/1lvnv72/built_a_opnsense_router_from_a_lenovo_m720q_intel/`
- Ceph: `https://heck.sh/posts/10g-ceph-mesh-tinyminimicro/`

### 4. 3D Printed Components

Flat bordered list. Each entry: name, short description, link label + URL.

| Name | Description | Link |
|---|---|---|
| ThinkNAS 2/4/6-bay | NAS enclosures for M920q/M720q — fits 2, 4, or 6 drives around the machine. | MakerWorld |
| ThinkLab 6-bay | 6-bay lab unit combining the ThinkCentre with drive bays in a single enclosure. | MakerWorld |
| Rack mounts | 1U dual mounts, vertical holders, 10" rack adapters for the Tiny form factor. | MakerWorld |
| HDD caddies | Drive caddy designs compatible with the ThinkNAS enclosures. | Thingiverse |

**Links:**
- ThinkNAS / ThinkLab / Rack mounts: MakerWorld collections — use search URL `https://makerworld.com/en/search?keyword=thinkcentre` (no direct stable link per model in source)
- HDD caddies: `https://www.thingiverse.com` (search "ThinkCentre caddy")

> **Note:** MakerWorld collection URLs are not stable. The page will link to a search rather than a specific model page to avoid dead links.

### 5. Footer / Cross-links

Two links at the bottom:
- "Building a cluster? I make the TinyRiser PCIe expansion board →" → `/tinyriser`
- "Source: awesome-thinkcentres on GitHub →" → `https://github.com/BoKKeR/awesome-thinkcentres`

---

## Cross-link Updates

- `src/app/(frontend)/tinyriser/page.tsx` — add a link to `/thinkcentre` in the footer CTA area (alongside the existing homelab link): "PCIe card compatibility + community builds →"
- Sitemap: add `/thinkcentre` to `next-sitemap.config.cjs` `additionalPaths` (same pattern as `/tinyriser`)

---

## Data Shape (for tests)

```ts
type PcieCard = { name: string; tag: string; note: string }
type Build = { title: string; tag: string; description: string; href: string }
type Print = { name: string; description: string; href: string }
```

All exported as `as const` readonly arrays: `PCIE_NETWORKING`, `PCIE_STORAGE`, `PCIE_GPUS`, `BUILDS`, `PRINTS`.

---

## Files

| File | Purpose |
|---|---|
| `src/app/(frontend)/thinkcentre/page.tsx` | Static page |
| `src/app/(frontend)/thinkcentre/data.ts` | Typed content arrays |
| `src/__tests__/thinkcentre.test.ts` | Data shape tests |
| `src/app/(frontend)/tinyriser/page.tsx` | Modified: add cross-link |
| `next-sitemap.config.cjs` | Modified: add `/thinkcentre` to sitemap |

---

## Out of Scope

- Model comparison tables (M720q/M920q/M920x specs) — not selected
- PCIe riser card comparison — covered by `/tinyriser`
- CPU upgrade recommendations — not selected
- Sourcing/procurement section — not selected
- CMS integration — hardcoded only

---

## Success Criteria

- `/thinkcentre` loads with 5 sections matching the design
- All external links open in `target="_blank" rel="noopener noreferrer"`
- PCIe card entries have name, tag pill, and note
- Community build cards link to correct external URLs
- `/tinyriser` has a cross-link to `/thinkcentre`
- `/thinkcentre` in sitemap, TypeScript clean, all data tests pass
