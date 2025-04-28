'use client'

import React from 'react'

export const SubstackEmail = () => {
  return (
    <>
      <div className="pt-8 flex flex-1 justify-center">
        <iframe
          src="https://bokker.substack.com/embed"
          height="360"
          style={{
            width: '100%',
            maxWidth: 800,
          }}
        />
      </div>
    </>
  )
}

export default SubstackEmail
