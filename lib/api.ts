import axios from 'axios'

import {BASE_URL} from '@/lib/constants'
import {
  CameraName,
  CameraNamePerseverance,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

export const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const {data} = await axios.get(`${BASE_URL}/rovers/${rover}/latest_photos`)

  return data.latest_photos
}

export const getMissionManifest = async (
  rover: RoverName,
): Promise<PhotoManifest> => {
  const {data} = await axios.get(`${BASE_URL}/manifests/${rover}`)

  return data.photo_manifest
}

export type PhotoDate = {
  type: 'sol' | 'earth_date'
  date: string
}

type SearchParams = {
  rover: RoverName
  date: PhotoDate
  camera?: CameraName | CameraNamePerseverance
}

export const getPhotos = async (config: SearchParams): Promise<Photo[]> => {
  const {rover, date, ...rest} = config
  const params = new URLSearchParams(rest)
  params.set(date.type, date.date)

  const {data} = await axios.get(
    `${BASE_URL}/rovers/${rover}/photos?${params.toString()}`,
  )

  return data.photos
}
