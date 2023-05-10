'use client'

import {useQueryClient} from '@tanstack/react-query'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

import {Data, findPhotoById} from '@/lib/misc'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page({
  params,
  searchParams,
}: {
  params: {id: string}
  searchParams: {rover: RoverName}
}) {
  const router = useRouter()
  const {id} = params
  const {rover} = searchParams
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Data>(['photos', rover])
  const photo = findPhotoById(id, data)

  if (!photo) {
    return null
  }

  // The Next.js Image Component requires width and height props,
  // but we don't know them in advance.
  // The fill prop causes the image to fill the parent element instead of setting width and height,
  // but we still need to set the height of the parent element.
  // So using the <img> element here.
  return (
    <div className="relative h-screen bg-black flex items-center justify-center">
      <div className="absolute text-white top-2 left-2">
        <button onClick={() => router.back()}>
          <Image
            src="/back-arrow.svg"
            alt="Back Arrow"
            className="dark:invert"
            width={32}
            height={32}
          />
        </button>
      </div>
      <img
        src={photo.img_src}
        alt={String(photo.id)}
        className="max-h-full max-w-full"
      />
    </div>
  )
}
