# TinyRiser Page & Shipment Card — Design Spec

**Date:** 2026-07-05
**Status:** Approved

---

## Overview

Two deliverables:

1. A static page at `/tinyriser` showcasing the TinyRiser PCIe expansion board for the Lenovo ThinkCentre M920Q — targeting both buyers (arriving from shipment card / shop) and homelab enthusiasts.
2. A printable shipment insert card at `/tinyriser/card` with QR code, thank-you note, and hand-assembly callout.

---

## Page: `/tinyriser`

### Architecture

- Static hardcoded Next.js page at `src/app/(frontend)/tinyriser/page.tsx`
- No CMS dependency — content is in the file, same pattern as `/homelab`
- Same layout wrapper: `max-w-2xl mx-auto px-4 pt-10 pb-24`
- Same visual language: serif headings, mono pills, `border-border` separators, `font-mono` labels
- Back link to `/` at the top

### Sections

#### 1. Header
- `<h1>` title: "TinyRiser"
- One paragraph intro: what the board is, which ThinkCentre models it fits (M920Q / M720Q / M920x), what problem it solves (the sealed chassis has no expansion slot — TinyRiser adds PCIe x4)

#### 2. What It Unlocks
- `<dl>` definition list (same pattern as homelab Cluster Overview)
- Items: PCIe x4 slot, NVMe drive support, 2.5G/10G NIC support, SFP+ NIC support, LED power indicator
- Each item: short label + one-sentence description of the practical benefit

#### 3. Use Cases
- 2-column card grid (same as homelab Node Grid)
- Cards: NAS / TrueNAS node, Ceph OSD node (NVMe OSDs), 10G networking node (SFP+), GPU compute / passthrough, general storage expansion
- Each card: title, 2-3 sentence description, pill tag (`storage` / `networking` / `compute`)

#### 4. How It's Made
- Ordered steps with connector-line visual (same as homelab Traffic Flow section)
- Steps: SMD stencil → place components → reflow (hot plate) → add connectors + standoff → drag solder PCIe pins (~90 pins) → add LED + resistor (hot air) → clean with IPA → inspect under microscope → tape backing
- Callout box at the bottom: "Each board is hand-assembled and hand-inspected. I own all the equipment from other hobbies — these aren't factory-produced."
- Honest note: "You could do it with a soldering iron alone — the hot plate just makes it faster."

#### 5. Other M920Q Upgrades
- Flat bordered list or `<dl>`: RAM (up to 64 GB DDR4 SO-DIMM), 2.5G NIC (M.2 A+E key), Wi-Fi card (M.2 A+E key), SFP+ NIC (via TinyRiser PCIe), NVMe (via TinyRiser PCIe)
- Brief note on slot compatibility per upgrade

#### 6. My Cluster
- Short paragraph (2-3 sentences): "Here's what I built with six of these." Mentions 6-node bare-metal Kubernetes cluster.
- Pill stats: 6 nodes, Ceph storage, 25GbE interconnect
- Link to `/homelab` for the full breakdown

#### 7. Buy / CTA
- Bordered callout box at page bottom (same style as homelab's internal DNS note but more prominent)
- Text: "Want one? Available in my shop." + external link to shop listing
- Kept understated — not a banner, consistent with site tone

---

## Shipment Insert Card: `/tinyriser/card`

### Architecture

- Static page at `src/app/(frontend)/tinyriser/card/page.tsx`
- Client component (`'use client'`) to render QR code in the browser
- QR code generated client-side with `qrcode.react` (lightweight, no server dependency)
- `@media print` CSS: hides everything except the card, removes margins, sets page size
- `@media screen` CSS: shows a centered preview of the card + a "Print" button above it

### Card Dimensions

- Half-A6 landscape: 148 × 74 mm — fits standard small envelopes, easy to cut from A4. Default choice.

### Card Contents

| Element | Content |
|---|---|
| QR code | Points to `https://deployonfri.day/tinyriser` |
| URL | `deployonfri.day/tinyriser` printed below QR |
| Thank-you | "Thanks for your order!" (short, warm) |
| Assembly note | "Hand-assembled & tested. Questions? Reach out at deployonfri.day" |
| Brand | "TinyRiser by Norbert" printed small at card edge |

### Print behaviour

- `@page { size: 148mm 74mm; margin: 0; }`
- All content fits within card bounds — no overflow, no clipping
- Monochrome-safe design (no colour fills that would look bad on a B&W printer)
- The screen preview wraps the card in a light shadow so you can see its boundary before printing

---

## Files to Create

| File | Purpose |
|---|---|
| `src/app/(frontend)/tinyriser/page.tsx` | Main TinyRiser page |
| `src/app/(frontend)/tinyriser/card/page.tsx` | Printable shipment insert card |

## Dependencies to Add

| Package | Why |
|---|---|
| `qrcode.react` | Client-side QR code rendering for the card |

---

## Out of Scope

- CMS integration — content is hardcoded
- Live cluster stats (uptime, pod count) — placeholders like `/homelab` until wired up
- Real product photos — page uses text/specs only for now; images can be added later
- Multiple card sizes / templates — one design, one size

---

## Success Criteria

- `/tinyriser` loads, matches the visual style of `/homelab`, contains all seven sections
- `/tinyriser/card` renders a card preview in browser and prints correctly to the card dimensions
- QR code on the card resolves to `/tinyriser`
- Both pages pass TypeScript type-check and build without errors
