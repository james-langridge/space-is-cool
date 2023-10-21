'use client'

import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import {FormState, useForm, useFormDispatch} from '@/app/providers'
import ButtonSearch from '@/components/pages/search/ButtonSearch'
import InputCamera from '@/components/pages/search/InputCamera'
import InputDate from '@/components/pages/search/InputDate'
import PhotoSearchResults from '@/components/pages/search/PhotoSearchResults'
import {useSearchPhotos} from '@/hooks'

export default function SearchPage() {
  const form = useForm()
  const dispatch = useFormDispatch()
  const [formForQuery, setFormForQuery] = useState<FormState | null>(null)
  const {ref, inView} = useInView()
  const [isFormSubmitted, setFormSubmitted] = useState(false)
  const {isInitialLoading, error, fetchNextPage} = useSearchPhotos({
    formForQuery,
    isFormSubmitted,
    setFormSubmitted,
  })

  useEffect(() => {
    if (inView) {
      setFormSubmitted(true)
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    dispatch({type: 'SET_SUBMITTED_FORM', payload: form})
    setFormForQuery(form)
    setFormSubmitted(true)
  }

  return (
    <>
      <InputDate />
      <InputCamera />
      <form onSubmit={onSubmit}>
        <ButtonSearch />
      </form>
      <PhotoSearchResults error={error} isInitialLoading={isInitialLoading} />
      <div ref={ref} />
    </>
  )
}
