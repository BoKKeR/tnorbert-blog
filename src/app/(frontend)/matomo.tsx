'use client'
import { init, push } from '@socialgouv/matomo-next'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || 'not-set'
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || 'not-set'

const MatomoComponent = () => {
  const [initialised, setInitialised] = useState(false)
  useEffect(() => {
    try {
      if (MATOMO_URL && MATOMO_SITE_ID && !initialised) {
        init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
      }
    } catch {
      // blocked by ad blocker — ignore silently
    }
    return () => {
      setInitialised(true)
    }
  }, [initialised, setInitialised])

  const searchParams = useSearchParams(),
    pathname = usePathname()

  const searchParamsString = searchParams.toString()
  useEffect(() => {
    if (!pathname) return
    try {
      const url = pathname + (searchParamsString ? '?' + searchParamsString : '')
      push(['setCustomUrl', url])
      push(['trackPageView'])
    } catch {
      // blocked by ad blocker — ignore silently
    }
  }, [pathname, searchParamsString])
  return null
}

export default function Matomo() {
  return (
    <Suspense>
      <MatomoComponent />
    </Suspense>
  )
}
