import {MarsPhotosClient, type Photo, type Manifest} from 'mars-photo-sdk'
import type {CameraName, RoverName} from '@/types/APIResponseTypes'

const client = new MarsPhotosClient({
  apiKey: String(process.env.NASA_API_KEY),
  baseUrl: String(process.env.NASA_BASE_URL),
})

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
  const response = await client.photos.get({
    rover: rover.toLowerCase() as Lowercase<RoverName>,
    date,
    camera,
    page: parseInt(page, 10),
  })

  return response
}

export const getMissionManifest = async (
  rover: RoverName,
): Promise<Manifest> => {
  return await client.manifests.get(rover.toLowerCase() as Lowercase<RoverName>)
}

export const getLatestPhotos = async (rover: RoverName): Promise<Photo[]> => {
  return await client.photos.getLatest(
    rover.toLowerCase() as Lowercase<RoverName>,
  )
}
