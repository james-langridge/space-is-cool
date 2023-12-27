import {format} from 'date-fns'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import React from 'react'

import {getMissionManifest} from '@/app/lib/api'
import {Card, CardContent, CardHeader, CardTitle} from '@/app/ui/card'
import {Separator} from '@/app/ui/separator'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const manifest = await getMissionManifest(rover)

  if (!manifest) {
    return notFound()
  }

  return (
    <>
      <div className="flex w-full justify-center pt-4 sm:px-4 sm:pb-0">
        <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/manifests/${rover}`}>
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
      <div className="flex flex-wrap justify-center gap-4 capitalize">
        {Object.entries(manifest).map(([key, value]) => {
          if (key !== 'photos') {
            if (key === 'max_sol' || key === 'total_photos') {
              value = new Intl.NumberFormat().format(value as number)
            }

            if (
              key === 'max_date' ||
              key === 'launch_date' ||
              key === 'landing_date'
            ) {
              value = format(new Date(value as string), 'do MMM yyyy')
            }

            return key === 'total_photos' ? (
              <Link href={`/manifests/${manifest.name}/photos`}>
                <Card key={value as string}>
                  <CardHeader>
                    <CardTitle>{key.split('_').join(' ')}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {value as string | number}
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card key={value as string}>
                <CardHeader>
                  <CardTitle>{key.split('_').join(' ')}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {value as string | number}
                </CardContent>
              </Card>
            )
          }
        })}
      </div>
    </>
  )
}
