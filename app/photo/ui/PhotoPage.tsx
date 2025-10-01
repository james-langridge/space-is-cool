'use client'

import Image from 'next/image'
import {useState} from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {useScrollPhotos} from '@/app/photo/hooks/useScrollPhotos'
import {PhotoWithDimensions} from '@/app/photo/page'
import ButtonBack from '@/app/photo/ui/ButtonBack'
import ButtonInfo from '@/app/photo/ui/ButtonInfo'
import ButtonNext from '@/app/photo/ui/ButtonNext'
import ButtonPrev from '@/app/photo/ui/ButtonPrev'
import PhotoSidebar from '@/app/photo/ui/PhotoSidebar'
import ButtonFavourite from '@/app/ui/ButtonFavourite'

import PhotoSwipe from './PhotoSwipe'

export default function PhotoPage({
  photos,
  index,
}: {
  photos: PhotoWithDimensions[]
  index: number
}) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {photo, getNextPhoto, getPrevPhoto} = useScrollPhotos({
    photos,
    index,
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!photo) {
    return <div>Error reading photo.</div>
  }

  const {dimensions} = photo

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
          <Image
            src={photo.img_src || photo.imgSrc || ''}
            alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
              photo.rover.name
            } on sol ${photo.sol}.`}
            width={dimensions.width}
            height={dimensions.height}
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
      <Image
        src={photo.img_src || photo.imgSrc || ''}
        alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
          photo.rover.name
        } on sol ${photo.sol}.`}
        width={dimensions.width}
        height={dimensions.height}
        quality={100}
        priority={true}
      />
    </div>
  )
}
