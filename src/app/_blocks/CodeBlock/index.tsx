'use client'

import React, { useEffect, useState } from 'react'
import { CodeBlock as CodeComponent } from 'react-code-block'
import { themes } from 'prism-react-renderer'

import { useTheme } from '../../../app/_providers/Theme'
import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'codeblocks' }>

export const CodeBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ code, language }) => {
  // Track if the component has mounted
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent mismatched SSR and client styles by only rendering code after mounting
  if (!mounted) {
    return null // Or some loading placeholder
  }

  const codeTheme = theme === 'light' ? themes.duotoneLight : themes.vsDark
  return (
    <Gutter>
      <div className={classes.grid}>
        <CodeComponent code={code} language={language} theme={codeTheme}>
          <CodeComponent.Code className={classes['code-wrapper']}>
            <div className={classes['table-row']}>
              <CodeComponent.LineNumber className={classes['table-cell-line-number']} />
              <CodeComponent.LineContent className={classes['table-cell-line-content']}>
                <CodeComponent.Token />
              </CodeComponent.LineContent>
            </div>
          </CodeComponent.Code>
        </CodeComponent>
      </div>
    </Gutter>
  )
}
