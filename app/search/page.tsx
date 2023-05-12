'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import {useForm, useFormDispatch} from '@/app/providers'
import CameraToggle from '@/components/CameraToggle'
import DateTypeToggle from '@/components/DateTypeToggle'
import RoverButtonGroup from '@/components/RoverButtonGroup'
import SearchButton from '@/components/SearchButton'
import SearchResults from '@/components/SearchResults'
import {getPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page() {
  const [rover, setRover] = useState<RoverName>(RoverName.Curiosity)
  const form = useForm()
  const dispatch = useFormDispatch()
  const [formForQuery, setFormForQuery] = useState(() => form)
  const {ref, inView} = useInView()
  const [isFormSubmitted, setFormSubmitted] = useState(false)

  const {status, data, error, fetchNextPage} = useInfiniteQuery({
    queryKey: ['photos', JSON.stringify(formForQuery)],
    queryFn: ({pageParam = 0}) => getPhotos({...formForQuery, page: pageParam}),
    getNextPageParam: lastPage => {
      return lastPage.length === 25 ? lastPage[0].page + 1 : undefined
    },
    enabled: isFormSubmitted,
    onSettled: () => {
      setFormSubmitted(false)
    },
  })

  useEffect(() => {
    dispatch({type: 'SET_ROVER', payload: rover})
  }, [dispatch, rover])

  useEffect(() => {
    if (inView) {
      setFormSubmitted(true)
      fetchNextPage()
    }
  }, [inView])

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setFormForQuery(form)
    setFormSubmitted(true)
  }

  return (
    <main className="w-full bg-white dark:invert min-h-screen">
      <h1 className="text-center w-full text-6xl py-5">Search Photos</h1>
      <RoverButtonGroup setRover={setRover} selectedRover={rover} />
      <DateTypeToggle />
      <CameraToggle />
      <form onSubmit={onSubmit}>
        <SearchButton />
      </form>
      <SearchResults data={data} rover={rover} error={error} status={status} />
      <div ref={ref} />
    </main>
  )
}
