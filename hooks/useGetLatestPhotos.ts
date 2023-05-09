import {useEffect, useState} from 'react'

import {getLatestPhotos} from '@/lib/api'
import {Photo, RoverName} from '@/types/APIResponseTypes'

export function useGetLatestPhotos(n = 10) {
  const [photos, setPhotos] = useState<Photo[]>()

  const getPhotos = async () => {
    const latest_photos = await getLatestPhotos(RoverName.Curiosity)

    setPhotos(latest_photos)
  }

  useEffect(() => {
    void getPhotos()
  }, [])

  return photos?.slice(0, n)
}
