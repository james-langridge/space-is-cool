import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {useReadLocalStorage} from '@/app/hooks/useReadLocalStorage'
import {PhotoWithDimensions, SearchParams} from '@/app/photo/[id]/page'

type PhotoData = {
  index: number
  photo?: PhotoWithDimensions
}

export function usePhotos({
  id,
  initialPhotos,
  photoIdx,
  searchParams,
}: {
  id: string
  initialPhotos: PhotoWithDimensions[]
  photoIdx: number
  searchParams: SearchParams
}) {
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
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

    router.replace(`/photo/${newPhoto.id}?${params.toString()}`)
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

    router.replace(`/photo/${newPhoto.id}?${params.toString()}`)
  }

  return {photo: photo.photo, getNextPhoto, getPrevPhoto}
}
