'use client'

// Named NextImage to avoid conflict with new Image()
import NextImage from 'next/image'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useMediaQuery, useReadLocalStorage} from 'usehooks-ts'

import {PhotoWithDimensions} from '@/app/photo/[id]/page'
import {useScrollPhotos} from '@/app/photo/hooks/useScrollPhotos'
import ButtonBack from '@/app/photo/ui/ButtonBack'
import ButtonInfo from '@/app/photo/ui/ButtonInfo'
import ButtonNext from '@/app/photo/ui/ButtonNext'
import ButtonPrev from '@/app/photo/ui/ButtonPrev'
import PhotoSidebar from '@/app/photo/ui/PhotoSidebar'
import PhotoSwipe from '@/app/photo/ui/PhotoSwipe'
import ButtonFavourite from '@/app/ui/ButtonFavourite'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  id: string
  rover?: RoverName
  date?: string
  camera?: CameraName
  page?: string
  type?: 'favourite' | 'latest'
}

const loadImage = (
  setImageDimensions: Dispatch<
    SetStateAction<{height: number; width: number} | undefined>
  >,
  imageUrl: string,
) => {
  const img = new Image()
  img.src = imageUrl

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width,
    })
  }

  img.onerror = err => {
    console.error(err)
  }
}

export default function PhotoPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {id} = searchParams
  const [imageDimensions, setImageDimensions] = useState<{
    height: number
    width: number
  }>()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const photos = useReadLocalStorage<PhotoWithDimensions[]>(
    'favourites',
  ) as PhotoWithDimensions[]
  const index = photos.findIndex(photo => String(photo.id) === id)
  const {photo, getNextPhoto, getPrevPhoto} = useScrollPhotos({
    photos,
    index,
  })

  useEffect(() => {
    if (!photo) return

    loadImage(setImageDimensions, photo.img_src)
  }, [photo])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!photo) {
    return <div>Error reading photo.</div>
  }

  if (!imageDimensions) {
    return (
      <div className="relative flex h-screen items-center justify-center bg-black dark:invert">
        <ButtonBack />
        <ButtonFavourite photo={photo} position="top-2 right-2" />
        <PhotoSidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          photo={photo}
        />
      </div>
    )
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
            width={imageDimensions.width}
            height={imageDimensions.height}
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
        width={imageDimensions.width}
        height={imageDimensions.height}
        quality={100}
        priority={true}
      />
    </div>
  )
}
