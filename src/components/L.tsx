import Link from 'next/link'
import React from 'react'
import { cn } from '@/utilities/cn'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  newTab?: boolean
}

export function L({ href, children, className, newTab }: Props) {
  const external = newTab ?? href.startsWith('http')
  return (
    <Link
      href={href}
      className={cn('text-primary hover:underline', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  )
}
