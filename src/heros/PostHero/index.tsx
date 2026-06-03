import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'

import type { Post } from '@/payload-types'

import { formatAuthors } from '@/utilities/formatAuthors'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return dateFormatter.format(new Date(dateStr))
}

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  const heroImageObj = heroImage && typeof heroImage !== 'string' ? heroImage : null
  const heroImageUrl = heroImageObj?.url ?? null
  const heroImageAlt = heroImageObj?.alt ?? title ?? ''

  const formattedDate = formatDate(publishedAt)

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      {/* Back-link — hidden in print */}
      <div className="print:hidden mb-6">
        <Link
          href="/"
          aria-label="Back to all posts"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          ← All posts
        </Link>
      </div>

      {/* Article metadata — visible in print */}
      <div className="print:block">
        {/* Category tag pills */}
        {hasCategories && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                return (
                  <span
                    key={index}
                    className="rounded-sm px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {categoryTitle || 'Untitled'}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Post title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          {title}
        </h1>

        {/* Author + date line */}
        {(hasAuthors || formattedDate) && (
          <p className="text-sm text-muted-foreground mb-8">
            {hasAuthors && (
              <span>By {formatAuthors(populatedAuthors!)}</span>
            )}
            {hasAuthors && formattedDate && <span> · </span>}
            {formattedDate && (
              <time dateTime={publishedAt ?? undefined}>{formattedDate}</time>
            )}
          </p>
        )}
      </div>

      {/* Hero image — framed with colored border and padding */}
      {heroImageUrl && (
        <div className="border-2 border-primary p-2 mt-6">
          <NextImage
            src={heroImageUrl}
            alt={heroImageAlt}
            width={1200}
            height={675}
            priority
            className="w-full h-auto object-cover block"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}
    </div>
  )
}
