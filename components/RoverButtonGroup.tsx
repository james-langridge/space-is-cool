import React from 'react'

import {classNames} from '@/lib/misc'
import {RoverName} from '@/types/APIResponseTypes'

export default function RoverButtonGroup({
  setRover,
  selectedRover,
}: {
  setRover: React.Dispatch<React.SetStateAction<RoverName>>
  selectedRover: RoverName
}) {
  return (
    <div className="flex justify-center overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
      {Object.values(RoverName).map(rover => (
        <button
          key={rover}
          disabled={rover === selectedRover}
          className={classNames(
            'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300 ',
            rover === selectedRover
              ? 'bg-gray-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
          )}
          onClick={() => setRover(RoverName[rover])}
        >
          {rover}
        </button>
      ))}
    </div>
  )
}
