import {
  CameraName,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

export type PhotoWithPage = Photo & {page: number}

export const getMissionManifest = async (
  rover?: RoverName,
): Promise<PhotoManifest | null> => {
  if (!rover) {
    return null
  }

  const res = await fetch(`/api/manifests/${rover}`)
  const {data} = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data.photo_manifest
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

  const res = await fetch(`/api/photos/${rover}?${params.toString()}`)

  const {data} = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}
