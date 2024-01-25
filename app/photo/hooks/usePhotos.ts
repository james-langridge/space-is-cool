import {useState} from 'react'

import {PhotoWithDimensions} from '@/app/photo/[id]/page'

type PhotoData = {
  index: number
  photo?: PhotoWithDimensions
}

export function usePhotos({
  photos,
  index,
}: {
  photos: PhotoWithDimensions[]
  index: number
}) {
  const [photo, setPhoto] = useState<PhotoData>({
    index,
    photo: photos[index],
  })

  function getNextPhoto() {
    if (photo.index === photos.length - 1) return

    setPhoto({
      index: photo.index + 1,
      photo: photos[photo.index + 1],
    })
  }

  function getPrevPhoto() {
    if (photo.index === 0) return

    setPhoto({
      index: photo.index - 1,
      photo: photos[photo.index - 1],
    })
  }

  return {photo: photo.photo, getNextPhoto, getPrevPhoto}
}
