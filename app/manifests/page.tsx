'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {useManifests, useSortableData} from '@/hooks'
import {keyMap, PhotoManifestKey, validKeys} from '@/lib/manifest'
import {classNames} from '@/lib/misc'

export default function Page() {
  const manifests = useManifests()
  const {
    items: sortedManifests,
    requestSort,
    sortConfig,
  } = useSortableData(manifests, {
    key: 'name',
    order: 'asc',
  })

  return (
    <main className="w-full bg-white dark:invert min-h-screen">
      <h1 className="text-center w-full text-6xl py-5">Mission Manifests</h1>
      <section className="container mx-auto px-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {sortedManifests?.map(manifest => {
                      return (
                        <tr key={manifest.name}>
                          {validKeys.map(key => {
                            return (
                              <td
                                key={key}
                                className={classNames(
                                  'whitespace-nowrap px-4 py-4 text-sm',
                                  key === 'name' ? 'capitalize' : '',
                                )}
                              >
                                <div>
                                  <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                    {manifest[key].toString()}
                                  </p>
                                </div>
                              </td>
                            )
                          })}
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div className="flex items-center gap-x-6">
                              <Link
                                className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                                href={`/manifests/${manifest.name}`}
                              >
                                <Image
                                  title="Photos detail"
                                  src={'./camera.svg'}
                                  alt={'photos'}
                                  width={24}
                                  height={24}
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
