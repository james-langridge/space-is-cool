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

/**
 * @typedef {Object} PhotoDate - Represents a date on Mars or Earth.
 * @property {('sol' | 'earth_date')} type - The type of the date ('sol' or 'earth_date').
 * @property {string} date - The date string. For 'sol', it can range from 0 (date of landing) up to the current maximum in the database. For 'earth_date', it should be formatted as 'yyyy-mm-dd'. The earliest date available is the date of landing for each rover.
 */
export type PhotoDate = {
  type: 'sol' | 'earth_date'
  date: string
}

/**
 * @typedef {Object} SearchParams - The search parameters for the /photos endpoint.
 * @property {RoverName} rover - The name of the rover.
 * @property {PhotoDate} date - The date on Mars or Earth.
 * @property {(CameraName | CameraNamePerseverance)} camera - The camera name. Note that different rovers have different cameras: https://github.com/corincerami/mars-photo-api#cameras
 */
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
