// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/AlertDialog'
import revalidate from '@/app/actions'
import PhotoPage from '@/components/pages/photo/PhotoPage'
import {getLatestPhotos, getPhotos} from '@/lib/api'
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
    // Add a button to go back and explain why (when npm install is working again)
    // return (
    //   <AlertDialog>
    //     <AlertDialogTrigger>Open</AlertDialogTrigger>
    //     <AlertDialogContent>
    //       <AlertDialogHeader>
    //         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //         <AlertDialogDescription>
    //           This action cannot be undone. This will permanently delete your
    //           account and remove your data from our servers.
    //         </AlertDialogDescription>
    //       </AlertDialogHeader>
    //       <AlertDialogFooter>
    //         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //         <AlertDialogAction>Continue</AlertDialogAction>
    //       </AlertDialogFooter>
    //     </AlertDialogContent>
    //   </AlertDialog>
    // )
    await revalidate(rover)
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
