import axios from 'axios'

import {
  CameraName,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

export type PhotoWithPage = Photo & {page: number}

const fetcher = async ({
  url,
  method,
  body,
  json = true,
  cache,
}: {
  url: string
  method: string
  body?: {[key: string]: string}
  json?: boolean
  cache?: 'force-cache' | 'no-store'
}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: cache && cache,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  if (json) {
    return data
  }
}

export const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const params = new URLSearchParams()
  params.set('api_key', String(process.env.NEXT_PUBLIC_API_KEY))

  const {latest_photos} = await fetcher({
    url: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/rovers/${rover}/latest_photos?${params.toString()}`,
    method: 'get',
  })

  return latest_photos
}

export const getMissionManifest = async (
  rover?: RoverName,
): Promise<PhotoManifest> => {
  const {photo_manifest} = await fetcher({
    url: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/manifests/${rover}?api_key=${String(process.env.NEXT_PUBLIC_API_KEY)}`,
    method: 'get',
  })

  return photo_manifest
}

/**
 * The search parameters for the /photos endpoint.
 */
export type GetPhotosSearchParams = {
  /** The rover's name */
  rover: RoverName

  /** The type of the date: 'sol' or 'earth_date' */
  dateType: 'sol' | 'earth_date'

  /**
   * The Martian rotation or day on which the photo was taken, counting up from the rover's landing date.
   * A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000.
   * This is required if dateType === 'sol'.
   */
  sol?: number | ''

  /** The Earth date on which the photo was taken. This is required if dateType === 'earth_date'. */
  earth_date?: string

  /**
   * The camera name. Note that different rovers have different cameras: https://github.com/corincerami/mars-photo-api#cameras
   * This is optional.
   */
  camera?: CameraName | ''

  /**
   * The default response returns all photos. The page parameter can be specified and returns 25 photos per page.
   * This is optional.
   */
  page?: number
}

export const getPhotos = async (
  config: GetPhotosSearchParams,
): Promise<PhotoWithPage[]> => {
  const {rover, camera, page, dateType, sol, earth_date, ...rest} = config
  const params = new URLSearchParams(rest)

  params.delete('submittedForm')

  if (page !== undefined) {
    params.set('page', page.toString())
  }
  if (camera) {
    params.set('camera', camera)
  }
  if (dateType === 'sol' && sol) {
    params.set(dateType, sol.toString())
  }
  if (dateType === 'earth_date' && earth_date) {
    params.set(dateType, earth_date)
  }
  params.set('api_key', String(process.env.NEXT_PUBLIC_API_KEY))
  const {data} = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/rovers/${rover}/photos?${params.toString()}`,
  )

  return data.photos.map((photo: Photo) => ({
    ...photo,
    page: config.page,
  }))
}
