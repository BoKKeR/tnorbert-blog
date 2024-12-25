'use client'

import React, { Fragment } from 'react'
import Giscus from '@giscus/react'
import { Gutter, useTheme } from '@payloadcms/ui'

export const GiscusComments = () => {
  const { theme } = useTheme()
  return (
    <Fragment>
      <Gutter>
        <div style={{ marginTop: '2rem' }}>
          <h5>Join the Discussion on github</h5>
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
            loading="lazy"
          />
        </div>
      </Gutter>
    </Fragment>
  )
}

export default GiscusComments
