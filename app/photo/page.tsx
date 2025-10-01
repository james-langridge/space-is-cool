import fetch from 'node-fetch'
import sharp from 'sharp'

import {getLatestPhotos, getPhotos} from '@/app/lib/api'
import PhotoPage from '@/app/photo/ui/PhotoPage'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  id: string
  rover: RoverName
  date?: string
  camera?: CameraName
  page: string
}

export type PhotoWithDimensions = Photo & {
  dimensions: {
    height?: number
    width?: number
  }
}

const loadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`)

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const metadata = await sharp(buffer).metadata()

    return {
      height: metadata.height,
      width: metadata.width,
    }
  } catch (err) {
    console.error(`Failed to load image ${imageUrl}:`, err)
    return {
      height: undefined,
      width: undefined,
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {id, rover, page, date, camera} = searchParams
  const isLatestPhoto = date === undefined
  // Fetch the photos on the server and pass them to the client component
  // Searches by date with getPhotos() are already cached from the search
  // Searches for getLatestPhotos() are never cached and must be re-fetched
  const photos = isLatestPhoto
    ? await getLatestPhotos(rover)
    : await getPhotos({rover, date, camera, page})
  const photoIdx = photos.findIndex(photo => String(photo.id) === id)

  const photosWithDimensions = await Promise.all(
    (photos as PhotoWithDimensions[]).map(async photo => {
      photo.dimensions = await loadImage(photo.img_src)

      return photo
    }),
  )

  return <PhotoPage photos={photosWithDimensions} index={photoIdx} />
}
