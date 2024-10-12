import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'

export const CodeBlock: Block = {
  slug: 'codeblocks',
  fields: [
    invertBackground,
    {
      name: 'trackingCode',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
  ],
}

export default CodeBlock
