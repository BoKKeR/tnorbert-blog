import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Battery,
  Activity,
  Sliders,
  ShieldCheck,
  Gauge,
  Power,
  BarChart2,
  Home,
  Server,
  Cable,
  Radio,
  Wifi,
} from 'lucide-react'
import { SignupForm } from './_SignupForm'

export const metadata: Metadata = {
  title: '10″ 1U Rack UPS with USB-C PD - deployonfri.day',
  description:
    'A 1U 10" rackmount UPS with USB-C PD 3.0/3.1 outputs, PoE+++ output, user-supplied LiFePO4 batteries, Prometheus metrics, Home Assistant, and a built-in NUT server.',
}

const OUTPUTS = [
  {
    label: '3x USB-C PD (base)',
    detail: '3 ports on the back panel, each 100W (USB PD 3.0 PPS) or 2x 140W (USB PD 3.1 EPR). 5V to 20V, programmable per port.',
  },
  {
    label: '+3x USB-C PD (slave unit)',
    detail: 'An optional slave unit chains off the base and adds another 3 USB-C ports with the same config options.',
  },
  {
    label: 'PoE+++ output',
    detail: '802.3bt PoE output for switches, APs, and other PoE-capable devices.',
  },
]

const FEATURES = [
  { icon: Battery,     label: 'User-supplied LiFePO4 batteries', detail: '26650 round cells. Source your own, choose your capacity, replace them yourself. No proprietary battery packs.' },
  { icon: Activity,    label: 'Per-cell monitoring',              detail: 'Voltage tracked per individual cell. Spot a weak cell before it becomes a problem.' },
  { icon: Sliders,     label: 'Active cell balancing',            detail: 'Keeps cells in balance during charge and discharge cycles.' },
  { icon: ShieldCheck, label: 'Overcharge protection',            detail: 'Per-cell cutoff. The BMS will not let you cook your cells.' },
  { icon: Gauge,       label: 'Per-port output monitoring',       detail: 'Current and voltage measured on each USB-C output port individually, logged and queryable in real time.' },
  { icon: Power,       label: 'Remote per-port on/off',           detail: 'Switch any output port on or off remotely from the web UI or API. Useful for hard-rebooting a device without touching the rack.' },
  { icon: BarChart2,   label: 'Prometheus metrics',               detail: 'Scrape directly from the UPS. No exporter, no sidecar.' },
  { icon: Home,        label: 'Home Assistant integration',        detail: 'Native integration via local API. See every port and every cell in your dashboard.' },
  { icon: Radio,       label: 'MQTT integration',                 detail: 'Publish power data and control ports via your existing MQTT broker.' },
  { icon: Server,      label: 'NUT server built-in',              detail: 'Point your NUT clients directly at the UPS IP. No middleman host needed.' },
  { icon: Wifi,        label: 'WiFi + Ethernet',                  detail: 'Connects over wired Ethernet or WiFi — whichever suits your rack.' },
  { icon: Cable,       label: 'USB-C to barrel jack support',     detail: 'Adapter support for gear that still uses barrel connectors.' },
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
          A rackmount UPS designed for minilab racks. 1U, 10&#8243; wide, LiFePO4 batteries
          you supply yourself, and the monitoring integrations homelabbers actually want: Prometheus,
          Home Assistant, and a built-in NUT server. Assembled in Sweden.
        </p>
      </div>

      {/* Illustration */}
      <div className="mb-10 flex flex-col items-center">
        <div className="w-full max-w-sm rounded-sm border border-border bg-white p-4">
          <svg viewBox="0 10 108 36" className="w-full" aria-hidden="true">
            <defs>
              <pattern id="ups-grille" x="0" y="0" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                <line x1="0" y1="3.2" x2="3.2" y2="0"   stroke="#666" strokeWidth="0.45"/>
                <line x1="0" y1="0"   x2="3.2" y2="3.2" stroke="#666" strokeWidth="0.45"/>
              </pattern>
            </defs>

            {/* RIGHT SIDE FACE */}
            <polygon points="92,22 104,15 104,34 92,41" fill="#d0d0d0" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>
            <line x1="92" y1="26" x2="104" y2="19" stroke="#bbb" strokeWidth="0.35"/>
            <line x1="92" y1="30" x2="104" y2="23" stroke="#bbb" strokeWidth="0.35"/>
            <line x1="92" y1="34" x2="104" y2="27" stroke="#bbb" strokeWidth="0.35"/>
            <line x1="92" y1="38" x2="104" y2="31" stroke="#bbb" strokeWidth="0.35"/>

            {/* TOP FACE */}
            <polygon points="8,22 92,22 104,15 20,15" fill="#ebebeb" stroke="#111" strokeWidth="1.3" strokeLinejoin="round"/>
            <line x1="8"  y1="22" x2="20"  y2="15" stroke="#bbb" strokeWidth="0.4"/>
            <line x1="92" y1="22" x2="104" y2="15" stroke="#bbb" strokeWidth="0.4"/>
            <line x1="28"  y1="21.2" x2="40.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
            <line x1="33"  y1="21.2" x2="45.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
            <line x1="55"  y1="21.2" x2="67.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>
            <line x1="60"  y1="21.2" x2="72.2"  y2="14.2" stroke="#aaa" strokeWidth="0.5"/>

            {/* FRONT FACE */}
            <rect x="8" y="22" width="84" height="19" fill="white" stroke="#111" strokeWidth="1.5"/>

            {/* LEFT RACK EAR */}
            <rect x="8" y="22" width="7" height="19" fill="#ddd" stroke="#111" strokeWidth="0.9"/>
            <circle cx="11.5" cy="25.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
            <circle cx="11.5" cy="37.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
            <line x1="15" y1="22" x2="15" y2="41" stroke="#999" strokeWidth="0.5"/>

            {/* RIGHT RACK EAR */}
            <rect x="85" y="22" width="7" height="19" fill="#ddd" stroke="#111" strokeWidth="0.9"/>
            <circle cx="88.5" cy="25.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
            <circle cx="88.5" cy="37.5" r="1.5" fill="white" stroke="#444" strokeWidth="0.55"/>
            <line x1="85" y1="22" x2="85" y2="41" stroke="#999" strokeWidth="0.5"/>

            {/* VENT GRILLE */}
            <rect x="16" y="23" width="50" height="17" fill="url(#ups-grille)" stroke="#444" strokeWidth="0.65"/>
            <line x1="16" y1="23" x2="66" y2="23" stroke="#aaa" strokeWidth="0.35"/>
            <line x1="16" y1="23" x2="16" y2="40" stroke="#aaa" strokeWidth="0.35"/>

            {/* DIVIDER */}
            <line x1="66" y1="22" x2="66" y2="41" stroke="#666" strokeWidth="0.9"/>

            {/* CONTROL / PORT PANEL */}
            <rect x="66" y="22" width="19" height="19" fill="#f6f6f6" stroke="none"/>

            {/* 6 USB-C ports in 3 rows × 2 cols */}
            {([
              [70, 26], [78, 26],
              [70, 31.5], [78, 31.5],
              [70, 37],   [78, 37],
            ] as [number, number][]).map(([cx, cy], i) => (
              <g key={i}>
                <rect x={cx-2.2} y={cy-1.4} width="4.4" height="2.8" rx="1.0" fill="white" stroke="#333" strokeWidth="0.6"/>
                <rect x={cx-0.8} y={cy-0.5} width="1.6" height="1.0" rx="0.25" fill="#bbb" stroke="none"/>
              </g>
            ))}

            {/* Status LED */}
            <circle cx="82" cy="26" r="1.3" fill="none" stroke="#111" strokeWidth="0.55"/>
            <circle cx="82" cy="26" r="0.65" fill="#22c55e"/>

            {/* FRONT FACE OUTER STROKE */}
            <rect x="8" y="22" width="84" height="19" fill="none" stroke="#111" strokeWidth="1.5"/>
          </svg>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">1U · 10&#8243; rack</p>
      </div>

      {/* Sign-up form */}
      <div className="mb-12 rounded-sm border border-primary/40 bg-primary/[0.03] p-5">
        <p className="font-serif font-bold text-sm text-foreground mb-1">
          Interested? Sign up for build updates.
        </p>
        <p className="text-xs text-muted-foreground font-mono mb-4">
          Share feedback, get notified when it&apos;s ready. We don&apos;t spam.
        </p>
        <SignupForm />
      </div>

      {/* Outputs */}
      <section className="mb-12">
        <h2 className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border">
          Outputs
        </h2>
        <dl className="flex flex-col">
          {OUTPUTS.map((o) => (
            <div key={o.label} className="flex gap-4 py-3 border-b border-border/50 last:border-0">
              <dt className="font-mono text-sm font-semibold text-foreground shrink-0 w-40">{o.label}</dt>
              <dd className="text-sm text-foreground/70 leading-relaxed">{o.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      <section>
        <h2 className="font-serif text-xl font-bold mb-6 pb-2 border-b border-border">
          Features
        </h2>
        <dl className="flex flex-col">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex gap-3 py-3 border-b border-border/50 last:border-0">
              <f.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex flex-col gap-0.5">
                <dt className="font-mono text-sm font-semibold text-foreground">{f.label}</dt>
                <dd className="text-sm text-foreground/70 leading-relaxed">{f.detail}</dd>
              </div>
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
