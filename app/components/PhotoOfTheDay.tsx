'use client'

import {useQuery} from '@tanstack/react-query'
import React from 'react'

import Photo from '@/app/components/Photo'
import RefreshButton from '@/app/components/RefreshButton'
import {getRandomPhoto} from '@/lib/random'

export default function PhotoOfTheDay() {
  const {isLoading, error, data, isFetching, refetch} = useQuery({
    queryKey: ['randomPhoto'],
    queryFn: () => getRandomPhoto(),
    retry: 3,
  })

  return (
    <div className="flex flex-col gap-5 items-center flex-wrap">
      <Photo photo={data} isLoading={isLoading} error={error} />
      <RefreshButton refetch={refetch} isFetching={isFetching} />
    </div>
  )
}
