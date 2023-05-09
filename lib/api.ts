import axios from 'axios'

import {
  CameraName,
  CameraNamePerseverance,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

type PhotoWithPage = Photo & {page: number}

export const getLatestPhotos = async (
  rover: RoverName,
  pageParam: number,
): Promise<PhotoWithPage[]> => {
  const params = new URLSearchParams()
  params.set('page', pageParam.toString())
  params.set('api_key', String(process.env.NEXT_PUBLIC_API_KEY))

  const {data} = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/rovers/${rover}/latest_photos?${params.toString()}`,
  )

  return data.latest_photos.map((photo: Photo) => ({
    ...photo,
    page: pageParam,
  }))
}

export const getMissionManifest = async (
  rover: RoverName,
): Promise<PhotoManifest> => {
  const {data} = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/manifests/${rover}?api_key=${String(
      process.env.NEXT_PUBLIC_API_KEY,
    )}`,
  )

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
 * @typedef {Object} GetPhotosSearchParams - The search parameters for the /photos endpoint.
 * @property {RoverName} rover - The name of the rover.
 * @property {PhotoDate} date - The date on Mars or Earth.
 * @property {(CameraName | CameraNamePerseverance)} camera - The camera name. Note that different rovers have different cameras: https://github.com/corincerami/mars-photo-api#cameras
 * @property {string} page - The default response returns all photos. The page parameter can be specified and returns 25 photos per page.
 */
type GetPhotosSearchParams = {
  rover: RoverName
  date: PhotoDate
  camera?: CameraName | CameraNamePerseverance
  page?: string
}

export const getPhotos = async (
  config: GetPhotosSearchParams,
): Promise<Photo[]> => {
  const {rover, date, ...rest} = config
  const params = new URLSearchParams(rest)
  params.set('api_key', String(process.env.NEXT_PUBLIC_API_KEY))
  params.set(date.type, date.date)

  const {data} = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/rovers/${rover}/photos?${params.toString()}`,
  )

  return data.photos
}
