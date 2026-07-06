import type { Metadata } from 'next'
import Image from 'next/image'
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

type CardWithImage = { name: string; tag: string; note: string; image?: string }

function PcieRow({
  card,
  tagStyle,
}: {
  card: CardWithImage
  tagStyle: string
}) {
  return (
    <div className="flex gap-3 py-3 border-b border-border/50 last:border-0 items-start">
      {'image' in card && card.image ? (
        <div className="shrink-0 w-14 h-10 rounded-sm overflow-hidden border border-border/50 bg-muted">
          <Image
            src={card.image}
            alt={card.name}
            width={56}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="shrink-0 w-36">
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
                <div className="relative w-full h-36 bg-muted">
                  <Image
                    src={build.image}
                    alt={build.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ) : null}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif font-bold text-sm text-foreground">
                    {build.title}
                  </span>
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
              </div>
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
        <dl className="flex flex-col">
          {PRINTS.map((p) => (
            <div
              key={p.name}
              className="flex gap-3 py-3 border-b border-border/50 last:border-0 items-start"
            >
              {'image' in p && p.image ? (
                <div className="shrink-0 w-14 h-10 rounded-sm overflow-hidden border border-border/50 bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={56}
                    height={40}
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
