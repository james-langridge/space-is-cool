import {useState} from 'react'

import {PhotoWithDimensions} from '@/app/photo/page'

export function useScrollPhotos({
  photos,
  index,
}: {
  photos: PhotoWithDimensions[]
  index: number
}) {
  const [curIndex, setCurIndex] = useState(index)

  function getNextPhoto() {
    if (curIndex === photos.length - 1) return

    setCurIndex(prev => prev + 1)
  }

  function getPrevPhoto() {
    if (curIndex === 0) return

    setCurIndex(prev => prev - 1)
  }

  return {photo: photos[curIndex], getNextPhoto, getPrevPhoto}
}
