'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import React, {useEffect} from 'react'
import {useInView} from 'react-intersection-observer'

import {useForm} from '@/app/providers'
import Container from '@/components/Container'
import Header from '@/components/Header'
import RoverButtonGroup from '@/components/RoverButtonGroup'
import SearchResults from '@/components/SearchResults'
import {getLatestPhotos} from '@/lib/api'

export default function LatestPhotos() {
  const form = useForm()
  const {rover} = form
  const {ref, inView} = useInView()

  const {isInitialLoading, error, fetchNextPage} = useInfiniteQuery({
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

  return (
    <Container>
      <Header string="Latest Photos" />
      <RoverButtonGroup />
      <SearchResults
        isInitialLoading={isInitialLoading}
        error={error}
        mode="latest"
      />
      <div ref={ref} />
    </Container>
  )
}
