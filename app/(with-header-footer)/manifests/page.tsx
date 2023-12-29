import React from 'react'

import {columns} from '@/app/(with-header-footer)/manifests/columns'
import {DataTable} from '@/app/(with-header-footer)/manifests/data-table'
import {getMissionManifest} from '@/app/lib/api'
import {Separator} from '@/app/ui/separator'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page() {
  const rovers = Object.values(RoverName).map(rover => rover)
  const promises = rovers.map(rover => getMissionManifest(rover))
  const data = await Promise.all(promises)

  return (
    <>
      <Separator className="my-4" />
      <div className="container mx-auto">
        <div className="container mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Mission manifests
            </h2>
            <p className="text-muted-foreground">
              Click a row to view that rover&apos;s photo history.
            </p>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  )
}
