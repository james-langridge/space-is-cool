import {notFound} from 'next/navigation'
import React from 'react'

import {columns} from '@/app/(with-header-footer)/manifests/[rover]/photos/columns'
import {DataTable} from '@/app/(with-header-footer)/manifests/[rover]/photos/data-table'
import HeaderNavButtons from '@/app/(with-header-footer)/manifests/ui/header-nav-buttons'
import {getMissionManifest} from '@/app/lib/api'
import {Separator} from '@/app/ui/separator'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const {photos} = await getMissionManifest(rover)

  if (!photos) {
    return notFound()
  }

  return (
    <>
      <HeaderNavButtons route={'/photos'} />
      <Separator className="my-4" />
      <div className="container mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold capitalize tracking-tight">
            {rover} photos
          </h2>
          <p className="text-muted-foreground">
            Click on a row to view the photos for that date. You can jump to a
            date using the filter below.
          </p>
        </div>
        <DataTable columns={columns} data={photos} />
      </div>
    </>
  )
}
