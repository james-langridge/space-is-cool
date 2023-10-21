'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'
import ButtonSearch from '@/components/pages/search/ButtonSearch'
import InputCamera from '@/components/pages/search/InputCamera'
import InputDate from '@/components/pages/search/InputDate'
import {RoverName} from '@/types/APIResponseTypes'

export default function SearchForm() {
  const router = useRouter()
  const form = useForm()
  const dispatch = useFormDispatch()

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    dispatch({type: 'SET_SUBMITTED_FORM', payload: form})

    const {rover, sol, camera, earth_date} = form

    router.push(`/${rover}/${earth_date || sol}/${camera || ''}`)
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

function ButtonRovers() {
  const form = useForm()
  const dispatch = useFormDispatch()

  return (
    <div className="flex w-full justify-center pt-4 sm:px-4 sm:pb-0">
      <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
        {Object.values(RoverName).map(rover => (
          <Link key={rover} href={`/${rover}`}>
            <button
              className={clsx(
                'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
                {
                  'bg-gray-200 dark:bg-gray-500': rover === form.rover,
                  'hover:bg-gray-100 dark:hover:bg-gray-800':
                    rover !== form.rover,
                },
              )}
              onClick={() => {
                dispatch({type: 'SET_ROVER', payload: rover})
              }}
            >
              {rover}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
