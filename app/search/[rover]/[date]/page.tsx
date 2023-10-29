import React from 'react'

import PhotosNotFound from '@/components/pages/search/PhotosNotFound'
import PhotoGrid from '@/components/shared/PhotoGrid'
import {PhotoPagination} from '@/components/shared/PhotoPagination'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {getPhotos, getMissionManifest} from '@/lib/api'
import {isSolDate} from '@/lib/date'
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
  const photos = await getPhotos({rover, date, page})
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
