'use client'

import {useState} from 'react'
import {useMediaQuery} from 'usehooks-ts'

import ButtonBack from '@/components/pages/photo/ButtonBack'
import ButtonInfo from '@/components/pages/photo/ButtonInfo'
import ButtonNext from '@/components/pages/photo/ButtonNext'
import ButtonPrev from '@/components/pages/photo/ButtonPrev'
import ButtonFavourite from '@/components/shared/ButtonFavourite'
import {usePhotos} from '@/hooks'
import {Photo} from '@/types/APIResponseTypes'

export default function PhotoPage({
  id,
  photos,
  photoIdx,
}: {
  id: string
  photos: Photo[]
  photoIdx: number
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {photo, getNextPhoto, getPrevPhoto} = usePhotos({
    id,
    initialPhotos: photos,
    photoIdx,
  })
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (!photo) {
    return <div>Error reading photo.</div>
  }

  // The Next.js Image Component requires width and height props,
  // but we don't know them in advance.
  // The fill prop causes the image to fill the parent element instead of setting width and height,
  // but we still need to set the height of the parent element.
  // So using the <img> element here.
  return (
    <div className="relative flex h-screen items-center justify-center bg-black dark:invert">
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
      <img
        src={photo.img_src}
        alt={String(photo.id)}
        className="max-h-full max-w-full"
      />
    </div>
  )
}
