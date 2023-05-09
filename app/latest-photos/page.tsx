'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import RoverButtonGroup from '@/app/components/RoverButtonGroup'
import {getLatestPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page() {
  const [rover, setRover] = useState<RoverName>(RoverName.Curiosity)
  const {ref, inView} = useInView()

  const {status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery({
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-0">
        {data.pages.map(page => (
          <React.Fragment key={page[0].page}>
            {page.map(photo => (
              <div
                key={photo.id}
                className="relative w-full h-64 overflow-hidden"
              >
                <Image
                  src={photo.img_src}
                  alt={photo.id.toString()}
                  fill
                  style={{objectFit: 'cover'}}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
    </main>
  )
}
