import {useQueryClient} from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import FavouriteButton from '@/components/FavouriteButton'
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
  const data = queryClient.getQueryData<Data>([
    'photos',
    JSON.stringify(form.submittedForm),
  ])
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (isInitialLoading) return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!data) {
    return null
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 px-0 pt-4">
      {data.pages.map(
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
                    href={`/photo/${photo.id}?rover=${form.submittedForm?.rover}&search=true`}
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
