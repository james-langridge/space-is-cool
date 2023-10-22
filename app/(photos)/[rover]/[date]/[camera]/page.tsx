import React from 'react'

import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {isSolDate} from '@/lib/date'
import {
  CameraName,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

// Revalidate the cache twice a day
export const revalidate = 43200

const getPhotos = async (
  rover: RoverName,
  date: string,
  camera: CameraName,
  page = '1',
): Promise<Photo[]> => {
  const params = new URLSearchParams()
  const sol = /^\d+$/

  params.set('api_key', String(process.env.NASA_API_KEY))

  if (sol.test(date)) {
    params.set('sol', date)
  } else {
    params.set('earth_date', date)
  }

  params.set('camera', camera)
  params.set('page', String(page))

  const res = await fetch(
    `${process.env.NASA_BASE_URL}/rovers/${rover}/photos?${params.toString()}`,
  )

  const {photos} = await res.json()

  return photos
}

const getMissionManifest = async (rover: RoverName): Promise<PhotoManifest> => {
  const res = await fetch(
    `${process.env.NASA_BASE_URL}/manifests/${rover}?api_key=${String(
      process.env.NASA_API_KEY,
    )}`,
  )

  const {photo_manifest} = await res.json()

  return photo_manifest
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {rover: RoverName; date: string; camera: CameraName}
  searchParams: {page: string}
}) {
  const {rover, date, camera} = params
  const {page} = searchParams
  const photos = await getPhotos(rover, date, camera, page)
  const manifest = await getMissionManifest(rover)
  const dateType = isSolDate(date) ? 'sol' : 'earth_date'
  const searchDate = dateType === 'sol' ? Number(date) : date
  const totalPhotosOnDate = manifest.photos.find(
    photo => photo[dateType] === searchDate,
  )?.total_photos

  if (!photos.length) {
    return <PhotosNotFound rover={rover} />
  }

  return (
    <>
      {/*TODO: paginate these photos*/}
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoThumbnail key={photo.id} photo={photo} />
        ))}
      </PhotoGrid>
    </>
  )
}
