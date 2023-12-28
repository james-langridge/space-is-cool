import {getLatestPhotos, getPhotos} from '@/app/lib/api'
import PhotoPage from '@/app/photo/ui/PhotoPage'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  rover: RoverName
  date: string
  camera?: CameraName
  page: string
  type?: 'favourite' | 'latest'
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
  const photos =
    type === 'latest'
      ? await getLatestPhotos(rover)
      : type === 'favourite'
      ? []
      : await getPhotos({rover, date, camera, page})
  const photoIdx = photos.findIndex(photo => photo.id === +id)

  return (
    <PhotoPage
      photos={photos}
      photoIdx={photoIdx}
      id={id}
      searchParams={searchParams}
    />
  )
}
