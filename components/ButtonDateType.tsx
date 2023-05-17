import clsx from 'clsx'
import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'

export default function ButtonDateType() {
  const form = useForm()
  const dispatch = useFormDispatch()

  return (
    <div className="flex max-w-min justify-center overflow-hidden border divide-x rounded-r-none rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
      <button
        disabled={form.dateType === 'sol'}
        className={clsx(
          'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
          {
            'bg-gray-200 dark:bg-gray-500': form.dateType === 'sol',
            'hover:bg-gray-100 dark:hover:bg-gray-800': form.dateType !== 'sol',
          },
        )}
        onClick={() => dispatch({type: 'SET_DATE_TYPE', payload: 'sol'})}
      >
        Sol
      </button>
      <button
        disabled={form.dateType === 'earth_date'}
        className={clsx(
          'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
          {
            'bg-gray-200 dark:bg-gray-500': form.dateType === 'earth_date',
            'hover:bg-gray-100 dark:hover:bg-gray-800':
              form.dateType !== 'earth_date',
          },
        )}
        onClick={() => dispatch({type: 'SET_DATE_TYPE', payload: 'earth_date'})}
      >
        Earth
      </button>
    </div>
  )
}
