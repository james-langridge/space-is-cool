import React from 'react'

import {Order} from '@/hooks'
import {keyMap, PhotoManifestKey, validKeys} from '@/lib/manifest'
import {PhotoManifest} from '@/types/APIResponseTypes'

type Props = {
  requestSort: (key: keyof PhotoManifest) => void
  sortConfig: {key: keyof PhotoManifest; order: Order}
}

export default function TableHead({requestSort, sortConfig}: Props) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {validKeys.map(key => {
          return (
            <th
              key={key}
              onClick={() => requestSort(key as PhotoManifestKey)}
              className="py-3.5 px-4 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400 select-none"
            >
              {keyMap[key]}{' '}
              {sortConfig.key === key
                ? sortConfig.order === 'asc'
                  ? '▲'
                  : '▼'
                : ' '}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
