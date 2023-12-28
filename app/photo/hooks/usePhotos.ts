import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {useReadLocalStorage} from '@/app/hooks/useReadLocalStorage'
import {SearchParams} from '@/app/photo/[id]/page'
import {Photo} from '@/types/APIResponseTypes'

export function usePhotos({
  id,
  initialPhotos,
  photoIdx,
  searchParams,
}: {
  id: string
  initialPhotos: Photo[]
  photoIdx: number
  searchParams: SearchParams
}) {
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const isFavouritePhoto = photoIdx === -1
  const favourites = useReadLocalStorage<Photo[]>(
    'favourites',
    isFavouritePhoto,
  ) as Photo[]
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
    router.replace(`/photo/${newPhoto.id}?${params.toString()}`)
  }

  function getPrevPhoto() {
    if (index === 0) {
      return
    }

    const newIndex = index - 1

    setIndex(newIndex)

    const newPhoto = !photos.length ? favourites[newIndex] : photos[newIndex]
    setPhoto(newPhoto)
    router.replace(`/photo/${newPhoto.id}?${params.toString()}`)
  }

  return {photo, getNextPhoto, getPrevPhoto}
}
