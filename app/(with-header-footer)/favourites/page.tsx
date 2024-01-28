'use client'

import React from 'react'

import {useReadLocalStorage} from '@/app/hooks/useReadLocalStorage'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
import {Photo} from '@/types/APIResponseTypes'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<Photo[]>('favourites')

  if (!favourites) {
    return null
  }

  return (
    <PhotoGrid>
      {favourites.map(photo => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          searchParams={{id: photo.id}}
        />
      ))}
    </PhotoGrid>
  )
}
