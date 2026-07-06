import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { LightboxProvider } from '@/components/Lightbox'
import { ClickableImage } from '@/components/ClickableImage'
import { PCIE_NETWORKING, PCIE_STORAGE, PCIE_GPUS, BUILDS, PRINTS } from './data'
import { USE_CASES, ASSEMBLY_STEPS } from '../tinyriser/data'

export const metadata: Metadata = {
  title: 'ThinkCentre Tiny — deployonfri.day',
  description:
    'A curated reference for Lenovo ThinkCentre Tiny homelab nodes — PCIe expansion card compatibility, community builds, and the TinyRiser expansion board.',
}

const BUILD_TAG_STYLES: Record<string, string> = {
  nas: 'bg-primary/10 text-primary border-primary/20',
  k8s: 'bg-accent/10 text-accent border-accent/20',
  networking: 'bg-warning/10 text-warning border-warning/20',
  storage: 'bg-primary/10 text-primary border-primary/20',
}

const USE_CASE_TAG_STYLES: Record<string, string> = {
  storage: 'bg-primary/10 text-primary border-primary/20',
  networking: 'bg-accent/10 text-accent border-accent/20',
  compute: 'bg-warning/10 text-warning border-warning/20',
}

const TC_IMG = 'https://raw.githubusercontent.com/BoKKeR/awesome-thinkcentres/master/images'

type CardWithImage = { name: string; tag: string; note: string; image?: string }

function PcieRow({ card, tagStyle }: { card: CardWithImage; tagStyle: string }) {
  return (
    <div className="flex gap-3 py-3 border-b border-border/50 last:border-0 items-start">
      {'image' in card && card.image ? (
        <div className="shrink-0 w-20 h-14 rounded-sm overflow-hidden border border-border/50 bg-muted">
          <ClickableImage
            src={card.image}
            alt={card.name}
            width={80}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="shrink-0 w-32">
        <dt className="text-sm font-mono text-foreground font-semibold leading-tight">
          {card.name}
        </dt>
        <dd className="mt-1">
          <span className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${tagStyle}`}>
            {card.tag}
          </span>
        </dd>
      </div>
      <dd className="text-sm text-foreground/80 pt-0.5">{card.note}</dd>
    </div>
  )
}

function buildDomain(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

export default function ThinkCentrePage() {
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
            ThinkCentre Tiny
          </h1>
          <p className="text-base text-foreground/80 leading-relaxed">
            The Lenovo ThinkCentre M920q, M720q, and M920x are compact 8th-gen Intel mini-PCs that
            routinely sell for $100–250 used. They run cool, quiet, and dense — making them a
            popular choice for homelab nodes, NAS boxes, routers, and Kubernetes clusters. This is a
            curated reference for builders, ported from the{' '}
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

          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Networking
          </h3>
          <dl className="flex flex-col mb-8">
            {PCIE_NETWORKING.map((card) => (
              <PcieRow
                key={card.name}
                card={card}
                tagStyle="bg-accent/10 text-accent border-accent/20"
              />
            ))}
          </dl>

          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Storage
          </h3>
          <dl className="flex flex-col mb-8">
            {PCIE_STORAGE.map((card) => (
              <PcieRow
                key={card.name}
                card={card}
                tagStyle="bg-primary/10 text-primary border-primary/20"
              />
            ))}
          </dl>

          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
            GPU
          </h3>
          <dl className="flex flex-col">
            {PCIE_GPUS.map((card) => (
              <PcieRow
                key={card.name}
                card={card}
                tagStyle="bg-warning/10 text-warning border-warning/20"
              />
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
                className="border border-border rounded-sm overflow-hidden flex flex-col hover:border-primary/40 transition-colors"
              >
                {'image' in build && build.image ? (
                  <div className="relative w-full h-44 bg-muted">
                    <ClickableImage
                      fill
                      src={build.image}
                      alt={build.title}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="text-xs font-mono text-muted-foreground">
                    {buildDomain(build.href)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif font-bold text-sm text-foreground">
                      {build.title}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${
                        BUILD_TAG_STYLES[build.tag] ??
                        'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {build.tag}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{build.description}</p>
                  <span className="text-xs font-mono text-primary mt-auto">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── TinyRiser product block ───────────────────────────────────────── */}
        <div className="mb-14 rounded-sm border border-primary/40 bg-primary/[0.03] overflow-hidden">
          {/* Label bar */}
          <div className="px-5 py-2.5 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Made by the author
            </span>
          </div>

          {/* Hero: text left, image right */}
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

              {/* Text column */}
              <div className="order-2 sm:order-1 flex flex-col gap-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">TinyRiser</h2>

                {/* Variant compatibility cards */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-border rounded-sm p-3 flex flex-col gap-1.5">
                    <p className="text-xs font-mono font-semibold text-foreground">M920Q</p>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      M920Q · M720Q · M920x
                    </p>
                  </div>
                  <div className="border border-primary/30 bg-primary/5 rounded-sm p-3 flex flex-col gap-1.5">
                    <p className="text-xs font-mono font-semibold text-foreground">Tiny6</p>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      P340 Tiny Gen 2 · M70q Gen 3+
                    </p>
                    <span className="self-start text-xs font-mono bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded-sm">
                      + USB port
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed">
                  PCIe x4 expansion board for the sealed ThinkCentre Tiny chassis. Adds a full
                  PCIe slot via the proprietary riser interface — NVMe, SFP+, GPU, or any
                  compatible card. Both variants support the same cards.
                </p>

                {/* Price + shipping */}
                <div>
                  <span className="font-mono text-4xl font-bold text-foreground">€30</span>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    + €8 flat shipping &nbsp;·&nbsp; Ships from Sweden
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href="SHOP_URL_PLACEHOLDER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Order M920Q →
                  </a>
                  <a
                    href="SHOP_URL_PLACEHOLDER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Order Tiny6 →
                  </a>
                </div>

                <Link
                  href="/tinyriser"
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  Full product page + assembly details →
                </Link>
              </div>

              {/* Image column */}
              <div className="order-1 sm:order-2 relative w-full h-52 sm:h-64 rounded-sm overflow-hidden border border-border bg-muted">
                <ClickableImage
                  fill
                  priority
                  src={`${TC_IMG}/Tinyriser-v2-front-irl.webp`}
                  alt="TinyRiser v2 PCIe expansion board"
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
              </div>
            </div>
          </div>

          {/* Expandable: What It Unlocks */}
          <details className="group border-t border-primary/20">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-5 sm:px-6 py-4 flex items-center justify-between select-none hover:bg-primary/5 transition-colors">
              <span className="font-serif font-semibold text-sm text-foreground">
                What It Unlocks
              </span>
              <span className="text-muted-foreground text-base leading-none transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 border-t border-primary/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {USE_CASES.map((uc) => (
                  <div
                    key={uc.title}
                    className="border border-border rounded-sm p-3 flex flex-col gap-2"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-sm text-foreground">
                        {uc.title}
                      </span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-sm border font-mono ${
                          USE_CASE_TAG_STYLES[uc.tag] ??
                          'bg-muted text-muted-foreground border-border'
                        }`}
                      >
                        {uc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>

          {/* Expandable: How It's Made */}
          <details className="group border-t border-primary/20">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-5 sm:px-6 py-4 flex items-center justify-between select-none hover:bg-primary/5 transition-colors">
              <span className="font-serif font-semibold text-sm text-foreground">
                How It&apos;s Made
              </span>
              <span className="text-muted-foreground text-base leading-none transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 border-t border-primary/10">
              <p className="text-xs text-muted-foreground mt-4 mb-4 leading-relaxed">
                Each board is hand-assembled — stencil, reflow, drag soldering, microscope
                inspection. Every board is tested in an M920Q before it ships.
              </p>
              <ol className="flex flex-col gap-0">
                {ASSEMBLY_STEPS.map((item, idx) => (
                  <li key={item.step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 shrink-0 rounded-sm border border-border bg-muted flex items-center justify-center font-mono text-xs text-muted-foreground">
                        {item.step}
                      </div>
                      {idx < ASSEMBLY_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-border my-1" />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <p className="font-serif font-semibold text-xs text-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        </div>
        {/* ── end TinyRiser block ──────────────────────────────────────────── */}

        {/* 3D Printed Components */}
        <section aria-labelledby="prints-heading" className="mb-14">
          <h2
            id="prints-heading"
            className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border"
          >
            3D Printed Components
          </h2>
          <dl className="flex flex-col">
            {PRINTS.map((p) => (
              <div
                key={p.name}
                className="flex gap-3 py-3 border-b border-border/50 last:border-0 items-start"
              >
                {'image' in p && p.image ? (
                  <div className="shrink-0 w-20 h-14 rounded-sm overflow-hidden border border-border/50 bg-muted">
                    <ClickableImage
                      src={p.image}
                      alt={p.name}
                      width={80}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <dd className="flex flex-col gap-1 min-w-0">
                  <dt className="text-sm font-mono text-foreground font-semibold">{p.name}</dt>
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
    </LightboxProvider>
  )
}
