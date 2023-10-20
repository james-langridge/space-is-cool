import React from 'react'

import {validKeys} from '@/lib/manifest'
import {PhotoManifest} from '@/types/APIResponseTypes'

type Props = {
  sortedManifests: PhotoManifest[]
}

export default function TableBody({sortedManifests}: Props) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
      {sortedManifests?.map(manifest => {
        return (
          <tr key={manifest.name}>
            {validKeys.map(key => {
              return (
                <td key={key} className="whitespace-nowrap px-4 py-4 text-sm">
                  <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      {manifest[key].toString()}
                    </p>
                  </div>
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
