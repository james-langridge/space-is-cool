import React from 'react'

import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {Photo} from '@/types/APIResponseTypes'

type LatestPhotosRoverPageProps = {
  data: Photo[]
}

export default function LatestPhotosRoverPage({
  data,
}: LatestPhotosRoverPageProps) {
  return (
    <PhotoGrid>
      {data.map(photo => (
        <PhotoThumbnail key={photo.id} photo={photo} mode="latest" />
      ))}
    </PhotoGrid>
  )
}
