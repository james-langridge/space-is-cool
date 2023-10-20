'use client'

import React from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import PhotoGrid from '@/components/shared/PhotoGrid'
import PhotoThumbnail from '@/components/shared/PhotoThumbnail'
import {PhotoWithPage} from '@/lib/api'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<PhotoWithPage[]>('favourites')

  return (
    <Container>
      <Header string="Favourite Photos" />
      <PhotoGrid>
        {favourites &&
          favourites.map(photo => (
            <PhotoThumbnail key={photo.id} photo={photo} mode="favourite" />
          ))}
      </PhotoGrid>
    </Container>
  )
}
