import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { LightboxProvider } from '@/components/Lightbox'
import { ClickableImage } from '@/components/ClickableImage'
import { PCIE_NETWORKING, PCIE_STORAGE, PCIE_GPUS, BUILDS } from './data'
import { TinyRiserViewer } from './_TinyRiserViewer'
import { ASSEMBLY_STEPS } from '../tinyriser/data'

export const metadata: Metadata = {
  title: 'ThinkCentre Tiny - deployonfri.day',
  description:
    'A curated reference for Lenovo ThinkCentre Tiny homelab nodes - PCIe expansion card compatibility, community builds, and the TinyRiser expansion board.',
}

const BUILD_TAG_STYLES: Record<string, string> = {
  nas: 'bg-primary/10 text-primary border-primary/20',
  k8s: 'bg-accent/10 text-accent border-accent/20',
  networking: 'bg-warning/10 text-warning border-warning/20',
  storage: 'bg-primary/10 text-primary border-primary/20',
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
            Awesome ThinkCentres
          </h1>
          <p className="text-base text-foreground/80 leading-relaxed mb-8">
            Compact Intel mini-PCs that punch above their size. The models below all share a
            proprietary riser port inside the chassis - the same port the{' '}
            <Link href="/tinyriser" className="text-primary hover:underline">
              TinyRiser
            </Link>{' '}
            uses to add a PCIe x4 slot and an extra NVMe M.2 slot to an otherwise 1 liter machine.
          </p>

          {/* Model breakdown */}
          <div className="flex flex-col gap-3">
            {(
              [
                {
                  model: 'M920q / M720q',
                  gen: '8th / 9th gen',
                  note: (
                    <>
                      The most common and cheapest to find used. I run six of these in my own{' '}
                      <Link href="/homelab" className="text-primary hover:underline">
                        homelab
                      </Link>
                      .
                    </>
                  ),
                },
                {
                  model: 'M90q Gen 1 & 2',
                  gen: '10th / 11th gen',
                  note: 'Newer silicon, better single-core performance. Gen 2 adds USB4 / Thunderbolt 4. Same riser port, TinyRiser compatible.',
                },
                {
                  model: 'P340 / P350 Tiny',
                  gen: '10th / 11th gen · workstation',
                  note: 'Workstation variants with ECC memory support and ISV certifications. Same riser port as the M-series.',
                },
              ] as { model: string; gen: string; note: React.ReactNode }[]
            ).map((m) => (
              <div
                key={m.model}
                className="flex gap-4 py-3 border-b border-border/50 last:border-0"
              >
                <div className="shrink-0 w-36">
                  <span className="font-mono text-sm font-bold text-foreground">{m.model}</span>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{m.gen}</div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Machine photo gallery */}
        <section className="mb-14">
          <p className="text-xs font-mono text-muted-foreground mb-4 border border-border/50 rounded-sm px-3 py-2 bg-muted/30">
            Typical used listing: 6-core i5 (8400T / 9400T or newer generations), single 8/16 GB RAM
            stick, 256-512 GB NVMe, Wi-Fi. All three are easy to upgrade if needed.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { src: `${TC_IMG}/p330-tiny.webp`, alt: 'Front' },
              { src: `${TC_IMG}/p330-tiny-back.webp`, alt: 'Back' },
              { src: `${TC_IMG}/p330-inside.webp`, alt: 'Inside' },
              { src: `${TC_IMG}/p330-back.webp`, alt: 'Back panel' },
            ].map((img) => (
              <div
                key={img.alt}
                className="relative aspect-square rounded-sm overflow-hidden border border-border bg-muted"
              >
                <ClickableImage
                  fill
                  src={img.src}
                  alt={img.alt}
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 336px"
                />
              </div>
            ))}
          </div>
        </section>

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

                <p className="text-sm text-foreground/80 leading-relaxed">
                  Exposes the proprietary PCIe riser port on ThinkCentre Tiny machines as a standard
                  PCIe x4 slot, and adds an additional NVMe M.2 slot. Open source design by{' '}
                  <a
                    href="https://github.com/a-little-wifi/Tinyriser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    WifiCable
                  </a>
                  , assembled and sold from 🇸🇪.
                </p>

                {/* Price + shipping */}
                <div>
                  <span className="font-mono text-4xl font-bold text-foreground">€30</span>
                  <span className="font-mono text-xl font-semibold text-foreground">
                    {' '}
                    + €8 shipping
                  </span>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Ships from 🇸🇪 to anywhere 🌍
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.tindie.com/stores/bokker/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Order →
                  </a>
                </div>
              </div>

              {/* Images column */}
              <div className="order-1 sm:order-2">
                <TinyRiserViewer />
              </div>
            </div>
          </div>

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
                Each board is hand-assembled: stencil, reflow, drag soldering, microscope
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
                    <div className="pb-4 min-w-0 flex-1">
                      <p className="font-serif font-semibold text-xs text-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                      {'image' in item && item.image ? (
                        <div className="mt-2 relative aspect-video rounded-sm overflow-hidden border border-border/50 bg-muted">
                          <ClickableImage
                            fill
                            src={item.image}
                            alt={item.label}
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 400px"
                          />
                        </div>
                      ) : null}
                      {item.step === '5' ? (
                        <video
                          src="/videos/tinyriser_soldering.mp4"
                          poster="/images/tinyriser-soldering-poster.jpg"
                          controls
                          preload="none"
                          className="mt-2 w-full rounded-sm border border-border/50"
                        />
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        </div>
        {/* ── end TinyRiser block ──────────────────────────────────────────── */}

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

        {/* 3D Printed Components - hidden for now
        <section aria-labelledby="prints-heading" className="mb-14">
          ...
        </section>
        */}

        {/* Footer / cross-links */}
        <div className="border-t border-border pt-8 flex flex-col gap-3">
          <a
            href="https://github.com/BoKKeR/awesome-thinkcentres"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            Awesome ThinkCentres →
          </a>
        </div>
      </main>
    </LightboxProvider>
  )
}
