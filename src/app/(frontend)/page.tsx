import type { Metadata } from 'next'
import { HomeFeed } from '@/components/HomeFeed'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'deployonfri.day',
  description:
    'A blog about deploying software, building things, and shipping on Fridays (and Saturdays).',
  openGraph: {
    title: 'deployonfri.day',
    description:
      'A blog about deploying software, building things, and shipping on Fridays (and Saturdays).',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'deployonfri.day',
    description:
      'A blog about deploying software, building things, and shipping on Fridays (and Saturdays).',
  },
}

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <HomeFeed />
    </div>
  )
}
