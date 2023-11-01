import React from 'react'

import {Order} from '@/app/(with-header-footer)/manifests/hooks/useSortableData'
import {
  keyMap,
  PhotoManifestKey,
  validKeys,
} from '@/app/(with-header-footer)/manifests/utils/manifest'
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
              className="select-none px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
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
