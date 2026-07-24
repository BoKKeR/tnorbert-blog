import React from 'react'
import { ClickableImage } from '@/components/ClickableImage'
import { TinyRiserViewer } from '@/app/(frontend)/thinkcentre/_TinyRiserViewer'
import { ASSEMBLY_STEPS } from '@/app/(frontend)/tinyriser/data'

export function TinyRiserBlock() {
  return (
    <div className="rounded-sm border border-primary/40 bg-primary/[0.03] overflow-hidden">
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
            Each board is hand-assembled: stencil, reflow, drag soldering, microscope inspection.
            Every board is tested in an M920Q before it ships.
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
                  {item.image ? (
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
  )
}
