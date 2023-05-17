'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import React, {useEffect} from 'react'
import {useInView} from 'react-intersection-observer'

import {useForm} from '@/app/providers'
import ButtonRovers from '@/components/ButtonRovers'
import Container from '@/components/Container'
import Header from '@/components/Header'
import PhotoSearchResults from '@/components/PhotoSearchResults'
import {useLatestPhotos} from '@/hooks'

export default function LatestPhotos() {
  const form = useForm()
  const {ref, inView} = useInView()
  const {isInitialLoading, error, fetchNextPage} = useLatestPhotos(form.rover)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <Container>
      <Header string="Latest Photos" />
      <ButtonRovers />
      <PhotoSearchResults
        isInitialLoading={isInitialLoading}
        error={error}
        mode="latest"
      />
      <div ref={ref} />
    </Container>
  )
}
