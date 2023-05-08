import {useCallback, useEffect, useState} from 'react'

import {getPhotos, PhotoDate} from '@/lib/api'
import {Photo, RoverName} from '@/types/APIResponseTypes'

export default function useGetPhotos({
  n = 10,
  rover,
  date,
}: {
  n?: number
  rover: RoverName
  date: PhotoDate
}) {
  const [photos, setPhotos] = useState<Photo[]>()

  const fetchPhotos = useCallback(async () => {
    const rover_photos = await getPhotos({
      rover,
      date,
    })

    setPhotos(rover_photos)
  }, [date, rover])

  useEffect(() => {
    void fetchPhotos()
  }, [])

  return photos?.slice(0, n)
}
