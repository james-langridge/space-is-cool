'use client'

import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import Container from '@/components/Container'
import Header from '@/components/Header'
import MobileManifests from '@/components/MobileManifests'
import {useManifests, useSortableData} from '@/hooks'
import {keyMap, PhotoManifestKey, validKeys} from '@/lib/manifest'

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
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (isMobile) {
    return <MobileManifests />
  }

  return (
    <Container>
      <Header string="Mission Manifests" />
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
                                className="whitespace-nowrap px-4 py-4 text-sm"
                              >
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
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
