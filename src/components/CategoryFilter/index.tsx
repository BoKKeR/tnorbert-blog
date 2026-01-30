'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export const CategoryFilter: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  // Only show on /posts route
  if (!pathname.startsWith('/posts')) {
    return null
  }

  const categories = ['Saturday', 'Friday']

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/posts"
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          !currentCategory
            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/posts?category=${category}`}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentCategory === category
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
