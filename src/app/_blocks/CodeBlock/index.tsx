'use client'

import React, { useEffect, useState } from 'react'
import { CodeBlock as CodeComponent } from 'react-code-block'
import { useCopyToClipboard } from 'react-use'
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
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [state, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isCopied])

  // Prevent mismatched SSR and client styles by only rendering code after mounting
  if (!mounted) {
    return null
  }

  const copyCode = () => {
    setIsCopied(true)
    copyToClipboard(code)
  }

  const codeTheme = theme === 'light' ? themes.vsDark : themes.dracula
  return (
    <Gutter>
      <CodeComponent code={code} language={language} theme={codeTheme}>
        <div className={classes['code-container']}>
          <CodeComponent.Code className={classes['code-block']}>
            <div className="code-row">
              <CodeComponent.LineNumber className={classes['line-number']} />
              <CodeComponent.LineContent className={classes['line-content']}>
                <CodeComponent.Token />
              </CodeComponent.LineContent>
            </div>
          </CodeComponent.Code>

          <button className={classes['copy-button']} onClick={copyCode}>
            {isCopied ? <>copied</> : <>copy</>}
          </button>
        </div>
      </CodeComponent>
    </Gutter>
  )
}
