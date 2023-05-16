import {useQueryClient} from '@tanstack/react-query'
import {useState, useEffect} from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import {PhotoWithPage} from '@/lib/api'
import {Data} from '@/lib/photo'
import {RoverName} from '@/types/APIResponseTypes'

type SearchParams = {rover: RoverName; favourite: string; search: string}

type Props = {
  id: string
  searchParams: SearchParams
}

export function usePhotoHandler({id, searchParams}: Props) {
  const form = useForm()
  const {rover, favourite, search} = searchParams
  const favourites = useReadLocalStorage<PhotoWithPage[]>(
    'favourites',
  ) as PhotoWithPage[]
  const queryClient = useQueryClient()
  const queryKey =
    search === 'true'
      ? ['photos', JSON.stringify(form.submittedForm)]
      : ['photos', rover]
  const queryData = queryClient.getQueryData<Data>(queryKey)
  const [index, setIndex] = useState<number>()
  const [photo, setPhoto] = useState<PhotoWithPage>()
  const [photos] = useState<PhotoWithPage[] | undefined>(() =>
    favourite === 'true' ? favourites : queryData?.pages.flat(),
  )

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
