import {format} from 'date-fns'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import React from 'react'

import HeaderNavButtons from '@/app/(with-header-footer)/manifests/ui/header-nav-buttons'
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
      <HeaderNavButtons />
      <Separator className="my-4" />
      <div className="mx-auto space-y-8 px-4">
        <p className="text-muted-foreground">
          Click on the Total Photos card to view a searchable table of all the
          rover&apos;s photos.
        </p>
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
      </div>
    </>
  )
}
