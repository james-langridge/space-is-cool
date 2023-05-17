'use client'

import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import {FormState, useForm, useFormDispatch} from '@/app/providers'
import ButtonRovers from '@/components/ButtonRovers'
import ButtonSearch from '@/components/ButtonSearch'
import Container from '@/components/Container'
import Header from '@/components/Header'
import InputCamera from '@/components/InputCamera'
import InputDate from '@/components/InputDate'
import PhotoSearchResults from '@/components/PhotoSearchResults'
import {useSearchPhotos} from '@/hooks'

export default function Page() {
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
  }, [inView])

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    dispatch({type: 'SET_SUBMITTED_FORM', payload: form})
    setFormForQuery(form)
    setFormSubmitted(true)
  }

  return (
    <Container>
      <Header string="Search Photos" />
      <ButtonRovers />
      <InputDate />
      <InputCamera />
      <form onSubmit={onSubmit}>
        <ButtonSearch />
      </form>
      <PhotoSearchResults
        error={error}
        isInitialLoading={isInitialLoading}
        mode="search"
      />
      <div ref={ref} />
    </Container>
  )
}
