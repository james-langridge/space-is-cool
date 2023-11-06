'use client'

import React, {useEffect} from 'react'

import {ErrorPage} from '@/app/ui/ErrorPage'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorPage error={error} reset={reset} />
}
