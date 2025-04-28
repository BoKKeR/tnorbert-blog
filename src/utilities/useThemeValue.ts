import { getImplicitPreference, themeLocalStorageKey } from '@/providers/Theme/shared'
import { useState, useEffect } from 'react'

function useThemeValue(): 'dark' | 'light' {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null)

  useEffect(() => {
    const getThemeFromStorage = () => {
      const theme = window.localStorage.getItem(themeLocalStorageKey)
      setCurrentTheme(theme || getImplicitPreference())
    }

    getThemeFromStorage()

    window.addEventListener(themeLocalStorageKey, getThemeFromStorage)
    return () => window.removeEventListener(themeLocalStorageKey, getThemeFromStorage)
  }, [])

  return currentTheme as 'dark' | 'light'
}
export default useThemeValue
