import {notFound} from 'next/navigation'
import React from 'react'

import PhotosNotFound from '@/app/(with-header-footer)/search/ui/PhotosNotFound'
import {isSolDate} from '@/app/(with-header-footer)/search/utils/date'
import {getPhotos, getMissionManifest} from '@/app/lib/api'
import {
  isValidCameraName,
  isValidDateString,
  isValidPage,
  isValidRoverName,
} from '@/app/lib/utils'
import PhotoGrid from '@/app/ui/PhotoGrid'
import PhotoThumbnail from '@/app/ui/PhotoThumbnail'
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
