import React from 'react'

import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import {PhotoPagination} from '@/components/shared/PhotoPagination'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {isSolDate} from '@/lib/date'
import {Photo, PhotoManifest, RoverName} from '@/types/APIResponseTypes'

const getPhotos = async (
  rover: RoverName,
  date: string,
  page = '1',
): Promise<Photo[]> => {
  const params = new URLSearchParams()

  params.set('api_key', String(process.env.NASA_API_KEY))

  if (isSolDate(date)) {
    params.set('sol', date)
  } else {
    params.set('earth_date', date)
  }

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
  params: {rover: RoverName; date: string}
  searchParams: {page: string}
}) {
  const {rover, date} = params
  const {page} = searchParams
  const photos = await getPhotos(rover, date, page)
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
      {totalPhotosOnDate && (
        <PhotoPagination
          totalPhotos={totalPhotosOnDate}
          searchParams={searchParams}
          params={params}
        />
      )}
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoThumbnail
            key={photo.id}
            photo={photo}
            searchParams={{rover, date, page}}
          />
        ))}
      </PhotoGrid>
    </>
  )
}
