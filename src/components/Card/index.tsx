'use client'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import NextImage from 'next/image'
import React from 'react'

import type { Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'heroImage' | 'populatedAuthors'>

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return dateFormatter.format(new Date(dateStr))
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt, heroImage, populatedAuthors } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const hasAuthors = populatedAuthors && populatedAuthors.length > 0
  const authorNames = hasAuthors
    ? populatedAuthors!.map((a) => (typeof a === 'object' ? a.name : '')).filter(Boolean).join(', ')
    : null
  const titleToUse = titleFromProps || title
  const formattedDate = formatDate(publishedAt)
  const href = `/${relationTo}/${slug}`

  const heroImageObj = heroImage && typeof heroImage !== 'string' ? heroImage : null
  const heroImageUrl = heroImageObj?.url ?? null
  const heroImageAlt = heroImageObj?.alt ?? titleToUse ?? ''

  return (
    <article className={cn('group', className)}>
      {/* Title */}
      {titleToUse && (
        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-2">
          <Link
            href={href}
            className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {titleToUse}
          </Link>
        </h2>
      )}

      {/* Meta line: date :: author :: #tags */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-4 font-mono">
        {formattedDate && (
          <time dateTime={publishedAt ?? undefined}>{formattedDate}</time>
        )}
        {authorNames && (
          <>
            <span aria-hidden="true">::</span>
            <span>{authorNames}</span>
          </>
        )}
        {hasCategories && showCategories && (
          <>
            <span aria-hidden="true">::</span>
            <div className="flex flex-wrap gap-x-2">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  return (
                    <span key={index} className="text-primary">
                      #{categoryTitle?.toLowerCase().replace(/\s+/g, '-') || 'untitled'}
                    </span>
                  )
                }
                return null
              })}
            </div>
          </>
        )}
      </div>

      {/* Hero image */}
      {heroImageUrl && (
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <div className="border-2 border-primary p-2 mb-4 hover:border-primary/70 transition-colors">
            <NextImage
              src={heroImageUrl}
              alt={heroImageAlt}
              width={800}
              height={450}
              className="w-full h-auto object-cover block"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </Link>
      )}

      {/* Excerpt + read more */}
      {description && (
        <p className="text-base text-foreground/80 leading-relaxed mb-3">
          {description}{' '}
          <Link
            href={href}
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm whitespace-nowrap"
          >
            Read more →
          </Link>
        </p>
      )}
    </article>
  )
}
