import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ReCaptchaProvider } from '@/hooks/useGoogleReCaptcha'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <ReCaptchaProvider>{children}</ReCaptchaProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
