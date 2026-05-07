import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import NextImage from 'next/image'

import type { Post } from '@/payload-types'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('print:hidden', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <h2 className="font-serif text-lg font-semibold mb-4 text-foreground">Related posts</h2>

      <div className="flex flex-col gap-6">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          const heroImageObj = doc.heroImage && typeof doc.heroImage !== 'string' ? doc.heroImage : null
          const heroImageUrl = heroImageObj?.url ?? null
          const heroImageAlt = heroImageObj?.alt ?? doc.title ?? ''
          const href = `/posts/${doc.slug}`

          return (
            <article key={index} className="flex gap-4 items-start">
              {/* Thumbnail left */}
              {heroImageUrl && (
                <Link href={href} tabIndex={-1} aria-hidden="true" className="shrink-0">
                  <div className="border-2 border-primary p-1 w-24 h-16 sm:w-32 sm:h-20 overflow-hidden hover:border-primary/70 transition-colors">
                    <NextImage
                      src={heroImageUrl}
                      alt={heroImageAlt}
                      width={128}
                      height={80}
                      className="w-full h-full object-cover block"
                      sizes="128px"
                    />
                  </div>
                </Link>
              )}

              {/* Text right */}
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="font-serif text-base font-semibold leading-snug">
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {doc.title}
                  </Link>
                </h3>
                {doc.meta?.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {doc.meta.description}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
