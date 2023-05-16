'use client'

import {useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useSwipeable} from 'react-swipeable'
import {useMediaQuery, useReadLocalStorage} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import ButtonBack from '@/components/ButtonBack'
import ButtonFavourite from '@/components/ButtonFavourite'
import ButtonInfo from '@/components/ButtonInfo'
import ButtonNext from '@/components/ButtonNext'
import ButtonPrev from '@/components/ButtonPrev'
import Sidebar from '@/components/Sidebar'
import {PhotoWithPage} from '@/lib/api'
import {Data} from '@/lib/photo'
import {RoverName} from '@/types/APIResponseTypes'

export default function Page({
  params,
  searchParams,
}: {
  params: {id: string}
  searchParams: {rover: RoverName; favourite: string; search: string}
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const form = useForm()
  const {id} = params
  const {rover, favourite, search} = searchParams
  const queryClient = useQueryClient()
  const favourites = useReadLocalStorage<PhotoWithPage[]>(
    'favourites',
  ) as PhotoWithPage[]
  const queryKey =
    search === 'true'
      ? ['photos', JSON.stringify(form.submittedForm)]
      : ['photos', rover]
  const queryData = queryClient.getQueryData<Data>(queryKey)
  const [index, setIndex] = useState<number>()
  const [photo, setPhoto] = useState<PhotoWithPage>()
  const [photos] = useState<PhotoWithPage[] | undefined>(() =>
    favourite === 'true' ? favourites : queryData?.pages.flat(),
  )
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

  useEffect(() => {
    const index = photos?.findIndex(photo => photo.id === Number(id))

    setIndex(index)

    if (index === undefined || !photos) {
      return
    }

    setPhoto(photos[index])
  }, [id, photos])

  function getNextPhoto() {
    if (index === undefined || !photos || index === photos.length - 1) {
      return
    }

    const newIndex = index + 1

    setIndex(newIndex)
    setPhoto(photos[newIndex])
  }

  function getPrevPhoto() {
    if (index === undefined || !photos || index === 0) {
      return
    }

    const newIndex = index - 1

    setIndex(newIndex)
    setPhoto(photos[newIndex])
  }

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
