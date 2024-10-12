import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'codeblocks' }>

export const CodeBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ trackingCode }) => {
  return (
    <Gutter>
      <VerticalPadding className={[classes.callToAction, classes.invert].filter(Boolean).join(' ')}>
        <div className={classes.wrap}>
          <p>{trackingCode}</p>
        </div>
      </VerticalPadding>
    </Gutter>
  )
}
