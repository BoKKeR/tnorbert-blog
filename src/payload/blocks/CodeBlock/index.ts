import type { Block } from 'payload/types'

export const CodeBlock: Block = {
  slug: 'codeblocks',
  fields: [
    {
      name: 'language',
      type: 'select', // Define a select field for the dropdown
      required: true,
      options: [
        { label: 'JSX', value: 'jsx' },
        { label: 'Typescript', value: 'tsx' },
        { label: 'Swift', value: 'swift' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Objective-C', value: 'objectivec' },
        { label: 'JS Extras', value: 'js-extras' },
        { label: 'Reason', value: 'reason' },
        { label: 'Rust', value: 'rust' },
        { label: 'GraphQL', value: 'graphql' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Go', value: 'go' },
        { label: 'C++', value: 'cpp' },
        { label: 'Markdown', value: 'markdown' },
      ],
      defaultValue: 'YAML', // Set a default language if needed
      admin: {
        description: 'Select the language for the code block',
      },
    },

    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
  ],
}

export default CodeBlock
