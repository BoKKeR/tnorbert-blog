'use client'

import React from 'react'

export const SubstackEmail = () => {
  return (
    <>
      <div className="pt-8 flex flex-1 justify-center">
        <iframe
          src="https://bokker.substack.com/embed"
          height="360"
          style={{ border: '1px solid #fff', width: '100%', maxWidth: 800 }}
        ></iframe>
      </div>
    </>
  )
}

export default SubstackEmail
