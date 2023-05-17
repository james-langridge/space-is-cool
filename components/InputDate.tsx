import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'
import ButtonDateType from '@/components/ButtonDateType'

export default function InputDate() {
  const form = useForm()
  const dispatch = useFormDispatch()

  return (
    <div className="flex justify-center mt-2 w-full">
      <ButtonDateType />
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
            dispatch({
              type: 'SET_SOL',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
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
