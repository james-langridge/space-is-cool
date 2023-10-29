import PhotoPage from '@/components/pages/photo/PhotoPage'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  rover: RoverName
  date: string
  camera?: CameraName
  page: string
  id: string
  type?: 'favourite' | 'latest'
}

const getPhotos = async (
  rover: RoverName,
  date: string,
  camera?: CameraName,
  page = '1',
): Promise<Photo[]> => {
  const params = new URLSearchParams()
  const sol = /^\d+$/

  params.set('api_key', String(process.env.NASA_API_KEY))

  if (sol.test(date)) {
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

  const {photos} = await res.json()

  return photos
}

const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  const params = new URLSearchParams()
  params.set('api_key', String(process.env.NASA_API_KEY))

  // Fetch the resource from the remote server on every request without looking in the cache,
  // and don't update the cache with the downloaded resource.
  // Otherwise cache gets out of sync with /search[rover].
  // https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
  const res = await fetch(
    `${
      process.env.NASA_BASE_URL
    }/rovers/${rover}/latest_photos?${params.toString()}`,
    {cache: 'no-store'},
  )

  const {latest_photos} = await res.json()

  return latest_photos
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {id: string}
  searchParams: SearchParams
}) {
  const {rover, page, date, camera, type} = searchParams
  const {id} = params
  console.log({searchParams})
  console.log({id}, typeof id)
  const photos =
    type === 'latest'
      ? await getLatestPhotos(rover)
      : type === 'favourite'
      ? []
      : await getPhotos(rover, date, camera, page)
  const photoIdx = photos.findIndex(photo => photo.id === +id)

  return <PhotoPage photos={photos} photoIdx={photoIdx} id={id} />
}
