'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import {useMediaQuery} from 'usehooks-ts'

import FavouriteButton from '@/components/FavouriteButton'
import RoverButtonGroup from '@/components/RoverButtonGroup'
import {getLatestPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page() {
  const [rover, setRover] = useState<RoverName>(RoverName.Curiosity)
  const {ref, inView} = useInView()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const {status, data, error, fetchNextPage} = useInfiniteQuery({
    queryKey: ['photos', rover],
    queryFn: ({pageParam = 0}) => getLatestPhotos(rover, pageParam),
    getNextPageParam: lastPage => {
      return lastPage.length === 25 ? lastPage[0].page + 1 : undefined
    },
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (status === 'loading') return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!data) {
    return null
  }

  return (
    <main className="w-full">
      <h1 className="text-center w-full text-6xl my-5">Latest Photos</h1>
      <RoverButtonGroup setRover={setRover} selectedRover={rover} />
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 px-0">
        {data.pages.map(page => (
          <React.Fragment key={page[0].page}>
            {page.map(photo => (
              <div
                key={photo.id}
                className="relative w-auto h-24 sm:h-44 md:h-48 lg:h-64 overflow-hidden"
              >
                {!isMobile && (
                  <FavouriteButton photo={photo} position="top-1 right-1" />
                )}
                <Link href={`/photo/${photo.id}?rover=${rover}`}>
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
        ))}
      </div>
      <div ref={ref}></div>
    </main>
  )
}
