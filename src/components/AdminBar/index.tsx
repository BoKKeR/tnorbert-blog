'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/cn'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [docId, setDocId] = useState<string | undefined>()
  const router = useRouter()

  // Detect post pages: /posts/[slug]
  const postSlugMatch = pathname?.match(/^\/posts\/([^/]+)$/)
  const postSlug = postSlugMatch?.[1]
  const collection = postSlug ? 'posts' : 'pages'

  // Fetch the post ID by slug so the admin bar can render an Edit button
  useEffect(() => {
    if (!postSlug || !show) { setDocId(undefined); return }
    fetch(`/api/posts?where[slug][equals]=${encodeURIComponent(postSlug)}&limit=1&depth=0`)
      .then((r) => r.json())
      .then((data) => setDocId(data?.docs?.[0]?.id ?? undefined))
      .catch(() => setDocId(undefined))
  }, [postSlug, show])

  const onAuthChange = React.useCallback((user: { id?: string } | null) => {
    setShow(!!user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          id={docId}
          collectionLabels={{
            plural: collection === 'posts' ? 'Posts' : 'Pages',
            singular: collection === 'posts' ? 'Post' : 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
