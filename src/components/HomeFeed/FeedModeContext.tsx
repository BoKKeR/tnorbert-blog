'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useTheme } from '@/providers/Theme'

export type FeedMode = 'both' | 'friday' | 'saturday'

const FEED_MODE_KEY = 'deployonfri-feed-mode'
const DEFAULT_MODE: FeedMode = 'both'

function isValidFeedMode(value: string | null): value is FeedMode {
  return value === 'both' || value === 'friday' || value === 'saturday'
}

interface FeedModeContextType {
  feedMode: FeedMode
  setFeedMode: (mode: FeedMode) => void
}

const FeedModeContext = createContext<FeedModeContextType>({
  feedMode: DEFAULT_MODE,
  setFeedMode: () => null,
})

export function FeedModeProvider({ children }: { children: React.ReactNode }) {
  const [feedMode, setFeedModeState] = useState<FeedMode>(DEFAULT_MODE)
  const { setTheme } = useTheme()

  // On mount, restore saved mode and apply theme
  useEffect(() => {
    const stored = localStorage.getItem(FEED_MODE_KEY)
    if (isValidFeedMode(stored)) {
      setFeedModeState(stored)
      if (stored === 'friday') setTheme('light')
      else if (stored === 'saturday') setTheme('dark')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setFeedMode = useCallback((mode: FeedMode) => {
    setFeedModeState(mode)
    localStorage.setItem(FEED_MODE_KEY, mode)

    // Friday = light, Saturday = dark, both = leave theme as-is
    if (mode === 'friday') setTheme('light')
    else if (mode === 'saturday') setTheme('dark')

    window.dispatchEvent(new StorageEvent('storage', { key: FEED_MODE_KEY, newValue: mode }))
  }, [setTheme])

  return <FeedModeContext.Provider value={{ feedMode, setFeedMode }}>{children}</FeedModeContext.Provider>
}

export function useFeedMode(): FeedModeContextType {
  return useContext(FeedModeContext)
}
