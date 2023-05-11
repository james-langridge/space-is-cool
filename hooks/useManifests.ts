import {useQueries} from '@tanstack/react-query'

import {getMissionManifest} from '@/lib/api'
import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

export function useManifests() {
  const manifestQueries = useQueries<PhotoManifest[]>({
    queries: Object.values(RoverName).map(rover => {
      return {
        queryKey: ['manifest', rover],
        queryFn: () => getMissionManifest(rover),
      }
    }),
  })

  return manifestQueries
    .filter(result => result.isSuccess)
    .flatMap(result => result.data as PhotoManifest)
}
