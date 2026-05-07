'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [announcement, setAnnouncement] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  function handleClick() {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
    setIsDark(next === 'dark')
    setAnnouncement(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled')
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {isDark
          ? <Sun className="w-5 h-5" aria-hidden="true" />
          : <Moon className="w-5 h-5" aria-hidden="true" />
        }
      </button>

      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </span>
    </div>
  )
}
