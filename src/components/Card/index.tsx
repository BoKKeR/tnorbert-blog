'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import NextImage from 'next/image'
import React from 'react'

import type { Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'heroImage'>

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

function truncateExcerpt(text: string | null | undefined): string {
  if (!text) return ''
  const cleaned = text.replace(/\s/g, ' ')
  if (cleaned.length <= 160) return cleaned
  return cleaned.slice(0, 160) + '…'
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt, heroImage } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const excerpt = truncateExcerpt(description)
  const formattedDate = formatDate(publishedAt)
  const href = `/${relationTo}/${slug}`

  // Resolve heroImage — it can be a string (ID) or a Media object
  const heroImageObj = heroImage && typeof heroImage !== 'string' ? heroImage : null
  const heroImageUrl = heroImageObj?.url ?? null
  const heroImageAlt = heroImageObj?.alt ?? titleToUse ?? ''

  return (
    <article
      className={cn(
        'border border-transparent rounded-sm overflow-hidden bg-card',
        'transition-[border-color,box-shadow] duration-200',
        'hover:border-primary hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]',
        'hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/* Hero image — 16:9 aspect ratio */}
      <div className="relative w-full aspect-video overflow-hidden">
        {heroImageUrl ? (
          <NextImage
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={undefined}
            height={undefined}
          />
        ) : (
          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
            <span className="font-serif text-primary font-bold text-lg tracking-tight select-none">
              deployonfri.day
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Tags + date row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Category pill badges */}
          {showCategories && hasCategories && (
            <div className="flex flex-wrap gap-1.5">
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

          {/* Publication date */}
          {formattedDate && (
            <time
              dateTime={publishedAt ?? undefined}
              className="text-xs text-muted-foreground font-serif ml-auto shrink-0"
            >
              {formattedDate}
            </time>
          )}
        </div>

        {/* Title */}
        {titleToUse && (
          <h2 className="font-serif text-lg font-semibold leading-snug text-card-foreground">
            <Link
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              href={href}
              ref={link.ref}
              tabIndex={0}
            >
              {titleToUse}
            </Link>
          </h2>
        )}

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </article>
  )
}
