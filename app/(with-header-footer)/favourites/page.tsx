'use client'

import React from 'react'

import {useReadLocalStorage} from '@/app/hooks/useReadLocalStorage'
import PhotoThumbnail from '@/app/ui/photo-thumbnail'
import PhotoGrid from '@/app/ui/PhotoGrid'
import type {Photo} from 'mars-photo-sdk'

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
          searchParams={{id: String(photo.id)}}
        />
      ))}
    </PhotoGrid>
  )
}
