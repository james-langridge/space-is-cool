import React, {Dispatch} from 'react'

import {FormAction, FormState} from '@/components/global/SearchForm'
import ButtonDateType from '@/components/pages/search/ButtonDateType'

export default function InputDate({
  form,
  dispatch,
}: {
  form: FormState
  dispatch: Dispatch<FormAction>
}) {
  return (
    <div className="mt-2 flex w-full justify-center">
      <ButtonDateType form={form} dispatch={dispatch} />
      {form.dateType === 'earth_date' && (
        <input
          required
          onChange={e =>
            dispatch({type: 'SET_EARTH_DATE', payload: e.target.value})
          }
          placeholder="Earth date"
          type="date"
          className="block w-52 rounded-lg rounded-l-none border bg-white px-4  py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
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
          className="block w-52 rounded-lg rounded-l-none border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={form.sol}
        />
      )}
    </div>
  )
}
