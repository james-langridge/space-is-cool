import {BASE_URL} from '@/lib/constants'
import {
  CameraName,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

export const fetcher = async ({url}: {url: string}) => {
  const res = await fetch(url, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}

export const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const {latest_photos} = await fetcher({
    url: `${BASE_URL}/rovers/${rover}/latest_photos`,
  })

  return latest_photos
}

export const getMissionManifest = async (
  rover: RoverName,
): Promise<PhotoManifest> => {
  const {photo_manifest} = await fetcher({
    url: `${BASE_URL}/manifests/${rover}`,
  })

  return photo_manifest
}

export type PhotoDate = {
  type: 'sol' | 'earth_date'
  date: string
}

type SearchParams = {
  rover: RoverName
  date: PhotoDate
  camera?: CameraName
}

export const getPhotos = async (config: SearchParams): Promise<Photo[]> => {
  const {rover, date, ...rest} = config
  const params = new URLSearchParams(rest)
  params.set(date.type, date.date)

  const {photos} = await fetcher({
    url: `${BASE_URL}/rovers/${rover}/photos?${params.toString()}`,
  })

  return photos
}
