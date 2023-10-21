import {useQueryClient} from '@tanstack/react-query'
import React from 'react'

import {useForm} from '@/app/providers'
import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {Data} from '@/lib/photo'

export default function PhotoSearchResults({
  isInitialLoading,
  error,
}: {
  isInitialLoading: boolean
  error: unknown
}) {
  const form = useForm()
  const {submittedForm} = form
  const queryClient = useQueryClient()
  const queryKey = ['photos', JSON.stringify(submittedForm)]
  const photoData = queryClient.getQueryData<Data>(queryKey)

  if (isInitialLoading) return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!photoData) {
    // TODO: add instructions here
    return null
  }

  if (!submittedForm) {
    return null
  }

  if (!photoData.pages[0].length) {
    return <PhotosNotFound />
  }

  return (
    <PhotoGrid>
      {photoData.pages.map(
        page =>
          page &&
          page.length > 0 && (
            <React.Fragment key={page[0].page}>
              {page.map(photo => (
                <PhotoThumbnail key={photo.id} photo={photo} mode="search" />
              ))}
            </React.Fragment>
          ),
      )}
    </PhotoGrid>
  )
}
