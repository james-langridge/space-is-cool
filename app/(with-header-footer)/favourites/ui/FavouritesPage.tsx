import React from 'react'

import Container from '@/app/ui/Container'
import PhotoGrid from '@/app/ui/PhotoGrid'
import PhotoThumbnail from '@/app/ui/PhotoThumbnail'
import {Photo} from '@/types/APIResponseTypes'

interface FavouritesPageProps {
  data: Photo[] | null
}

export default function FavouritesPage({data}: FavouritesPageProps) {
  return (
    <Container padding={166}>
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
    </Container>
  )
}
