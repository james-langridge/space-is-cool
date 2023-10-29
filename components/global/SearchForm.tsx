'use client'

import {useRouter} from 'next/navigation'
import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'
import ButtonRovers from '@/components/pages/search/ButtonRovers'
import ButtonSearch from '@/components/pages/search/ButtonSearch'
import InputCamera from '@/components/pages/search/InputCamera'
import InputDate from '@/components/pages/search/InputDate'

export default function SearchForm() {
  const router = useRouter()
  const form = useForm()
  const dispatch = useFormDispatch()

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    dispatch({type: 'SET_SUBMITTED_FORM', payload: form})

    const {rover, sol, camera, earth_date} = form

    router.push(`/search/${rover}/${earth_date || sol}/${camera || ''}?page=1`)
  }

  return (
    <>
      <ButtonRovers />
      <InputDate />
      <InputCamera />
      <form onSubmit={onSubmit}>
        <ButtonSearch />
      </form>
    </>
  )
}
