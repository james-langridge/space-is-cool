import {useQueryClient} from '@tanstack/react-query'
import React from 'react'

import {useForm} from '@/app/providers'
import Grid from '@/components/Grid'
import GridPhoto from '@/components/GridPhoto'
import PhotosNotFound from '@/components/PhotosNotFound'
import {Data} from '@/lib/photo'

export default function SearchResults({
  isInitialLoading,
  error,
  mode,
}: {
  isInitialLoading: boolean
  error: unknown
  mode: 'search' | 'latest'
}) {
  const form = useForm()
  const {rover, submittedForm} = form
  const queryClient = useQueryClient()
  const queryKey =
    mode === 'search'
      ? ['photos', JSON.stringify(submittedForm)]
      : ['photos', rover]
  const photoData = queryClient.getQueryData<Data>(queryKey)

  if (isInitialLoading) return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!photoData) {
    // TODO: add instructions here
    return null
  }

  if (mode === 'search' && !submittedForm) {
    return null
  }

  if (!photoData.pages[0].length) {
    return <PhotosNotFound />
  }

  return (
    <Grid>
      {photoData.pages.map(
        page =>
          page &&
          page.length > 0 && (
            <React.Fragment key={page[0].page}>
              {page.map(photo => (
                <GridPhoto key={photo.id} photo={photo} mode={mode} />
              ))}
            </React.Fragment>
          ),
      )}
    </Grid>
  )
}
