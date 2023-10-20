'use client'

import React from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import FavouritesPage from '@/components/pages/favourites/FavouritesPage'
import {PhotoWithPage} from '@/lib/api'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<PhotoWithPage[]>('favourites')

  return <FavouritesPage data={favourites} />
}
