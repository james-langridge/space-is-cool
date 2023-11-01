'use client'

import React from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import FavouritesPage from '@/app/(with-header-footer)/favourites/ui/FavouritesPage'
import {Photo} from '@/types/APIResponseTypes'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<Photo[]>('favourites')

  return <FavouritesPage data={favourites} />
}
