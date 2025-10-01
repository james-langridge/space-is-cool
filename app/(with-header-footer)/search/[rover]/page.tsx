import {notFound} from 'next/navigation'
import React from 'react'

import PhotosNotFound from '@/app/(with-header-footer)/search/ui/PhotosNotFound'
import {getLatestPhotos} from '@/app/lib/api'
import {isValidRoverName} from '@/app/lib/utils'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params

  if (!isValidRoverName(rover)) {
    return notFound()
  }

  const photos = await getLatestPhotos(rover)

  if (!photos.length) {
    return PhotosNotFound({rover})
  }

  return (
    <PhotoGrid>
      {photos.map(photo => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          searchParams={{rover, id: String(photo.id)}}
        />
      ))}
    </PhotoGrid>
  )
}
