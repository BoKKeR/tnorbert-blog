'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { DarkModeToggle } from '@/components/DarkModeToggle'
import { FeedModeProvider, useFeedMode } from '@/components/HomeFeed/FeedModeContext'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

// The logotype toggle — renders "Deploy on Friday / Saturday"
function LogotypeToggle() {
  const { feedMode, setFeedMode } = useFeedMode()

  function handleFridayClick() {
    if (feedMode === 'friday') {
      // Already active single word — reset to both
      setFeedMode('both')
    } else {
      setFeedMode('friday')
    }
  }

  function handleSaturdayClick() {
    if (feedMode === 'saturday') {
      // Already active single word — reset to both
      setFeedMode('both')
    } else {
      setFeedMode('saturday')
    }
  }

  const fridayActive = feedMode === 'both' || feedMode === 'friday'
  const saturdayActive = feedMode === 'both' || feedMode === 'saturday'

  const fridayLabel =
    feedMode === 'friday'
      ? 'Show all posts (currently showing Friday posts only)'
      : 'Show Friday posts only'

  const saturdayLabel =
    feedMode === 'saturday'
      ? 'Show all posts (currently showing Saturday posts only)'
      : 'Show Saturday posts only'

  return (
    <Link
      href="/"
      className="flex items-baseline gap-1 text-foreground no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      aria-label="deployonfri.day — home"
      tabIndex={-1}
    >
      <span className="font-serif text-lg font-bold tracking-tight select-none pointer-events-none">
        Deploy on
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          handleFridayClick()
        }}
        aria-pressed={feedMode === 'friday'}
        aria-label={fridayLabel}
        className={[
          'font-serif text-lg font-bold tracking-tight transition-opacity duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
          fridayActive ? 'opacity-100 text-primary' : 'opacity-40 hover:opacity-70',
        ].join(' ')}
      >
        Friday
      </button>
      <span className="font-serif text-lg font-bold tracking-tight select-none pointer-events-none text-foreground/60">
        /
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          handleSaturdayClick()
        }}
        aria-pressed={feedMode === 'saturday'}
        aria-label={saturdayLabel}
        className={[
          'font-serif text-lg font-bold tracking-tight transition-opacity duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
          saturdayActive ? 'opacity-100 text-accent' : 'opacity-40 hover:opacity-70',
        ].join(' ')}
      >
        Saturday
      </button>
    </Link>
  )
}

function HeaderInner({ data }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Scroll shadow effect
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Set initial state
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
        {/* Logotype */}
        <LogotypeToggle />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-4"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          {/* CMS nav items */}
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={navLinkClass}
            />
          ))}
          <DarkModeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <DarkModeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
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
        <nav
          aria-label="Mobile navigation"
          className="container flex flex-col gap-1 py-3"
        >
          <Link href="/" className={`${navLinkClass} block py-2`}>
            Home
          </Link>
          <Link href="/about" className={`${navLinkClass} block py-2`}>
            About
          </Link>
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={`${navLinkClass} block py-2`}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <FeedModeProvider>
      <HeaderInner data={data} />
    </FeedModeProvider>
  )
}
