'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { useTheme } from '@/providers/Theme'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

function LogotypeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  function handleFridayClick(e: React.MouseEvent) {
    e.preventDefault()
    setTheme('light')
  }

  function handleSaturdayClick(e: React.MouseEvent) {
    e.preventDefault()
    setTheme('dark')
  }

  return (
    <div className="flex items-baseline gap-1">
      <span className="font-serif text-lg font-bold tracking-tight text-foreground select-none">
        Deploy on
      </span>
      <button
        type="button"
        onClick={handleFridayClick}
        aria-label="Switch to light mode"
        aria-pressed={!isDark}
        className={[
          'font-serif text-lg font-bold tracking-tight transition-opacity duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
          !isDark ? 'opacity-100 text-primary' : 'opacity-40 hover:opacity-70 text-foreground',
        ].join(' ')}
      >
        Friday
      </button>
      <span className="font-serif text-lg font-bold tracking-tight text-foreground/50 select-none">
        /
      </span>
      <button
        type="button"
        onClick={handleSaturdayClick}
        aria-label="Switch to dark mode"
        aria-pressed={isDark}
        className={[
          'font-serif text-lg font-bold tracking-tight transition-opacity duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
          isDark ? 'opacity-100 text-primary' : 'opacity-40 hover:opacity-70 text-foreground',
        ].join(' ')}
      >
        Saturday
      </button>
    </div>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = data?.navItems || []

  const navLinkClass =
    'text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1 py-0.5'

  return (
    <header
      className={[
        'print:hidden sticky top-0 z-50 w-full transition-all duration-200',
        scrolled
          ? 'backdrop-blur-sm bg-background/90 border-b border-border shadow-sm'
          : 'bg-background',
      ].join(' ')}
    >
      <div className="container flex items-center justify-between h-14 gap-4">
        {/* Logotype — clicking Friday = light, Saturday = dark */}
        <Link href="/" tabIndex={-1} aria-hidden="true" className="focus:outline-none">
          <LogotypeToggle />
        </Link>

        {/* Desktop nav — no separate dark mode button */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/about" className={navLinkClass}>About</Link>
          <Link href="/homelab" className={navLinkClass}>Homelab</Link>
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" className={navLinkClass} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {mobileOpen
              ? <X className="w-5 h-5" aria-hidden="true" />
              : <Menu className="w-5 h-5" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        ref={navRef}
        aria-hidden={!mobileOpen}
        className={[
          'md:hidden overflow-hidden transition-all duration-200 ease-in-out',
          mobileOpen ? 'max-h-64 border-b border-border' : 'max-h-0',
        ].join(' ')}
      >
        <nav aria-label="Mobile navigation" className="container flex flex-col gap-1 py-3">
          <Link href="/" className={`${navLinkClass} block py-2`}>Home</Link>
          <Link href="/about" className={`${navLinkClass} block py-2`}>About</Link>
          <Link href="/homelab" className={`${navLinkClass} block py-2`}>Homelab</Link>
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" className={`${navLinkClass} block py-2`} />
          ))}
        </nav>
      </div>
    </header>
  )
}
