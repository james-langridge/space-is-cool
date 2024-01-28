import {notFound} from 'next/navigation'
import React from 'react'

import {DateScrollToolbar} from '@/app/(with-header-footer)/search/ui/date-scroll-toolbar'
import {PhotoPagination} from '@/app/(with-header-footer)/search/ui/PhotoPagination'
import PhotosNotFound from '@/app/(with-header-footer)/search/ui/PhotosNotFound'
import {getPhotos} from '@/app/lib/api'
import {
  isValidCameraName,
  isValidDateString,
  isValidPage,
  isValidRoverName,
} from '@/app/lib/utils'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
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

  let prevResLength = photos.length
  let prevPage = '0'
  let totalPhotosOnDate = photos.length

  while (prevResLength > 0) {
    const photos = await getPhotos({rover, date, camera, page: prevPage + 1})

    prevResLength = photos.length
    prevPage += 1
    totalPhotosOnDate += photos.length
  }

  return (
    <>
      <div className="space-y-2">
        <DateScrollToolbar />
        {totalPhotosOnDate && totalPhotosOnDate > 25 && (
          <PhotoPagination totalPhotos={totalPhotosOnDate} className="mb-4" />
        )}
      </div>
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoThumbnail
            key={photo.id}
            photo={photo}
            searchParams={{rover, date, camera, page, id: photo.id}}
          />
        ))}
      </PhotoGrid>
    </>
  )
}
