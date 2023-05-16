import {useState, useEffect} from 'react'

import {usePhotos} from '@/hooks'
import {PhotoWithPage} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

type SearchParams = {rover: RoverName; favourite: string; search: string}

type Props = {
  id: string
  searchParams: SearchParams
}

export function usePhotoHandler({id, searchParams}: Props) {
  const [index, setIndex] = useState<number>()
  const [photo, setPhoto] = useState<PhotoWithPage>()
  const {photos} = usePhotos({searchParams})

  useEffect(() => {
    const index = photos?.findIndex(photo => photo.id === Number(id))

    setIndex(index)

    if (index === undefined || !photos) {
      return
    }

    setPhoto(photos[index])
  }, [id, photos])

  function getNextPhoto() {
    if (index === undefined || !photos || index === photos.length - 1) {
      return
    }

    const newIndex = index + 1

    setIndex(newIndex)
    setPhoto(photos[newIndex])
  }

  function getPrevPhoto() {
    if (index === undefined || !photos || index === 0) {
      return
    }

    const newIndex = index - 1

    setIndex(newIndex)
    setPhoto(photos[newIndex])
  }

  return {photo, getNextPhoto, getPrevPhoto}
}
