'use client'

import React, { Suspense } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'

const HeaderNavContent: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Construct full path with query parameters
  const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname

  return (
    <>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" currentPath={fullPath} />
      })}
    </>
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  return (
    <nav className="flex gap-3 items-center">
      <Suspense fallback={
        <>
          {data?.navItems?.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" />
          ))}
        </>
      }>
        <HeaderNavContent data={data} />
      </Suspense>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
