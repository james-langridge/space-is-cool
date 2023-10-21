import React from 'react'

import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {PhotoWithPage} from '@/lib/api'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache twice a day
export const revalidate = 43200

const getPhotos = async (
  rover: RoverName,
  date: string,
  camera: CameraName,
): Promise<PhotoWithPage[]> => {
  const params = new URLSearchParams()
  const sol = /^\d+$/

  params.set('api_key', String(process.env.NASA_API_KEY))

  if (sol.test(date)) {
    params.set('sol', date)
  } else {
    params.set('earth_date', date)
  }

  params.set('camera', camera)

  const res = await fetch(
    `${process.env.NASA_BASE_URL}/rovers/${rover}/photos?${params.toString()}`,
  )

  const data = await res.json()

  // TODO: figure out pagination with SSR
  return data.photos.map((photo: Photo) => ({
    ...photo,
    page: params.get('page'),
  }))
}

export default async function Page({
  params,
}: {
  params: {rover: RoverName; date: string; camera: CameraName}
}) {
  const {rover, date, camera} = params
  const photos = await getPhotos(rover, date, camera)

  if (!photos.length) {
    return <PhotosNotFound rover={rover} />
  }

  return (
    <PhotoGrid>
      {photos.map(photo => (
        <PhotoThumbnail key={photo.id} photo={photo} mode="search" />
      ))}
    </PhotoGrid>
  )
}
