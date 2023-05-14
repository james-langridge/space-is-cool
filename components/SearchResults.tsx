import {useQuery, useQueryClient} from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import FavouriteButton from '@/components/FavouriteButton'
import {getMissionManifest} from '@/lib/api'
import {convertDateFormat} from '@/lib/date'
import {Data} from '@/lib/photo'

export default function SearchResults({
  isInitialLoading,
  error,
}: {
  isInitialLoading: boolean
  error: unknown
}) {
  const form = useForm()
  const queryClient = useQueryClient()
  const photoData = queryClient.getQueryData<Data>([
    'photos',
    JSON.stringify(form.submittedForm),
  ])
  const isMobile = useMediaQuery('(max-width: 640px)')
  const {data: manifestData} = useQuery({
    queryKey: ['manifest', form.submittedForm?.rover],
    queryFn: () => getMissionManifest(form.submittedForm?.rover),
    enabled: !!form.submittedForm,
  })

  if (isInitialLoading) return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!photoData || !form.submittedForm) {
    // TODO: add instructions here
    return null
  }

  const {rover} = form.submittedForm

  if (!photoData.pages[0].length) {
    const maxDate = manifestData?.max_date.toString()
    const landingDate = manifestData?.landing_date.toString()

    return (
      <div className="prose w-full flex justify-center p-5">
        <p className="max-w-prose">
          No photos found. It&apos;s possible no photos were taken on that day
          or by that camera. Note, the landing date for {rover} is{' '}
          {convertDateFormat(landingDate)}, and the max Earth date is{' '}
          {convertDateFormat(maxDate)}. The sol date ranges from 0 to{' '}
          {manifestData?.max_sol}.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 px-0 pt-4">
      {photoData.pages.map(
        page =>
          page &&
          page.length > 0 && (
            <React.Fragment key={page[0].page}>
              {page.map(photo => (
                <div
                  key={photo.id}
                  className="relative w-auto h-24 sm:h-44 md:h-48 lg:h-64 overflow-hidden"
                >
                  {!isMobile && (
                    <FavouriteButton photo={photo} position="top-1 right-1" />
                  )}
                  <Link
                    href={`/photo/${photo.id}?rover=${rover}&search=true`}
                    className="relative block w-full h-full"
                  >
                    <Image
                      src={photo.img_src}
                      alt={photo.id.toString()}
                      fill
                      style={{objectFit: 'cover'}}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                    />
                  </Link>
                </div>
              ))}
            </React.Fragment>
          ),
      )}
    </div>
  )
}
