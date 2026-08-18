import type { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from './_SignupForm'

export const metadata: Metadata = {
  title: '10″ 1U Rack UPS with USB-C PD - deployonfri.day',
  description:
    'A 1U 10" rackmount UPS with 6× USB-PD 3.0 outputs, per-port power monitoring, Prometheus metrics, Home Assistant integration, and a built-in NUT server.',
}

const FEATURES = [
  { label: '6× USB-PD 3.0 outputs', detail: 'PPS - programmable 5V to 20V per port' },
  { label: 'Per-port power monitoring', detail: 'Current + voltage per port, logged and queryable' },
  { label: 'Prometheus metrics', detail: 'Scrape directly from the UPS, no exporter needed' },
  { label: 'Home Assistant integration', detail: 'Native integration via local API' },
  { label: 'NUT server built-in', detail: 'No middleman host — point your NUT clients at the UPS IP' },
  { label: 'USB-C to barrel jack support', detail: 'Adapter support for switches, routers, and other gear' },
  { label: 'Web UI + per-port power control', detail: 'Shutdown, reboot, or cycle any port from the browser' },
  { label: '~15 min runtime at full load', detail: '600W worst case — much longer at typical homelab loads' },
]

export default function UpsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-10 pb-24">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          ← Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Next product build
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          10&#8243; 1U Rack UPS<br />with USB-C PD outputs
        </h1>
        <p className="text-base text-foreground/80 leading-relaxed">
          A rackmount UPS built for small homelab racks — 10&#8243; wide, 1U tall, with six USB-C PD
          outputs and the monitoring integrations you actually want. Assembled in Sweden.
        </p>
      </div>

      {/* Sign-up form */}
      <div className="mb-12 rounded-sm border border-primary/40 bg-primary/[0.03] p-5">
        <p className="font-serif font-bold text-sm text-foreground mb-1">
          Interested? Sign up for build updates.
        </p>
        <p className="text-xs text-muted-foreground font-mono mb-4">
          Share feedback, get notified when it's ready. We don't spam.
        </p>
        <SignupForm />
      </div>

      {/* Features */}
      <section>
        <h2 className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border">
          Features
        </h2>
        <dl className="flex flex-col">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5 py-3 border-b border-border/50 last:border-0">
              <dt className="font-mono text-sm font-semibold text-foreground">{f.label}</dt>
              <dd className="text-sm text-foreground/70 leading-relaxed">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Footer links */}
      <div className="mt-12 pt-6 border-t border-border flex flex-col gap-2">
        <Link
          href="/tinyriser"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          TinyRiser - PCIe expansion for ThinkCentre Tiny →
        </Link>
        <Link
          href="/homelab"
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          See the homelab this is built for →
        </Link>
      </div>
    </main>
  )
}
