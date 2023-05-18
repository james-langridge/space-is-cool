'use client'

import {useState} from 'react'
import {useMediaQuery} from 'usehooks-ts'

import ButtonBack from '@/components/ButtonBack'
import ButtonFavourite from '@/components/ButtonFavourite'
import ButtonInfo from '@/components/ButtonInfo'
import ButtonNext from '@/components/ButtonNext'
import ButtonPrev from '@/components/ButtonPrev'
import PhotoSidebar from '@/components/PhotoSidebar'
import PhotoSwipe from '@/components/PhotoSwipe'
import {usePhotoHandler} from '@/hooks'
import {RoverName} from '@/types/APIResponseTypes'

export type Params = {id: string}
export type SearchParams = {
  rover: RoverName
  favourite: string
  latest: string
  search: string
}

type Props = {
  params: Params
  searchParams: SearchParams
}

export default function Page({params, searchParams}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {photo, getNextPhoto, getPrevPhoto} = usePhotoHandler({
    params,
    searchParams,
  })
  const isMobile = useMediaQuery('(max-width: 640px)')

  const toggleSidebar = () => {
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
    <div className="relative h-screen bg-black flex items-center justify-center dark:invert">
      <PhotoSwipe
        getNextPhoto={getNextPhoto}
        getPrevPhoto={getPrevPhoto}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      >
        <ButtonBack />
        <ButtonFavourite
          photo={photo}
          position={isMobile ? 'top-2 right-2' : 'top-2 right-16'}
        />
        {!isMobile && (
          <>
            <ButtonInfo onClick={toggleSidebar} />
            <ButtonPrev onClick={getPrevPhoto} />
            <ButtonNext onClick={getNextPhoto} />
          </>
        )}
        <PhotoSidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          photo={photo}
        />
        <img
          src={photo.img_src}
          alt={String(photo.id)}
          className="max-h-full max-w-full"
        />
      </PhotoSwipe>
    </div>
  )
}
