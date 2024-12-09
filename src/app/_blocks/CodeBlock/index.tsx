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
  // Track if the component has mounted
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)

  const [state, copyToClipboard] = useCopyToClipboard()
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent mismatched SSR and client styles by only rendering code after mounting
  if (!mounted) {
    return null // Or some loading placeholder
  }

  const copyCode = () => {
    // Logic to copy `code`
    console.log(process.env.NEXT_PUBLIC_SERVER_URL)
    console.log(process.env.NEXT_PRIVATE_DRAFT_SECRET)
    copyToClipboard(code)
  }

  const codeTheme = theme === 'light' ? themes.dracula : themes.vsDark
  return (
    <Gutter>
      {/* <div className={classes.grid}>
        <div className={classes.overflow}>
          <CodeComponent code={code} language={language} theme={codeTheme}>
            <CodeComponent.Code className={classes['code-wrapper']}>
              <div className={classes['table-row']}>
                <CodeComponent.LineNumber className={classes['table-cell-line-number']} />
                <CodeComponent.LineContent className={classes['table-cell-line-content']}>
                  <CodeComponent.Token />
                </CodeComponent.LineContent>
              </div>
            </CodeComponent.Code>
            <button
              className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
              onClick={copyCode}
            >
              {state.value ? 'Copied!' : 'Copy code'}
            </button>
          </CodeComponent>
        </div>
      </div> */}

      <CodeComponent code={code} language={language}>
        <div className={classes['code-container']}>
          <CodeComponent.Code className={classes['code-block']}>
            <div className="code-row">
              <CodeComponent.LineNumber className={classes['line-number']} />
              <CodeComponent.LineContent className={classes['line-content']}>
                <CodeComponent.Token />
              </CodeComponent.LineContent>
            </div>
          </CodeComponent.Code>

          <button className="copy-button" onClick={copyCode}>
            {state.value ? 'Copied!' : 'Copy code'}
          </button>
        </div>
      </CodeComponent>
    </Gutter>
  )
}
