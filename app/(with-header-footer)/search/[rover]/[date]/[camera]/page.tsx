import {notFound} from 'next/navigation'
import React from 'react'

import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {getPhotos, getMissionManifest} from '@/lib/api'
import {isSolDate} from '@/lib/date'
import {
  isValidCameraName,
  isValidDateString,
  isValidPage,
  isValidRoverName,
} from '@/lib/utils'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

export default async function Page({
  params,
  searchParams,
}: {
  params: {rover: RoverName; date: string; camera: CameraName}
  searchParams: {page: string}
}) {
  const {rover, date, camera} = params
  const {page} = searchParams

  if (
    !isValidRoverName(rover) ||
    !isValidDateString(date) ||
    !isValidCameraName(camera) ||
    !isValidPage(page)
  ) {
    return notFound()
  }

  const photos = await getPhotos({rover, date, camera, page})

  if (!photos.length) {
    return <PhotosNotFound rover={rover} />
  }

  const manifest = await getMissionManifest(rover)
  const dateType = isSolDate(date) ? 'sol' : 'earth_date'
  const searchDate = dateType === 'sol' ? Number(date) : date
  const totalPhotosOnDate = manifest.photos.find(
    photo => photo[dateType] === searchDate,
  )?.total_photos

  return (
    <>
      {/*TODO: paginate these photos*/}
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoThumbnail
            key={photo.id}
            photo={photo}
            searchParams={{rover, date, camera, page}}
          />
        ))}
      </PhotoGrid>
    </>
  )
}
