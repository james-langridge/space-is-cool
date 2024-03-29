import {isSolDate} from '@/app/(with-header-footer)/search/utils/date'
import {
  CameraName,
  Photo,
  PhotoManifest,
  RoverName,
} from '@/types/APIResponseTypes'

export const getPhotos = async ({
  rover,
  date,
  camera,
  page = '1',
}: {
  rover: RoverName
  date: string
  camera?: CameraName
  page: string
}): Promise<Photo[]> => {
  const params = new URLSearchParams()

  params.set('api_key', String(process.env.NASA_API_KEY))

  if (isSolDate(date)) {
    params.set('sol', date)
  } else {
    params.set('earth_date', date)
  }

  if (camera) {
    params.set('camera', camera)
  }
  params.set('page', String(page))

  const res = await fetch(
    `${process.env.NASA_BASE_URL}/rovers/${rover}/photos?${params.toString()}`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const {photos} = await res.json()

  return photos
}

export const getMissionManifest = async (
  rover: RoverName,
): Promise<PhotoManifest> => {
  const res = await fetch(
    `${process.env.NASA_BASE_URL}/manifests/${rover}?api_key=${String(
      process.env.NASA_API_KEY,
    )}`,
    {cache: 'no-store'},
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const {photo_manifest} = await res.json()

  return photo_manifest
}

export const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const params = new URLSearchParams()
  params.set('api_key', String(process.env.NASA_API_KEY))

  const res = await fetch(
    `${
      process.env.NASA_BASE_URL
    }/rovers/${rover}/latest_photos?${params.toString()}`,
    {cache: 'no-store'},
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const {latest_photos} = await res.json()

  return latest_photos
}
