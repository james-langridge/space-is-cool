import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'
import {classNames} from '@/lib/misc'

export default function DateTypeToggle() {
  const form = useForm()
  const dispatch = useFormDispatch()

  return (
    <div className="flex justify-center dark:invert mt-2 w-full">
      <div className="flex max-w-min justify-center overflow-hidden border divide-x rounded-r-none rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
        <button
          disabled={form.dateType === 'sol'}
          className={classNames(
            'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
            form.dateType === 'sol'
              ? 'bg-gray-200 dark:bg-gray-500'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
          )}
          onClick={() => dispatch({type: 'SET_DATE_TYPE', payload: 'sol'})}
        >
          Sol
        </button>
        <button
          disabled={form.dateType === 'earth_date'}
          className={classNames(
            'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
            form.dateType === 'earth_date'
              ? 'bg-gray-200 dark:bg-gray-500'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
          )}
          onClick={() =>
            dispatch({type: 'SET_DATE_TYPE', payload: 'earth_date'})
          }
        >
          Earth
        </button>
      </div>
      {form.dateType === 'earth_date' && (
        <input
          required
          onChange={e =>
            dispatch({type: 'SET_EARTH_DATE', payload: e.target.value})
          }
          placeholder="Earth date"
          type="date"
          className="block rounded-lg w-52 border bg-white px-4 py-2  text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 rounded-l-none"
          value={form.earth_date}
        />
      )}
      {form.dateType === 'sol' && (
        <input
          onChange={e =>
            dispatch({type: 'SET_SOL', payload: Number(e.target.value)})
          }
          placeholder="Sol date"
          type="number"
          className="px-4 py-2 w-52 block rounded-lg border bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 rounded-l-none"
          value={form.sol}
        />
      )}
    </div>
  )
}
