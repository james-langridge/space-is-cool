'use client'

import {redirect} from 'next/navigation'
import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import TableBody from '@/components/TableBody'
import TableHead from '@/components/TableHead'
import {useSortableData} from '@/hooks'
import {PhotoManifest} from '@/types/APIResponseTypes'

export default function TableManifests({
  manifests,
}: {
  manifests: PhotoManifest[]
}) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const {
    items: sortedManifests,
    requestSort,
    sortConfig,
  } = useSortableData(manifests, {
    key: 'name',
    order: 'asc',
  })

  if (isMobile) {
    redirect('/manifests/Curiosity')
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <TableHead sortConfig={sortConfig} requestSort={requestSort} />
      <TableBody sortedManifests={sortedManifests} />
    </table>
  )
}
