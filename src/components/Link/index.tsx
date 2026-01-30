import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  currentPath?: string
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    currentPath,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  // Check if the link is active
  const isActive = currentPath
    ? href === '/'
      ? currentPath === '/' // Home page: exact match only
      : currentPath === href || // Exact match (including query params)
        (!href.includes('?') && currentPath.startsWith(href + '/')) || // Sub-path match (only if link has no query params)
        (!href.includes('?') && currentPath.startsWith(href + '?')) // Query param match (only if link has no query params)
    : false

  // Debug logging
  if (currentPath && label) {
    console.log('Link:', label, '| href:', href, '| currentPath:', currentPath, '| isActive:', isActive)
  }

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className, isActive && 'font-semibold text-primary')}
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={cn(className, isActive && 'font-semibold')} size={size} variant={appearance}>
      <Link href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
