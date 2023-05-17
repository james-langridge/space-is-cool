'use client'

import React from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import Container from '@/components/Container'
import Header from '@/components/Header'
import PhotoGrid from '@/components/PhotoGrid'
import PhotoThumbnail from '@/components/PhotoThumbnail'
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
