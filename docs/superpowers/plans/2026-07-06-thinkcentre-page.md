# ThinkCentre Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static `/thinkcentre` page with PCIe card compatibility tables, community builds, and 3D print links, ported from the awesome-thinkcentres repo.

**Architecture:** Static hardcoded Next.js page following the `/tinyriser` and `/homelab` pattern. Content lives in a typed `data.ts` module; `page.tsx` renders it. A cross-link from `/tinyriser` footer and a sitemap entry complete the integration.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript, vitest

## Global Constraints

- Same layout as `/homelab` and `/tinyriser`: `max-w-2xl mx-auto px-4 pt-10 pb-24`, `font-serif` headings, `font-mono` labels, `border-border` separators
- No CMS dependency — all content hardcoded
- No `any` types — TypeScript strict mode
- All external links use `target="_blank" rel="noopener noreferrer"`
- Tests live in `src/__tests__/`, run with `npx vitest run`, node environment (no jsdom)
- TDD: test written before implementation for data module
- Exports: `PCIE_NETWORKING`, `PCIE_STORAGE`, `PCIE_GPUS`, `BUILDS`, `PRINTS` — all `as const` readonly arrays

---

### Task 1: ThinkCentre data module

**Files:**
- Create: `src/app/(frontend)/thinkcentre/data.ts`
- Create: `src/__tests__/thinkcentre.test.ts`

**Interfaces:**
- Produces:
  - `PCIE_NETWORKING: readonly { name: string; tag: string; note: string }[]`
  - `PCIE_STORAGE: readonly { name: string; tag: string; note: string }[]`
  - `PCIE_GPUS: readonly { name: string; tag: string; note: string }[]`
  - `BUILDS: readonly { title: string; tag: string; description: string; href: string }[]`
  - `PRINTS: readonly { name: string; description: string; href: string }[]`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/thinkcentre.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  PCIE_NETWORKING,
  PCIE_STORAGE,
  PCIE_GPUS,
  BUILDS,
  PRINTS,
} from '../app/(frontend)/thinkcentre/data'

describe('PCIE_NETWORKING', () => {
  it('has at least 4 entries', () => {
    expect(PCIE_NETWORKING.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_NETWORKING) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('PCIE_STORAGE', () => {
  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_STORAGE) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('PCIE_GPUS', () => {
  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_GPUS) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('BUILDS', () => {
  it('has at least 4 entries', () => {
    expect(BUILDS.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty title, tag, description, href', () => {
    for (const b of BUILDS) {
      expect(b.title.length).toBeGreaterThan(0)
      expect(b.tag.length).toBeGreaterThan(0)
      expect(b.description.length).toBeGreaterThan(0)
      expect(b.href.length).toBeGreaterThan(0)
    }
  })

  it('every href is a valid https URL', () => {
    for (const b of BUILDS) {
      expect(() => new URL(b.href)).not.toThrow()
      expect(new URL(b.href).protocol).toBe('https:')
    }
  })
})

describe('PRINTS', () => {
  it('every entry has non-empty name, description, href', () => {
    for (const p of PRINTS) {
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
      expect(p.href.length).toBeGreaterThan(0)
    }
  })

  it('every href is a valid https URL', () => {
    for (const p of PRINTS) {
      expect(() => new URL(p.href)).not.toThrow()
      expect(new URL(p.href).protocol).toBe('https:')
    }
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx vitest run src/__tests__/thinkcentre.test.ts
```

Expected: FAIL — `Cannot find module '../app/(frontend)/thinkcentre/data'`

- [ ] **Step 3: Create the data file**

Create `src/app/(frontend)/thinkcentre/data.ts`:

```ts
export const PCIE_NETWORKING = [
  {
    name: 'Mellanox ConnectX-3',
    tag: '10G / 40G',
    note: 'Single or dual-port SFP+. Most common 10G choice for homelab. Widely available used.',
  },
  {
    name: 'Mellanox ConnectX-4 Lx',
    tag: '25G / 100G',
    note: '25G SFP28 or 100G QSFP28. Used in high-throughput clusters where ConnectX-3 bandwidth is a bottleneck.',
  },
  {
    name: 'Intel X520',
    tag: '10G',
    note: 'Dual-port SFP+. Well-supported in Linux, common in the used market, runs cool.',
  },
  {
    name: 'Intel X550',
    tag: '10G',
    note: 'RJ45 or SFP+. Higher power draw than X520 — check chassis thermals before installing.',
  },
  {
    name: 'Intel X710',
    tag: '10G',
    note: 'Good Linux support, lower power draw than X550. Single or dual-port SFP+.',
  },
  {
    name: 'Intel i350-AM4',
    tag: '1G',
    note: 'Quad-port 1GbE. Good for routing, management networks, or multi-WAN setups.',
  },
] as const

export const PCIE_STORAGE = [
  {
    name: 'Dell PERC H200',
    tag: 'SAS / SATA',
    note: 'Flash to IT firmware for TrueNAS/ZFS passthrough. 8 ports SAS/SATA. Common and cheap used.',
  },
  {
    name: 'TISHRIC ASM1166',
    tag: '6× SATA',
    note: 'SATA controller for adding up to 6 drives via the TinyRiser PCIe slot. Good TrueNAS compatibility.',
  },
] as const

export const PCIE_GPUS = [
  {
    name: 'NVIDIA Quadro K1200',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DisplayPort, passive-cooled option available. Good for display output.',
  },
  {
    name: 'NVIDIA T600',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DP, 40W TDP. Good for light inference workloads.',
  },
  {
    name: 'NVIDIA T1000',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DP, 50W TDP. Step up from T600 for heavier compute.',
  },
  {
    name: 'NVIDIA RTX A2000',
    tag: 'GPU',
    note: 'Low-profile, 70W TDP. Best compute option for the M920q — CUDA and inference tasks.',
  },
] as const

export const BUILDS = [
  {
    title: '4-bay NAS',
    tag: 'nas',
    description:
      'DIY 4-bay NAS from an M720q with 3D-printed enclosure and TinyRiser storage expansion.',
    href: 'https://www.reddit.com/r/homelab/comments/1qllfjn/thinkbox_released_diy_4bay_nas_and_powerful/',
  },
  {
    title: '6-bay 10G NAS',
    tag: 'nas',
    description: '6-bay NAS with 10GbE networking built from an M720q — drives, NIC, and enclosure walkthrough.',
    href: 'https://www.reddit.com/r/homelab/comments/1sdmgzm/built_a_6bay_10gbps_nas_from_a_lenovo_m720q/',
  },
  {
    title: 'Kubernetes cluster',
    tag: 'k8s',
    description:
      'Multi-node bare-metal K8s cluster using M920q nodes — hardware selection and cluster setup.',
    href: 'https://blog.zolty.systems/posts/2026-02-07-choosing-the-hardware',
  },
  {
    title: 'OPNsense router',
    tag: 'networking',
    description:
      'M720q running OPNsense as a full-featured home router with an Intel NIC installed via TinyRiser.',
    href: 'https://www.reddit.com/r/homelab/comments/1lvnv72/built_a_opnsense_router_from_a_lenovo_m720q_intel/',
  },
  {
    title: 'Ceph storage mesh',
    tag: 'storage',
    description:
      '10G Ceph storage mesh across multiple ThinkCentre nodes — distributed block storage for a homelab cluster.',
    href: 'https://heck.sh/posts/10g-ceph-mesh-tinyminimicro/',
  },
] as const

export const PRINTS = [
  {
    name: 'ThinkNAS 2/4/6-bay',
    description:
      'NAS enclosures for M920q/M720q — fits 2, 4, or 6 drives around the machine in a compact form factor.',
    href: 'https://makerworld.com/en/search?keyword=thinkcentre',
  },
  {
    name: 'ThinkLab 6-bay',
    description:
      '6-bay lab unit combining the ThinkCentre with drive bays in a single printed enclosure.',
    href: 'https://makerworld.com/en/search?keyword=thinklab',
  },
  {
    name: 'Rack mounts',
    description:
      '1U dual mounts, vertical holders, and 10" rack adapters for the Tiny form factor.',
    href: 'https://makerworld.com/en/search?keyword=thinkcentre+rack',
  },
  {
    name: 'HDD caddies',
    description: 'Drive caddy designs compatible with the ThinkNAS enclosures.',
    href: 'https://www.thingiverse.com/search?q=thinkcentre+caddy',
  },
] as const
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npx vitest run src/__tests__/thinkcentre.test.ts
```

Expected: PASS — all 9 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/thinkcentre/data.ts src/__tests__/thinkcentre.test.ts
git commit -m "feat(thinkcentre): add typed data module for ThinkCentre page"
```

---

### Task 2: ThinkCentre main page

**Files:**
- Create: `src/app/(frontend)/thinkcentre/page.tsx`

**Interfaces:**
- Consumes: `PCIE_NETWORKING`, `PCIE_STORAGE`, `PCIE_GPUS`, `BUILDS`, `PRINTS` from `./data`
- Produces: `GET /thinkcentre` — static page with 5 sections, `metadata` exported

- [ ] **Step 1: Create the page file**

Create `src/app/(frontend)/thinkcentre/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { PCIE_NETWORKING, PCIE_STORAGE, PCIE_GPUS, BUILDS, PRINTS } from './data'

export const metadata: Metadata = {
  title: 'ThinkCentre Tiny — deployonfri.day',
  description:
    'A curated reference for Lenovo ThinkCentre Tiny homelab nodes — PCIe expansion card compatibility, community builds, and 3D printed enclosures.',
}

const BUILD_TAG_STYLES: Record<string, string> = {
  nas: 'bg-primary/10 text-primary border-primary/20',
  k8s: 'bg-accent/10 text-accent border-accent/20',
  networking: 'bg-warning/10 text-warning border-warning/20',
  storage: 'bg-primary/10 text-primary border-primary/20',
}

export default function ThinkCentrePage() {
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
          ThinkCentre Tiny
        </h1>
        <p className="text-base text-foreground/80 leading-relaxed">
          The Lenovo ThinkCentre M920q, M720q, and M920x are compact 8th-gen Intel mini-PCs that
          routinely sell for $100–250 used. They run cool, quiet, and dense — making them a popular
          choice for homelab nodes, NAS boxes, routers, and Kubernetes clusters. This is a curated
          reference for builders, ported from the{' '}
          <a
            href="https://github.com/BoKKeR/awesome-thinkcentres"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-mono text-sm"
          >
            awesome-thinkcentres
          </a>{' '}
          repository.
        </p>
      </div>

      {/* PCIe Expansion Cards */}
      <section aria-labelledby="pcie-heading" className="mb-14">
        <h2
          id="pcie-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          PCIe Expansion Cards
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-8">
          Tested cards that fit the PCIe x4 slot exposed by a riser card (TinyRiser, PowerRiser,
          or the official Lenovo riser). All entries are community-verified in the M920q/M720q
          chassis.
        </p>

        {/* Networking */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Networking
        </h3>
        <dl className="flex flex-col gap-3 mb-8">
          {PCIE_NETWORKING.map((card) => (
            <div
              key={card.name}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-44">
                <dt className="text-sm font-mono text-foreground font-semibold">{card.name}</dt>
                <dd className="mt-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-accent/10 text-accent border-accent/20">
                    {card.tag}
                  </span>
                </dd>
              </div>
              <dd className="text-sm text-foreground/80">{card.note}</dd>
            </div>
          ))}
        </dl>

        {/* Storage */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Storage
        </h3>
        <dl className="flex flex-col gap-3 mb-8">
          {PCIE_STORAGE.map((card) => (
            <div
              key={card.name}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-44">
                <dt className="text-sm font-mono text-foreground font-semibold">{card.name}</dt>
                <dd className="mt-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-primary/10 text-primary border-primary/20">
                    {card.tag}
                  </span>
                </dd>
              </div>
              <dd className="text-sm text-foreground/80">{card.note}</dd>
            </div>
          ))}
        </dl>

        {/* GPU */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
          GPU
        </h3>
        <dl className="flex flex-col gap-3">
          {PCIE_GPUS.map((card) => (
            <div
              key={card.name}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-44">
                <dt className="text-sm font-mono text-foreground font-semibold">{card.name}</dt>
                <dd className="mt-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded-sm border font-mono bg-warning/10 text-warning border-warning/20">
                    {card.tag}
                  </span>
                </dd>
              </div>
              <dd className="text-sm text-foreground/80">{card.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Community Builds */}
      <section aria-labelledby="builds-heading" className="mb-14">
        <h2
          id="builds-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          Community Builds
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BUILDS.map((build) => (
            <a
              key={build.title}
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif font-bold text-sm text-foreground">{build.title}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${
                    BUILD_TAG_STYLES[build.tag] ?? 'bg-muted text-muted-foreground border-border'
                  }`}
                >
                  {build.tag}
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{build.description}</p>
              <span className="text-xs font-mono text-primary mt-auto">Read more →</span>
            </a>
          ))}
        </div>
      </section>

      {/* 3D Printed Components */}
      <section aria-labelledby="prints-heading" className="mb-14">
        <h2
          id="prints-heading"
          className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
        >
          3D Printed Components
        </h2>
        <dl className="flex flex-col gap-3">
          {PRINTS.map((p) => (
            <div
              key={p.name}
              className="flex gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="shrink-0 w-44">
                <dt className="text-sm font-mono text-foreground font-semibold">{p.name}</dt>
              </div>
              <dd className="flex flex-col gap-1 min-w-0">
                <span className="text-sm text-foreground/80">{p.description}</span>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-primary hover:underline"
                >
                  Browse designs →
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Footer / cross-links */}
      <div className="border-t border-border pt-8 flex flex-col gap-3">
        <Link href="/tinyriser" className="text-sm text-primary hover:underline font-mono">
          Building a cluster? I make the TinyRiser PCIe expansion board →
        </Link>
        <a
          href="https://github.com/BoKKeR/awesome-thinkcentres"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          Source: awesome-thinkcentres on GitHub →
        </a>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors in new files. Two pre-existing errors in `src/__tests__/postHero.property.test.ts` are unrelated — ignore them.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/thinkcentre/page.tsx
git commit -m "feat(thinkcentre): add /thinkcentre static page"
```

---

### Task 3: Cross-link updates

**Files:**
- Modify: `src/app/(frontend)/tinyriser/page.tsx` (add footer cross-link after CTA)
- Modify: `next-sitemap.config.cjs` (add `/thinkcentre` to `additionalPaths`)

**Interfaces:**
- Consumes: `/thinkcentre` route (from Task 2)

- [ ] **Step 1: Add cross-link footer to /tinyriser page**

Open `src/app/(frontend)/tinyriser/page.tsx`. Find the closing `</main>` tag at the very end of the file. Insert the following block immediately before it (after the closing `</div>` of the CTA section):

```tsx
      {/* Cross-link footer */}
      <div className="mt-8 pt-6 border-t border-border">
        <Link
          href="/thinkcentre"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          PCIe card compatibility + community builds →
        </Link>
      </div>
```

- [ ] **Step 2: Add /thinkcentre to sitemap**

Open `next-sitemap.config.cjs`. Find the `additionalPaths` function and add `/thinkcentre`:

```js
additionalPaths: async (config) => [
  await config.transform(config, '/tinyriser'),
  await config.transform(config, '/thinkcentre'),
  // /tinyriser/card intentionally omitted — print utility, not a public page
],
```

- [ ] **Step 3: Type-check and run all tests**

```bash
npx tsc --noEmit && npx vitest run
```

Expected: no new type errors, all tests pass (including the new `thinkcentre.test.ts` suite).

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/tinyriser/page.tsx next-sitemap.config.cjs
git commit -m "feat(thinkcentre): cross-link from /tinyriser and add to sitemap"
```
