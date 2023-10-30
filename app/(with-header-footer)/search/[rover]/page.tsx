import {notFound} from 'next/navigation'
import React from 'react'

import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {getLatestPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const photos = await getLatestPhotos(rover)

  if (!photos) {
    return notFound()
  }

  return (
    <PhotoGrid>
      {photos.map(photo => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          searchParams={{rover, type: 'latest'}}
        />
      ))}
    </PhotoGrid>
  )
}
