import {useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import {PhotoWithPage} from '@/lib/api'
import {Data} from '@/lib/photo'
import {RoverName} from '@/types/APIResponseTypes'

type SearchParams = {rover: RoverName; favourite: string; search: string}

export function usePhotos({searchParams}: {searchParams: SearchParams}) {
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

  const [photos] = useState<PhotoWithPage[] | undefined>(() =>
    favourite === 'true' ? favourites : queryData?.pages.flat(),
  )

  return {photos}
}