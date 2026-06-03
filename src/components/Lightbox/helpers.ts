import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type LightboxImage = {
  src: string
  alt: string
  caption: SerializedEditorState | null
  width?: number
  height?: number
}

export type LightboxEntry = {
  id: string
  image: LightboxImage
}

export function prevIndex(current: number, total: number): number {
  if (total === 0) return 0
  return current <= 0 ? total - 1 : current - 1
}

export function nextIndex(current: number, total: number): number {
  if (total === 0) return 0
  return current >= total - 1 ? 0 : current + 1
}

export function extractCaption(
  state: SerializedEditorState | null | undefined,
): string {
  if (!state?.root?.children) return ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromNode = (node: any): string => {
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(fromNode).join('')
    return ''
  }
  return (state.root.children as any[]).map(fromNode).join(' ').trim()
}
