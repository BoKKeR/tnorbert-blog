import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="print:hidden mt-auto border-t border-border bg-[#1E1E23] text-[#FAF3E1]">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <p className="text-sm text-[#FAF3E1]/70">
            © {new Date().getFullYear()} deployonfri.day — deploying on Fridays and Saturdays.
          </p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 md:items-center">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-[#FAF3E1] hover:text-[#FAF3E1]/80" key={i} {...link} />
          })}
        </nav>
      </div>
    </footer>
  )
}
