import type { Metadata } from 'next'
import Link from 'next/link'
import { LightboxProvider } from '@/components/Lightbox'
import { TinyRiserBlock } from '@/components/TinyRiserBlock'

export const metadata: Metadata = {
  title: 'TinyRiser - deployonfri.day',
  description:
    'PCIe expansion board for the Lenovo ThinkCentre M920Q. Adds a PCIe x4 slot to an otherwise 1L chassis - enabling NVMe drives, SFP+ NICs, and more.',
}

export default function TinyRiserPage() {
  return (
    <LightboxProvider>
      <main className="max-w-2xl mx-auto px-4 pt-10 pb-24">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            ← Home
          </Link>
        </div>

        <TinyRiserBlock defaultOpenHowItsMade />

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
