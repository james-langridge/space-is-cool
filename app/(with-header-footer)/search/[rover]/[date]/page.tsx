import {notFound} from 'next/navigation'
import React from 'react'

import {DateScrollToolbar} from '@/app/(with-header-footer)/search/ui/date-scroll-toolbar'
import {PhotoPagination} from '@/app/(with-header-footer)/search/ui/PhotoPagination'
import PhotosNotFound from '@/app/(with-header-footer)/search/ui/PhotosNotFound'
import {isSolDate} from '@/app/(with-header-footer)/search/utils/date'
import {getPhotos, getMissionManifest} from '@/app/lib/api'
import {isValidDateString, isValidPage, isValidRoverName} from '@/app/lib/utils'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({
  params,
  searchParams,
}: {
  params: {rover: RoverName; date: string}
  searchParams: {page: string}
}) {
  const {rover, date} = params
  const {page} = searchParams

  if (
    !isValidRoverName(rover) ||
    !isValidDateString(date) ||
    !isValidPage(page)
  ) {
    return notFound()
  }

  const photos = await getPhotos({rover, date, page})

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
            searchParams={{rover, date, page, id: photo.id}}
          />
        ))}
      </PhotoGrid>
    </>
  )
}
