import {notFound} from 'next/navigation'
import React from 'react'

import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {Photo, RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache twice a day
export const revalidate = 43200

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const params = new URLSearchParams()
  params.set('api_key', String(process.env.NASA_API_KEY))

  const res = await fetch(
    `${
      process.env.NASA_BASE_URL
    }/rovers/${rover}/latest_photos?${params.toString()}`,
  )

  const {latest_photos} = await res.json()

  return latest_photos
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
        <PhotoThumbnail key={photo.id} photo={photo} mode="search" />
      ))}
    </PhotoGrid>
  )
}
