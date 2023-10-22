'use client'

import {useState} from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {Params, SearchParams} from '@/app/photo/[id]/page'
import ButtonBack from '@/components/pages/photo/ButtonBack'
import ButtonInfo from '@/components/pages/photo/ButtonInfo'
import ButtonNext from '@/components/pages/photo/ButtonNext'
import ButtonPrev from '@/components/pages/photo/ButtonPrev'
import PhotoSidebar from '@/components/pages/photo/PhotoSidebar'
import PhotoSwipe from '@/components/pages/photo/PhotoSwipe'
import ButtonFavourite from '@/components/shared/ButtonFavourite'
import {usePhotoHandler} from '@/hooks'

type PhotoPageProps = {
  data: {params: Params; searchParams: SearchParams}
}

export default function PhotoPage({data}: PhotoPageProps) {
  const {params, searchParams} = data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // TODO: rethink usePhotohandler() and usePhotos() and how to do PhotoPage()
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
    <div className="relative flex h-screen items-center justify-center bg-black dark:invert">
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
