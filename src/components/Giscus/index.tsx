'use client'

import React, { Fragment } from 'react'
import Giscus from '@giscus/react'
import useThemeValue from '@/utilities/useThemeValue'

export const GiscusComments = () => {
  const theme = useThemeValue()

  return (
    <Fragment>
      <div className="print:hidden max-w-[48rem] mx-auto pt-12 pb-8">
        <hr className="border-border my-8" />
        <h2 className="text-xl font-serif">Join the Discussion on github</h2>
        <Giscus
          id="comments"
          repo="bokker/tnorbert-blog"
          repoId="R_kgDOM-_PCA"
          category="Announcements"
          categoryId="DIC_kwDOM-_PCM4ClbMt"
          mapping="pathname"
          term="Github discussion module"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang="en"
          loading="eager"
        />
      </div>
    </Fragment>
  )
}

export default GiscusComments
