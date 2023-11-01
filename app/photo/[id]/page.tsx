import {getLatestPhotos, getPhotos} from '@/app/lib/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/photo/ui/Card'
import PhotoPage from '@/app/photo/ui/PhotoPage'
import RevalidateBtn from '@/app/photo/ui/RevalidateBtn'
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

  if (type === 'latest' && photoIdx === -1) {
    // Cache has been revalidated so this page is out of sync with /search/[rover]
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Photos updated!</CardTitle>
            <CardDescription>New latest photos are available.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please click below to reload.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <RevalidateBtn rover={rover}>Reload</RevalidateBtn>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <PhotoPage
      photos={photos}
      photoIdx={photoIdx}
      id={id}
      searchParams={searchParams}
    />
  )
}
