'use client'

import {useState} from 'react'
import {useSwipeable} from 'react-swipeable'
import {useMediaQuery} from 'usehooks-ts'

import ButtonBack from '@/components/ButtonBack'
import ButtonFavourite from '@/components/ButtonFavourite'
import ButtonInfo from '@/components/ButtonInfo'
import ButtonNext from '@/components/ButtonNext'
import ButtonPrev from '@/components/ButtonPrev'
import Sidebar from '@/components/Sidebar'
import {usePhotoHandler} from '@/hooks'
import {RoverName} from '@/types/APIResponseTypes'

type Params = {id: string}
type SearchParams = {rover: RoverName; favourite: string; search: string}

type Props = {
  params: Params
  searchParams: SearchParams
}

export default function Page({params, searchParams}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {id} = params
  const {photo, getNextPhoto, getPrevPhoto} = usePhotoHandler({
    id,
    searchParams,
  })
  const isMobile = useMediaQuery('(max-width: 640px)')
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isSidebarOpen) {
        getNextPhoto()
      }
    },
    onSwipedRight: () => {
      if (!isSidebarOpen) {
        getPrevPhoto()
      }
    },
    onSwipedUp: () => {
      if (!isSidebarOpen) {
        toggleSidebar()
      }
    },
    onSwipedDown: () => {
      if (isSidebarOpen) {
        toggleSidebar()
      }
    },
  })

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
    <div
      {...handlers}
      className="relative h-screen bg-black flex items-center justify-center dark:invert"
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
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} photo={photo} />
      <img
        src={photo.img_src}
        alt={String(photo.id)}
        className="max-h-full max-w-full"
      />
    </div>
  )
}
