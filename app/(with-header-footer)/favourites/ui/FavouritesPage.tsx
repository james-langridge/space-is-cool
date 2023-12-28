import React from 'react'

import Container from '@/app/ui/container'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
import {Separator} from '@/app/ui/separator'
import {Photo} from '@/types/APIResponseTypes'

interface FavouritesPageProps {
  data: Photo[] | null
}

export default function FavouritesPage({data}: FavouritesPageProps) {
  return (
    <Container>
      <Separator className="my-4" />
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
