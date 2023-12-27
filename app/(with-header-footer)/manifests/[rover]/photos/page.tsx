import Link from 'next/link'
import {notFound} from 'next/navigation'
import React from 'react'

import {columns} from '@/app/(with-header-footer)/manifests/[rover]/photos/columns'
import {DataTable} from '@/app/(with-header-footer)/manifests/[rover]/photos/data-table'
import {getMissionManifest} from '@/app/lib/api'
import Container from '@/app/ui/container'
import {Separator} from '@/app/ui/separator'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const {photos} = await getMissionManifest(rover)

  if (!photos) {
    return notFound()
  }

  return (
    <Container>
      <div className="flex w-full justify-center pt-4 sm:px-4 sm:pb-0">
        <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/manifests/${rover}/photos`}>
              <button
                className={
                  'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-6 sm:text-base'
                }
              >
                {rover}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="container mx-auto">
        <DataTable columns={columns} data={photos} />
      </div>
    </Container>
  )
}
