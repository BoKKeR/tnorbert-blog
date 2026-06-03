'use client'

import React, { useCallback } from 'react'
import {
  FormSubmit,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormModified,
} from '@payloadcms/ui'

export function PublishConfirmButton() {
  const { submit } = useForm()
  const modified = useFormModified()
  const {
    collectionSlug,
    id,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    setHasPublishedDoc,
  } = useDocumentInfo()
  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig()

  const canPublish = modified || !hasPublishedDoc

  const handlePublish = useCallback(() => {
    if (!window.confirm('Are you sure you want to publish this article?')) return

    const action = `${serverURL}${api}${
      globalSlug ? `/globals/${globalSlug}` : `/${collectionSlug}${id ? `/${id}` : ''}`
    }`
    submit({ action, overrides: { _status: 'published' } })
    setHasPublishedDoc(true)
  }, [submit, serverURL, api, collectionSlug, globalSlug, id, setHasPublishedDoc])

  if (!hasPublishPermission) return null

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={!canPublish}
      onClick={handlePublish}
      size="medium"
      type="button"
    >
      Publish
    </FormSubmit>
  )
}

export default PublishConfirmButton
