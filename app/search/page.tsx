'use client'

import {useInfiniteQuery} from '@tanstack/react-query'
import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import {FormState, useForm, useFormDispatch} from '@/app/providers'
import CameraToggle from '@/components/CameraToggle'
import DateTypeToggle from '@/components/DateTypeToggle'
import Header from '@/components/Header'
import RoverButtonGroup from '@/components/RoverButtonGroup'
import SearchButton from '@/components/SearchButton'
import SearchResults from '@/components/SearchResults'
import {getPhotos} from '@/lib/api'

export default function Page() {
  const form = useForm()
  const dispatch = useFormDispatch()
  const [formForQuery, setFormForQuery] = useState<FormState | null>(null)
  const {ref, inView} = useInView()
  const [isFormSubmitted, setFormSubmitted] = useState(false)

  const {isInitialLoading, error, fetchNextPage} = useInfiniteQuery({
    queryKey: ['photos', JSON.stringify(formForQuery)],
    queryFn: ({pageParam = 0}) =>
      formForQuery ? getPhotos({...formForQuery, page: pageParam}) : [],
    getNextPageParam: lastPage => {
      return lastPage.length === 25 ? lastPage[0].page + 1 : undefined
    },
    enabled: isFormSubmitted,
    onSettled: () => {
      setFormSubmitted(false)
    },
  })

  useEffect(() => {
    if (inView) {
      setFormSubmitted(true)
      fetchNextPage()
    }
  }, [inView])

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    dispatch({type: 'SET_SUBMITTED_FORM', payload: form})
    setFormForQuery(form)
    setFormSubmitted(true)
  }

  return (
    <main className="w-full bg-white dark:invert min-h-screen">
      <Header string="Search Photos" />
      <RoverButtonGroup />
      <DateTypeToggle />
      <CameraToggle />
      <form onSubmit={onSubmit}>
        <SearchButton />
      </form>
      <SearchResults error={error} isInitialLoading={isInitialLoading} />
      <div ref={ref} />
    </main>
  )
}
