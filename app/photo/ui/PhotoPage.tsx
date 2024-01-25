'use client'

// Named NextImage to avoid conflict with new Image()
import NextImage from 'next/image'
import {useState} from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {PhotoWithDimensions} from '@/app/photo/[id]/page'
import {usePhotos} from '@/app/photo/hooks/usePhotos'
import ButtonBack from '@/app/photo/ui/ButtonBack'
import ButtonInfo from '@/app/photo/ui/ButtonInfo'
import ButtonNext from '@/app/photo/ui/ButtonNext'
import ButtonPrev from '@/app/photo/ui/ButtonPrev'
import PhotoSidebar from '@/app/photo/ui/PhotoSidebar'
import ButtonFavourite from '@/app/ui/ButtonFavourite'

import PhotoSwipe from './PhotoSwipe'

export default function PhotoPage({
  id,
  photos,
  photoIdx,
}: {
  id: string
  photos: PhotoWithDimensions[]
  photoIdx: number
}) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {photo, getNextPhoto, getPrevPhoto} = usePhotos({
    id,
    initialPhotos: photos,
    photoIdx,
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!photo) {
    return <div>Error reading photo.</div>
  }

  if (isMobile) {
    return (
      <PhotoSwipe
        getNextPhoto={getNextPhoto}
        getPrevPhoto={getPrevPhoto}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      >
        <div className="relative flex h-screen items-center justify-center bg-black dark:invert">
          <ButtonBack />
          <ButtonFavourite photo={photo} position="top-2 right-2" />
          <PhotoSidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            photo={photo}
          />
          <NextImage
            src={photo.img_src}
            alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
              photo.rover.name
            } on sol ${photo.sol}.`}
            width={photo.dimensions.width}
            height={photo.dimensions.height}
            quality={100}
            priority={true}
          />
        </div>
      </PhotoSwipe>
    )
  }

  return (
    <div className="relative flex h-screen items-center justify-center bg-black dark:invert">
      <ButtonBack />
      <ButtonFavourite photo={photo} position="top-2 right-16" />
      <ButtonInfo onClick={toggleSidebar} />
      <ButtonPrev onClick={getPrevPhoto} />
      <ButtonNext onClick={getNextPhoto} />
      <PhotoSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        photo={photo}
      />
      <NextImage
        src={photo.img_src}
        alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
          photo.rover.name
        } on sol ${photo.sol}.`}
        width={photo.dimensions.width}
        height={photo.dimensions.height}
        quality={100}
        priority={true}
      />
    </div>
  )
}
