'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

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

  useEffect(() => {
    const stored = localStorage.getItem(FEED_MODE_KEY)
    if (isValidFeedMode(stored)) {
      setFeedModeState(stored)
    }
  }, [])

  const setFeedMode = useCallback((mode: FeedMode) => {
    setFeedModeState(mode)
    localStorage.setItem(FEED_MODE_KEY, mode)
    // Dispatch a storage event so other tabs/components can react
    window.dispatchEvent(new StorageEvent('storage', { key: FEED_MODE_KEY, newValue: mode }))
  }, [])

  return <FeedModeContext.Provider value={{ feedMode, setFeedMode }}>{children}</FeedModeContext.Provider>
}

export function useFeedMode(): FeedModeContextType {
  return useContext(FeedModeContext)
}
