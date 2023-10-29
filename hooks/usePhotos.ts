import {useState} from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import {Photo} from '@/types/APIResponseTypes'

export function usePhotos({
  id,
  initialPhotos,
  photoIdx,
}: {
  id: string
  initialPhotos: Photo[]
  photoIdx: number
}) {
  const isFavouritePhoto = photoIdx === -1
  const favourites = useReadLocalStorage<Photo[]>('favourites') as Photo[]
  const photos = isFavouritePhoto ? favourites : initialPhotos
  const [index, setIndex] = useState<number>(initialiseIndex)
  const [photo, setPhoto] = useState<Photo>(initialisePhoto)

  function initialiseIndex() {
    if (isFavouritePhoto) {
      return favourites.findIndex(photo => photo.id === +id)
    }

    return photoIdx
  }

  function initialisePhoto() {
    if (isFavouritePhoto) {
      const idx = favourites.findIndex(photo => photo.id === +id)

      return favourites[idx]
    }

    return photos[photoIdx]
  }

  function getNextPhoto() {
    if (index === photos.length - 1) {
      return
    }

    const newIndex = index + 1

    setIndex(newIndex)

    const newPhoto = isFavouritePhoto ? favourites[newIndex] : photos[newIndex]
    setPhoto(newPhoto)
  }

  function getPrevPhoto() {
    if (index === 0) {
      return
    }

    const newIndex = index - 1

    setIndex(newIndex)

    const newPhoto = !photos.length ? favourites[newIndex] : photos[newIndex]
    setPhoto(newPhoto)
  }

  return {photo, getNextPhoto, getPrevPhoto}
}
