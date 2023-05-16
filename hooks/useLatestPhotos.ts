import {useInfiniteQuery} from '@tanstack/react-query'

import {getLatestPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export function useLatestPhotos(rover: RoverName) {
  return useInfiniteQuery({
    queryKey: ['photos', rover],
    queryFn: ({pageParam = 0}) => getLatestPhotos(rover, pageParam),
    getNextPageParam: lastPage => {
      return lastPage.length === 25 ? lastPage[0].page + 1 : undefined
    },
  })
}
