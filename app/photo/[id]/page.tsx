'use client'

import {useQueryClient} from '@tanstack/react-query'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import FavouriteButton from '@/components/FavouriteButton'
import Sidebar from '@/components/Sidebar'
import {Data, findPhotoById} from '@/lib/misc'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page({
  params,
  searchParams,
}: {
  params: {id: string}
  searchParams: {rover: RoverName}
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const {id} = params
  const {rover} = searchParams
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Data>(['photos', rover])
  const photo = findPhotoById(id, data)

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

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
      <button
        title="Back"
        className="absolute top-2 left-2"
        onClick={() => router.back()}
      >
        <Image src="/arrow-left-short.svg" alt="Back" width={58} height={58} />
      </button>
      <FavouriteButton photo={photo} position="top-2 right-16" />
      <button
        title="Info"
        className="p-4 absolute top-2 right-2"
        onClick={handleToggleSidebar}
      >
        <Image src="/info-circle.svg" alt="Info" width={32} height={32} />
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleToggleSidebar}
        photo={photo}
      />
      <img
        src={photo.img_src}
        alt={String(photo.id)}
        className="max-h-full max-w-full"
      />
    </div>
  )
}
