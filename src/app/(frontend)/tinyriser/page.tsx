import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { LightboxProvider } from '@/components/Lightbox'
import { ClickableImage } from '@/components/ClickableImage'
import { USE_CASES, ASSEMBLY_STEPS, UPGRADES } from './data'

export const metadata: Metadata = {
  title: 'TinyRiser - deployonfri.day',
  description:
    'PCIe expansion board for the Lenovo ThinkCentre M920Q. Adds a PCIe x4 slot to an otherwise 1L chassis - enabling NVMe drives, SFP+ NICs, and more.',
}

const TAG_STYLES: Record<string, string> = {
  storage: 'bg-primary/10 text-primary border-primary/20',
  networking: 'bg-accent/10 text-accent border-accent/20',
  compute: 'bg-warning/10 text-warning border-warning/20',
}

const TC_IMG = 'https://raw.githubusercontent.com/BoKKeR/awesome-thinkcentres/master/images'

export default function TinyRiserPage() {
  return (
    <LightboxProvider>
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
          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            A PCIe expansion board for the Lenovo ThinkCentre M920Q, M720Q, and M920x. The M920Q is
            a capable mini-PC - but its sealed chassis has no PCIe slot. TinyRiser adds one: a PCIe
            x4 connection routed from the M920Q&apos;s proprietary riser interface, giving you NVMe
            drives, SFP+ NICs, GPU cards, and more in a machine that would otherwise top out at its
            built-in M.2 slot.
          </p>
          <div className="relative w-full h-56 sm:h-72 rounded-sm overflow-hidden border border-border bg-muted">
            <ClickableImage
              fill
              priority
              src={`${TC_IMG}/Tinyriser-v2-front-irl.webp`}
              alt="TinyRiser v2 PCIe expansion board"
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
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
                  "Full PCIe 3.0 x4 connection - the same bus that drives the M920Q's NVMe slot, now exposed for any compatible card.",
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
                  'Low-profile cards fit the PCIe x4 slot. Gen 3 x4 bandwidth - suited for lighter inference workloads or CUDA experiments.',
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
            Each board is hand-assembled. I do the full process myself - stencil, reflow, drag
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
              other hobbies - these aren&apos;t factory-produced, and that&apos;s intentional.
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
            TinyRiser opens the PCIe slot - but there are other worthwhile upgrades for the M920Q
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
          <div className="relative w-full h-48 rounded-sm overflow-hidden border border-border bg-muted mb-6">
            <ClickableImage
              fill
              src={`${TC_IMG}/6bay-homelab.webp`}
              alt="6-node homelab cluster using ThinkCentre Tiny nodes"
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
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
            href="https://www.tindie.com/stores/bokker/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-primary hover:underline"
          >
            Buy →
          </a>
        </div>

        {/* Cross-link footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link
            href="/thinkcentre"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            PCIe card compatibility + community builds →
          </Link>
        </div>
      </main>
    </LightboxProvider>
  )
}
