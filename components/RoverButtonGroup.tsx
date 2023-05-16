import clsx from 'clsx'
import React from 'react'

import {useForm, useFormDispatch} from '@/app/providers'
import {RoverName} from '@/types/APIResponseTypes'

export default function RoverButtonGroup() {
  const form = useForm()
  const dispatch = useFormDispatch()

  return (
    <div className="pt-4 sm:px-4 sm:pb-0 w-full flex justify-center dark:invert">
      <div className="flex max-w-min justify-center overflow-hidden border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
        {Object.values(RoverName).map(rover => (
          <button
            key={rover}
            disabled={rover === form.rover}
            className={clsx(
              'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
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
        ))}
      </div>
    </div>
  )
}
