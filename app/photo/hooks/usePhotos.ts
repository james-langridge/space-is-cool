import {useState} from 'react'

import {useReadLocalStorage} from '@/app/hooks/useReadLocalStorage'
import {PhotoWithDimensions} from '@/app/photo/[id]/page'

type PhotoData = {
  index: number
  photo?: PhotoWithDimensions
}

export function usePhotos({
  id,
  initialPhotos,
  photoIdx,
}: {
  id: string
  initialPhotos: PhotoWithDimensions[]
  photoIdx: number
}) {
  const isFavouritePhoto = photoIdx === -1
  const favourites = useReadLocalStorage<PhotoWithDimensions[]>(
    'favourites',
    isFavouritePhoto,
  ) as PhotoWithDimensions[]
  const photos = isFavouritePhoto ? favourites : initialPhotos
  const [photo, setPhoto] = useState<PhotoData>({
    index: isFavouritePhoto
      ? favourites.findIndex(photo => photo.id === +id)
      : photoIdx,
    photo: isFavouritePhoto
      ? favourites.find(photo => photo.id === +id)
      : photos[photoIdx],
  })

  function getNextPhoto() {
    if (photo.index === photos.length - 1) {
      return
    }

    const newIndex = photo.index + 1
    const newPhoto = isFavouritePhoto ? favourites[newIndex] : photos[newIndex]
    setPhoto({
      index: newIndex,
      photo: newPhoto,
    })
  }

  function getPrevPhoto() {
    if (photo.index === 0) {
      return
    }

    const newIndex = photo.index - 1
    const newPhoto = !photos.length ? favourites[newIndex] : photos[newIndex]
    setPhoto({
      index: newIndex,
      photo: newPhoto,
    })
  }

  return {photo: photo.photo, getNextPhoto, getPrevPhoto}
}
