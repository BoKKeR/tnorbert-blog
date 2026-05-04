'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'

// The theme cycles: light → dark → auto (null)
// 'auto' means use system preference (setTheme(null))
type ThemeCycle = Theme | 'auto'

function getNextTheme(current: ThemeCycle): ThemeCycle {
  if (current === 'light') return 'dark'
  if (current === 'dark') return 'auto'
  return 'light'
}

function getAnnouncement(theme: ThemeCycle): string {
  if (theme === 'dark') return 'Dark mode enabled'
  if (theme === 'light') return 'Light mode enabled'
  return 'System theme active'
}

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [announcement, setAnnouncement] = useState('')
  // Track whether we're in 'auto' mode (theme is null/undefined from provider after setTheme(null))
  const [currentCycle, setCurrentCycle] = useState<ThemeCycle>('auto')

  useEffect(() => {
    // Sync currentCycle with the actual theme on mount
    if (theme === 'dark') setCurrentCycle('dark')
    else if (theme === 'light') setCurrentCycle('light')
    // If theme is undefined/null, we're in auto mode
    else setCurrentCycle('auto')
  }, [theme])

  function handleClick() {
    const next = getNextTheme(currentCycle)
    setCurrentCycle(next)
    if (next === 'auto') {
      setTheme(null)
    } else {
      setTheme(next)
    }
    setAnnouncement(getAnnouncement(next))
  }

  const label =
    currentCycle === 'light'
      ? 'Switch to dark mode'
      : currentCycle === 'dark'
        ? 'Switch to system theme'
        : 'Switch to light mode'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {currentCycle === 'light' && <Sun className="w-5 h-5" aria-hidden="true" />}
        {currentCycle === 'dark' && <Moon className="w-5 h-5" aria-hidden="true" />}
        {currentCycle === 'auto' && <SunMoon className="w-5 h-5" aria-hidden="true" />}
      </button>

      {/* Visually hidden live region for screen reader announcements */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </span>
    </div>
  )
}
