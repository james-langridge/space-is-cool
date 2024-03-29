'use client'

import Image from 'next/image'
import React, {useState} from 'react'
import {useLocalStorage} from 'usehooks-ts'

import {Photo} from '@/types/APIResponseTypes'

export default function ButtonFavourite({
  photo,
  position,
}: {
  photo: Photo
  position: string
}) {
  const [favourites, setFavourites] = useLocalStorage<Photo[]>('favourites', [])
  const id = photo.id
  const [isFavourite, setIsFavourite] = useState(
    isFavouritePhoto(favourites, id),
  )

  function toggleFavourite(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation()

    if (isFavourite) {
      const index = favourites.findIndex(photo => photo.id === id)

      if (index !== -1) {
        const newFavourites = [...favourites]
        newFavourites.splice(index, 1)
        setFavourites(newFavourites)
      }
    }

    if (!isFavourite) {
      setFavourites([...favourites, photo])
    }

    setIsFavourite(!isFavourite)
  }

  return (
    <button
      onKeyDown={toggleFavourite}
      onClick={toggleFavourite}
      title="Favourite"
      className={'absolute z-10 p-4 ' + position}
    >
      {isFavourite ? (
        <Image src="/star-fill.svg" alt="Favourite" width={24} height={24} />
      ) : (
        <Image src="/star.svg" alt="Favourite" width={24} height={24} />
      )}
    </button>
  )
}

function isFavouritePhoto(favourites: Photo[], id: string) {
  return favourites.some(photo => photo.id === id)
}
