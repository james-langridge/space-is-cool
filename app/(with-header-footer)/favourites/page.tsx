'use client'

import React from 'react'

import FavouritesPage from '@/app/(with-header-footer)/favourites/ui/FavouritesPage'
import {useReadLocalStorage} from '@/app/photo/hooks/useReadLocalStorage'
import {Photo} from '@/types/APIResponseTypes'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<Photo[]>('favourites')

  return <FavouritesPage data={favourites} />
}
