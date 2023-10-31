import clsx from 'clsx'
import React, {Dispatch} from 'react'

import {FormAction, FormState} from '@/components/global/SearchForm'

export default function ButtonDateType({
  form,
  dispatch,
}: {
  form: FormState
  dispatch: Dispatch<FormAction>
}) {
  return (
    <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg rounded-r-none border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
      <button
        disabled={form.dateType === 'sol'}
        className={clsx(
          'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
          {
            'bg-gray-200 dark:bg-gray-500': form.dateType === 'sol',
            'hover:bg-gray-100 dark:hover:bg-gray-800': form.dateType !== 'sol',
          },
        )}
        onClick={() => {
          dispatch({type: 'SET_DATE_TYPE', payload: 'sol'})
          dispatch({type: 'SET_EARTH_DATE', payload: ''})
        }}
      >
        Sol
      </button>
      <button
        disabled={form.dateType === 'earth_date'}
        className={clsx(
          'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
          {
            'bg-gray-200 dark:bg-gray-500': form.dateType === 'earth_date',
            'hover:bg-gray-100 dark:hover:bg-gray-800':
              form.dateType !== 'earth_date',
          },
        )}
        onClick={() => {
          dispatch({type: 'SET_DATE_TYPE', payload: 'earth_date'})
          dispatch({type: 'SET_SOL', payload: ''})
        }}
      >
        Earth
      </button>
    </div>
  )
}
