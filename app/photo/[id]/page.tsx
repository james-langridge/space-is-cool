import fetch from 'node-fetch'
import sharp from 'sharp'

import {getLatestPhotos, getPhotos} from '@/app/lib/api'
import PhotoPage from '@/app/photo/ui/PhotoPage'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  rover: RoverName
  date: string
  camera?: CameraName
  page: string
  type?: 'favourite' | 'latest'
}

export type PhotoWithDimensions = Photo & {
  dimensions: {
    height?: number
    width?: number
  }
}

const loadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)

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
    console.error(err)
    throw err
  }
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
  // Fetch the photos on the server and pass them to the client component
  // Favourites are persisted in local storage so must be fetched on the client
  // Searches by date with getPhotos() are already cached from the search
  // Searches for getLatestPhotos() are never cached
  const photos =
    type === 'latest'
      ? await getLatestPhotos(rover)
      : type === 'favourite'
      ? []
      : await getPhotos({rover, date, camera, page})
  const photoIdx = photos.findIndex(photo => photo.id === +id)

  const photosWithDimensions: PhotoWithDimensions[] = []

  for (const photo of photos) {
    const clone = {...photo}
    const dimensions = await loadImage(photo.img_src)
    if (!dimensions.width || !dimensions.height) {
      throw new Error('No image dimension!')
    }
    photosWithDimensions.push({...clone, dimensions})
  }

  return (
    <PhotoPage
      photos={photosWithDimensions}
      photoIdx={photoIdx}
      id={id}
      searchParams={searchParams}
    />
  )
}
