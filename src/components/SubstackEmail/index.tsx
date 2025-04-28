'use client'

import useThemeValue from '@/utilities/useThemeValue'
import React from 'react'

export const SubstackEmail = () => {
  const theme = useThemeValue()
  return (
    <>
      <div className="pt-8 flex flex-1 justify-center">
        <iframe
          src="https://bokker.substack.com/embed"
          height="360"
          className="border-4 border-dashed"
          style={{
            borderRadius: '20px',
            borderColor: `${theme === 'dark' ? '#a087d6' : 'grey'}`,
            width: '100%',
            maxWidth: 800,
          }}
        />
      </div>
    </>
  )
}

export default SubstackEmail
