import React from 'react'

import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {PhotoWithPage} from '@/lib/api'

interface FavouritesPageProps {
  data: PhotoWithPage[] | null
}

export default function FavouritesPage({data}: FavouritesPageProps) {
  return (
    <PhotoGrid>
      {data &&
        data.map(photo => (
          <PhotoThumbnail key={photo.id} photo={photo} mode="favourite" />
        ))}
    </PhotoGrid>
  )
}
