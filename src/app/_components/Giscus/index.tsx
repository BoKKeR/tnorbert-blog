'use client'

import React, { Fragment } from 'react'
import Giscus from '@giscus/react'

import { Gutter } from '../Gutter'

export const GiscusComments = () => {
  return (
    <Fragment>
      <Gutter>
        <div style={{ marginTop: '2rem' }}>
          <h5>Join the Discussion</h5>
          <Giscus
            id="comments"
            repo="bokker/tnorbert-blog"
            repoId="R_kgDOM-_PCA="
            category="Announcements"
            categoryId="DIC_kwDOM-_PCM4ClbMt"
            mapping="pathname"
            term="Github discussion module"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="en"
            loading="lazy"
          />
        </div>
      </Gutter>
    </Fragment>
  )
}

export default GiscusComments
