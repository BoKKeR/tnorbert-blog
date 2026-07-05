# TinyRiser Page & Shipment Card — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/tinyriser` static page showcasing the TinyRiser PCIe board and a `/tinyriser/card` printable shipment insert card.

**Architecture:** Two static Next.js pages under `src/app/(frontend)/tinyriser/`. The main page follows the `/homelab` pattern — hardcoded typed data arrays, JSX with Tailwind, no CMS. The card is a `'use client'` component using `qrcode.react` for QR generation and an inline `@media print` style block for print-ready output at 148 × 74 mm.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript, qrcode.react

## Global Constraints

- Visual style matches `/homelab`: `max-w-2xl mx-auto px-4 pt-10 pb-24` wrapper, `font-serif` headings, `font-mono` labels, `border-border` separators, same pill/badge patterns
- No CMS dependency — all content hardcoded in source files
- No `any` types — TypeScript strict mode
- QR code target URL: `https://deployonfri.day/tinyriser`
- Card dimensions: 148 × 74 mm (half-A6 landscape)
- Tests live in `src/__tests__/` and run with `npx vitest run` (node environment, no jsdom)
- Only pure-logic functions and exported constants are unit-tested; JSX rendering is validated by TypeScript + build

---

### Task 1: Install qrcode.react

**Files:**
- Modify: `package.json` (via npm install)

**Interfaces:**
- Produces: `import { QRCodeSVG } from 'qrcode.react'` available in card page (qrcode.react v3+ ships its own types)

- [ ] **Step 1: Install the package**

```bash
npm install qrcode.react
```

Expected: `qrcode.react` appears in `dependencies` in `package.json`.

- [ ] **Step 2: Verify types are bundled**

```bash
cat node_modules/qrcode.react/lib/index.d.ts | head -5
```

Expected: TypeScript definitions visible — `QRCodeSVG` and `QRCodeCanvas` exported.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add qrcode.react for shipment card QR code"
```

---

### Task 2: TinyRiser data module

**Files:**
- Create: `src/app/(frontend)/tinyriser/data.ts`
- Create: `src/__tests__/tinyriser.test.ts`

**Interfaces:**
- Produces:
  - `USE_CASES: readonly { title: string; tag: string; description: string }[]`
  - `ASSEMBLY_STEPS: readonly { step: string; label: string; detail: string }[]`
  - `UPGRADES: readonly { label: string; slot: string; note: string }[]`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tinyriser.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { USE_CASES, ASSEMBLY_STEPS, UPGRADES } from '../app/(frontend)/tinyriser/data'

describe('USE_CASES', () => {
  it('has at least 4 entries', () => {
    expect(USE_CASES.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty title, tag, and description', () => {
    for (const uc of USE_CASES) {
      expect(uc.title.length).toBeGreaterThan(0)
      expect(uc.tag.length).toBeGreaterThan(0)
      expect(uc.description.length).toBeGreaterThan(0)
    }
  })
})

describe('ASSEMBLY_STEPS', () => {
  it('steps are numbered sequentially from "1"', () => {
    ASSEMBLY_STEPS.forEach((s, i) => {
      expect(s.step).toBe(String(i + 1))
    })
  })

  it('every entry has non-empty label and detail', () => {
    for (const s of ASSEMBLY_STEPS) {
      expect(s.label.length).toBeGreaterThan(0)
      expect(s.detail.length).toBeGreaterThan(0)
    }
  })
})

describe('UPGRADES', () => {
  it('every entry has non-empty label, slot, and note', () => {
    for (const u of UPGRADES) {
      expect(u.label.length).toBeGreaterThan(0)
      expect(u.slot.length).toBeGreaterThan(0)
      expect(u.note.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx vitest run src/__tests__/tinyriser.test.ts
```

Expected: FAIL — `Cannot find module '../app/(frontend)/tinyriser/data'`

- [ ] **Step 3: Create the data file**

Create `src/app/(frontend)/tinyriser/data.ts`:

```ts
export const USE_CASES = [
  {
    title: 'NVMe Ceph OSD node',
    tag: 'storage',
    description:
      'Add a PCIe NVMe drive as a Ceph OSD. Three M920Q nodes with TinyRiser cards form a distributed Ceph cluster with replication and fast block storage.',
  },
  {
    title: 'NAS / TrueNAS node',
    tag: 'storage',
    description:
      'Install a PCIe SATA controller or NVMe drive via TinyRiser and run TrueNAS SCALE. The M920Q becomes a compact, silent NAS with full ZFS support.',
  },
  {
    title: '10G / 25G networking node',
    tag: 'networking',
    description:
      'Slot an SFP+ NIC into the TinyRiser PCIe port. Pairs well with a managed switch for a high-throughput homelab backbone — used in my cluster for 25GbE node-to-node links.',
  },
  {
    title: '2.5G edge router',
    tag: 'networking',
    description:
      'Add a 2.5GbE PCIe NIC for multi-WAN or a segmented network. The M920Q runs cool and quiet on ~35 W — ideal as an always-on router or firewall node.',
  },
  {
    title: 'GPU compute node',
    tag: 'compute',
    description:
      'Mount a low-profile GPU or accelerator card via the PCIe x4 slot for local inference or CUDA workloads. Bandwidth is gen 3 x4 — suited for lighter workloads.',
  },
] as const

export const ASSEMBLY_STEPS = [
  {
    step: '1',
    label: 'Stencil & paste',
    detail:
      'Apply solder paste through an SMD stencil onto the top-side pads. A 3D-printed jig holds the board steady. The stencil ensures consistent paste volume on the small SMD pads.',
  },
  {
    step: '2',
    label: 'Place SMD components',
    detail:
      'Place capacitors, resistors, and ICs on the top side by hand using tweezers. No mandatory ICs — some resellers skip them — but I include them for reliability.',
  },
  {
    step: '3',
    label: 'Reflow (hot plate)',
    detail:
      'Reflow the top side on a USB-C hot plate. The paste melts and self-centres the components. Watch for bridges, especially around the NVMe pads — they need clearing under the microscope.',
  },
  {
    step: '4',
    label: 'Connectors & standoffs',
    detail:
      'Add top-side connectors and the standoff using a 3D-printed jig. Tape down the edge connector to keep solder off it before the drag-soldering step.',
  },
  {
    step: '5',
    label: 'Drag solder PCIe pins',
    detail:
      'Drag solder approximately 90 PCIe edge connector pins by hand. Flux liberally, drag at a consistent angle. A soldering iron alone works fine — the hot plate is just faster for the SMD side.',
  },
  {
    step: '6',
    label: 'LED & resistor',
    detail:
      'Hand-place the LED and current-limiting resistor, then reflow with hot air. The LED indicates power-on state through the M920Q chassis without needing to open the machine.',
  },
  {
    step: '7',
    label: 'Clean & inspect',
    detail:
      'Clean the board with isopropyl alcohol. Inspect all joints under a microscope — solder bridges on the NVMe pads are the most common issue and need to be cleared before the board ships.',
  },
  {
    step: '8',
    label: 'Tape & test',
    detail:
      'Apply insulation tape to the back of the board. Install in an M920Q and confirm the PCIe slot is detected in the BIOS — every board is tested before it goes out.',
  },
] as const

export const UPGRADES = [
  {
    label: 'RAM',
    slot: 'SO-DIMM (2 slots)',
    note: 'Up to 64 GB DDR4. 2 × 32 GB SO-DIMMs. 3200 MHz sticks work fine.',
  },
  {
    label: 'NVMe (boot)',
    slot: 'M.2 2280 (M key)',
    note: 'Built-in M.2 slot — PCIe 3.0 x4. No TinyRiser required for this one.',
  },
  {
    label: 'NVMe (expansion)',
    slot: 'TinyRiser PCIe',
    note: 'Add a second NVMe drive via TinyRiser. Used for Ceph OSDs or extra storage.',
  },
  {
    label: '2.5G NIC',
    slot: 'M.2 A+E key',
    note: 'Replace the Wi-Fi card with a 2.5GbE Intel NIC (e.g. I225-V). No TinyRiser required.',
  },
  {
    label: 'SFP+ / 10G NIC',
    slot: 'TinyRiser PCIe',
    note: 'PCIe x4 SFP+ cards work well. I use these for 25GbE node-to-node links in my cluster.',
  },
  {
    label: 'Wi-Fi',
    slot: 'M.2 A+E key',
    note: 'AX200 / AX210 cards drop in. Useful if you want wireless on a controller node.',
  },
] as const
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npx vitest run src/__tests__/tinyriser.test.ts
```

Expected: PASS — all tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/data.ts src/__tests__/tinyriser.test.ts
git commit -m "feat(tinyriser): add typed data module for TinyRiser page"
```

---

### Task 3: TinyRiser main page

**Files:**
- Create: `src/app/(frontend)/tinyriser/page.tsx`

**Interfaces:**
- Consumes: `USE_CASES`, `ASSEMBLY_STEPS`, `UPGRADES` from `./data`
- Produces: `GET /tinyriser` — static page with 7 sections, metadata exported

- [ ] **Step 1: Create the page file**

Create `src/app/(frontend)/tinyriser/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { USE_CASES, ASSEMBLY_STEPS, UPGRADES } from './data'

export const metadata: Metadata = {
  title: 'TinyRiser — deployonfri.day',
  description:
    'PCIe expansion board for the Lenovo ThinkCentre M920Q. Adds a PCIe x4 slot to an otherwise sealed chassis — enabling NVMe drives, SFP+ NICs, and more.',
}

const TAG_STYLES: Record<string, string> = {
  storage: 'bg-primary/10 text-primary border-primary/20',
  networking: 'bg-accent/10 text-accent border-accent/20',
  compute: 'bg-warning/10 text-warning border-warning/20',
}

export default function TinyRiserPage() {
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
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          TinyRiser
        </h1>
        <p className="text-base text-foreground/80 leading-relaxed">
          A PCIe expansion board for the Lenovo ThinkCentre M920Q, M720Q, and M920x. The M920Q
          is a capable mini-PC — but its sealed chassis has no PCIe slot. TinyRiser adds one: a
          PCIe x4 connection routed from the M920Q&apos;s proprietary riser interface, giving you
          NVMe drives, SFP+ NICs, GPU cards, and more in a machine that would otherwise top out
          at its built-in M.2 slot.
        </p>
      </div>

      {/* What it unlocks */}
      <section aria-labelledby="unlocks-heading" className="mb-14">
        <h2
          id="unlocks-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          What It Unlocks
        </h2>
        <dl className="flex flex-col gap-3">
          {[
            {
              label: 'PCIe x4 slot',
              value:
                "Full PCIe 3.0 x4 connection — the same bus that drives the M920Q's NVMe slot, now exposed for any compatible card.",
            },
            {
              label: 'NVMe support',
              value:
                'Install a second NVMe drive alongside the built-in M.2. Useful for Ceph OSDs, dedicated storage pools, or running a second OS.',
            },
            {
              label: '2.5G / 10G NIC',
              value:
                'PCIe network cards drop straight in. Pair with a managed switch for a proper homelab backbone without any soldering on the mainboard.',
            },
            {
              label: 'SFP+ NIC',
              value:
                'Used in my own cluster for 25GbE node-to-node links. Any single or dual-port SFP+ card in PCIe x4 form factor works.',
            },
            {
              label: 'GPU / accelerator',
              value:
                'Low-profile cards fit the PCIe x4 slot. Gen 3 x4 bandwidth — suited for lighter inference workloads or CUDA experiments.',
            },
            {
              label: 'Power LED',
              value:
                'An onboard LED indicates power-on state, visible through the M920Q chassis without opening the machine.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <dt className="shrink-0 w-36 text-sm font-mono text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-sm text-foreground/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading" className="mb-14">
        <h2
          id="usecases-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="border border-border rounded-sm p-4 flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif font-bold text-sm text-foreground">{uc.title}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${
                    TAG_STYLES[uc.tag] ?? 'bg-muted text-muted-foreground border-border'
                  }`}
                >
                  {uc.tag}
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it's made */}
      <section aria-labelledby="assembly-heading" className="mb-14">
        <h2
          id="assembly-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          How It&apos;s Made
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-8">
          Each board is hand-assembled. I do the full process myself — stencil, reflow, drag
          soldering, inspection. Here&apos;s what that looks like.
        </p>
        <ol className="flex flex-col gap-0">
          {ASSEMBLY_STEPS.map((item, idx) => (
            <li key={item.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 shrink-0 rounded-sm border border-border bg-muted flex items-center justify-center font-mono text-xs text-muted-foreground">
                  {item.step}
                </div>
                {idx < ASSEMBLY_STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-border my-1" />
                )}
              </div>
              <div className="pb-6 min-w-0">
                <p className="font-serif font-semibold text-sm text-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-2 border border-border rounded-sm p-4 bg-muted/30">
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-foreground font-semibold">Hand-assembled & tested.</span> Every
            board is inspected under a microscope before it ships. I own all the equipment from
            other hobbies — these aren&apos;t factory-produced, and that&apos;s intentional.
          </p>
        </div>
      </section>

      {/* Other M920Q upgrades */}
      <section aria-labelledby="upgrades-heading" className="mb-14">
        <h2
          id="upgrades-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Other M920Q Upgrades
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          TinyRiser opens the PCIe slot — but there are other worthwhile upgrades for the M920Q
          that don&apos;t require it.
        </p>
        <dl className="flex flex-col gap-3">
          {UPGRADES.map((u) => (
            <div
              key={u.label}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-36">
                <dt className="text-sm font-mono text-muted-foreground">{u.label}</dt>
                <dd className="text-xs font-mono text-muted-foreground/60 mt-0.5">{u.slot}</dd>
              </div>
              <dd className="text-sm text-foreground/80">{u.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* My cluster */}
      <section aria-labelledby="cluster-heading" className="mb-14">
        <h2
          id="cluster-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          My Cluster
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          I run six of these in a bare-metal Kubernetes cluster. Each worker node has a TinyRiser
          card with an NVMe OSD for Ceph storage and an SFP+ NIC for the 25GbE backbone. The
          controllers use the TinyRiser slot for an additional NVMe drive on the expansion side.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            '6 nodes',
            '3 controllers · 3 workers',
            'Ceph storage',
            '25GbE interconnect',
            'Flux GitOps',
          ].map((pill) => (
            <span
              key={pill}
              className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20 font-mono"
            >
              {pill}
            </span>
          ))}
        </div>
        <Link href="/homelab" className="text-sm text-primary hover:underline font-mono">
          Full homelab breakdown →
        </Link>
      </section>

      {/* CTA */}
      <div className="border border-border rounded-sm p-6 bg-muted/20">
        <p className="font-serif font-bold text-foreground mb-2">Want one?</p>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Available in my shop. Ships with instructions and a card linking back to this page for
          setup guides and upgrade references.
        </p>
        <a
          href="SHOP_URL_PLACEHOLDER"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-primary hover:underline"
        >
          Buy →
        </a>
      </div>
    </main>
  )
}
```

> **Note:** Replace `SHOP_URL_PLACEHOLDER` in the CTA `<a href>` with the real shop listing URL (eBay, Etsy, etc.) before committing.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify page loads in dev**

```bash
npm run dev
```

Open `http://localhost:3000/tinyriser` and confirm:
- All 7 sections render in order
- Use case cards display in a 2-column grid on wider screens
- Assembly steps show the numbered connector-line visual
- The homelab link at the bottom navigates to `/homelab`

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/page.tsx
git commit -m "feat(tinyriser): add /tinyriser static page"
```

---

### Task 4: Shipment card constants + test

**Files:**
- Create: `src/app/(frontend)/tinyriser/card/constants.ts`
- Create: `src/__tests__/tinyriserCard.test.ts`

**Interfaces:**
- Produces: `TINYRISER_URL: string` — consumed by the card page

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tinyriserCard.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { TINYRISER_URL } from '../app/(frontend)/tinyriser/card/constants'

describe('TINYRISER_URL', () => {
  it('points to the tinyriser page', () => {
    expect(TINYRISER_URL).toBe('https://deployonfri.day/tinyriser')
  })

  it('is a valid https URL', () => {
    expect(() => new URL(TINYRISER_URL)).not.toThrow()
    expect(new URL(TINYRISER_URL).protocol).toBe('https:')
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx vitest run src/__tests__/tinyriserCard.test.ts
```

Expected: FAIL — `Cannot find module '../app/(frontend)/tinyriser/card/constants'`

- [ ] **Step 3: Create the constants file**

Create `src/app/(frontend)/tinyriser/card/constants.ts`:

```ts
export const TINYRISER_URL = 'https://deployonfri.day/tinyriser'
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npx vitest run src/__tests__/tinyriserCard.test.ts
```

Expected: PASS — both tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/card/constants.ts src/__tests__/tinyriserCard.test.ts
git commit -m "feat(tinyriser): add card constants module with TINYRISER_URL"
```

---

### Task 5: Shipment card page

**Files:**
- Create: `src/app/(frontend)/tinyriser/card/page.tsx`

**Interfaces:**
- Consumes: `QRCodeSVG` from `qrcode.react`, `TINYRISER_URL` from `./constants`
- Produces: `GET /tinyriser/card` — print-ready card at 148 × 74 mm; screen shows preview + Print button

- [ ] **Step 1: Create the card page**

Create `src/app/(frontend)/tinyriser/card/page.tsx`:

```tsx
'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { TINYRISER_URL } from './constants'

export default function TinyRiserCardPage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { margin: 0; padding: 0; background: white; }
          .screen-only { display: none !important; }
          .card { width: 148mm; height: 74mm; margin: 0; box-shadow: none; border: none; }
          @page { size: 148mm 74mm; margin: 0; }
        }
      `}</style>

      {/* Screen-only: label + print button */}
      <div className="screen-only flex flex-col items-center gap-6 py-10 px-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            Shipment insert card — 148 × 74 mm
          </p>
          <button
            onClick={() => window.print()}
            className="text-sm font-mono px-4 py-2 border border-border rounded-sm bg-background hover:bg-muted transition-colors"
          >
            Print →
          </button>
        </div>
      </div>

      {/* Card — centered on screen, fills page when printed */}
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
        {/* Left column: QR code */}
        <div
          style={{
            width: '74mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #e5e7eb',
            padding: '8mm',
            gap: '3mm',
            flexShrink: 0,
          }}
        >
          <QRCodeSVG
            value={TINYRISER_URL}
            size={140}
            bgColor="#ffffff"
            fgColor="#111111"
            level="M"
          />
          <p
            style={{
              fontSize: '7pt',
              color: '#6b7280',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            deployonfri.day/tinyriser
          </p>
        </div>

        {/* Right column: text */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8mm 8mm 6mm 8mm',
          }}
        >
          {/* Thank-you */}
          <div>
            <p
              style={{
                fontSize: '13pt',
                fontWeight: 700,
                color: '#111111',
                margin: '0 0 3mm 0',
                fontFamily: 'ui-serif, Georgia, serif',
              }}
            >
              Thanks for your order!
            </p>
            <p
              style={{
                fontSize: '8pt',
                color: '#374151',
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              Scan the QR code or visit the link for setup guides, compatible upgrades, and
              use-case examples.
            </p>
          </div>

          {/* Assembly note */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4mm' }}>
            <p
              style={{
                fontSize: '7.5pt',
                color: '#6b7280',
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              This board is{' '}
              <strong style={{ color: '#374151' }}>hand-assembled & tested</strong> — solder
              stencil, reflow, and inspected under a microscope before shipping. Questions?
              Reach out at <span style={{ color: '#111111' }}>deployonfri.day</span>.
            </p>
          </div>

          {/* Brand */}
          <p
            style={{
              fontSize: '6.5pt',
              color: '#9ca3af',
              margin: 0,
              textAlign: 'right',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            TinyRiser by Norbert
          </p>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manually verify the card in browser**

```bash
npm run dev
```

Open `http://localhost:3000/tinyriser/card`. Check:
- Card preview is centered on a neutral background
- QR code renders (black on white)
- "Print →" button is visible
- Use your phone to scan the QR code — it should open `https://deployonfri.day/tinyriser`
- Hit Cmd+P (macOS) / Ctrl+P (Windows) — the print preview should show only the card at 148 × 74 mm with no browser UI around it

- [ ] **Step 4: Exclude card from sitemap**

The sitemap config at `next-sitemap.config.cjs` already excludes all `/*` paths via the `exclude` array. The `/tinyriser` page is a static hardcoded page like `/homelab` — it won't appear in the CMS-generated `pages-sitemap.xml`. If you want it indexed by search engines, add it explicitly to the sitemap config:

Open `next-sitemap.config.cjs` and add an `additionalPaths` function:

```js
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/tinyriser'),
    // /tinyriser/card intentionally omitted — print utility, not a public page
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
```

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: all tests pass, including the new `tinyriser.test.ts` and `tinyriserCard.test.ts` suites.

- [ ] **Step 6: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/card/page.tsx next-sitemap.config.cjs
git commit -m "feat(tinyriser): add /tinyriser/card printable shipment insert"
```

---

### Task 6: Fill in shop URL

**Files:**
- Modify: `src/app/(frontend)/tinyriser/page.tsx`

**Interfaces:**
- Consumes: real shop listing URL from user (eBay, Etsy, etc.)

- [ ] **Step 1: Replace the shop URL placeholder**

In `src/app/(frontend)/tinyriser/page.tsx`, find the CTA section and replace `SHOP_URL_PLACEHOLDER` with the real listing URL:

```tsx
<a
  href="https://www.ebay.com/itm/YOUR_REAL_LISTING_ID"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm font-mono text-primary hover:underline"
>
  Buy on eBay →
</a>
```

Update the link text to match the platform (e.g. "Buy on eBay →", "Buy on Etsy →").

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/page.tsx
git commit -m "feat(tinyriser): add real shop link to CTA"
```
