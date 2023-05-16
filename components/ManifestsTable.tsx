import React from 'react'

import TableBody from '@/components/TableBody'
import TableHead from '@/components/TableHead'
import {useManifests, useSortableData} from '@/hooks'

export default function ManifestsTable() {
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
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <TableHead sortConfig={sortConfig} requestSort={requestSort} />
      <TableBody sortedManifests={sortedManifests} />
    </table>
  )
}
