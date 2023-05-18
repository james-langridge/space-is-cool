import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import {SearchParams} from '@/app/photo/[id]/page'
import {useForm} from '@/app/providers'
import {getLatestPhotos, PhotoWithPage} from '@/lib/api'
import {Data} from '@/lib/photo'
import {Photo} from '@/types/APIResponseTypes'

export function usePhotos({searchParams}: {searchParams: SearchParams}) {
  const form = useForm()
  const {rover, favourite, latest, search} = searchParams
  const favourites = useReadLocalStorage<PhotoWithPage[]>(
    'favourites',
  ) as PhotoWithPage[]

  const queryClient = useQueryClient()

  const searchData = queryClient.getQueryData<Data>([
    'photos',
    JSON.stringify(form.submittedForm),
  ])

  const {data: latestPhotos} = useQuery({
    queryKey: ['photos', rover],
    queryFn: () => getLatestPhotos(rover),
  })

  const [photos, setPhotos] = useState<(Photo | PhotoWithPage)[] | undefined>(
    () =>
      favourite === 'true'
        ? favourites
        : search === 'true'
        ? searchData?.pages.flat()
        : latestPhotos,
  )

  useEffect(() => {
    if (latest !== 'true') {
      return
    }

    setPhotos(latestPhotos)
  }, [latest, latestPhotos])

  return {photos}
}
