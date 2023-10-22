import {useState, useEffect} from 'react'

import {Params, SearchParams} from '@/app/photo/[id]/page'
import {usePhotos} from '@/hooks'
import {Photo} from '@/types/APIResponseTypes'

type Props = {
  params: Params
  searchParams: SearchParams
}

export function usePhotoHandler({params, searchParams}: Props) {
  const [index, setIndex] = useState<number>()
  const [photo, setPhoto] = useState<Photo>()
  const {id} = params
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
