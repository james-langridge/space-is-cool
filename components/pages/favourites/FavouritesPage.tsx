import React from 'react'

import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {Photo} from '@/types/APIResponseTypes'

interface FavouritesPageProps {
  data: Photo[] | null
}

export default function FavouritesPage({data}: FavouritesPageProps) {
  return (
    <PhotoGrid>
      {data &&
        data.map(photo => (
          <PhotoThumbnail
            key={photo.id}
            photo={photo}
            searchParams={{type: 'favourite'}}
          />
        ))}
    </PhotoGrid>
  )
}
