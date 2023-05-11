'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {useMediaQuery} from 'usehooks-ts'
import {useReadLocalStorage} from 'usehooks-ts'

import FavouriteButton from '@/components/FavouriteButton'
import {PhotoWithPage} from '@/lib/api'

export default function Page() {
  const favourites = useReadLocalStorage<PhotoWithPage[]>('favourites')
  const isMobile = useMediaQuery('(max-width: 640px)')

  console.log(favourites)

  return (
    <main className="w-full bg-white dark:invert min-h-screen">
      <h1 className="text-center w-full text-6xl py-5">Favourite Photos</h1>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 px-0">
        {favourites &&
          favourites.map(photo => (
            <div
              key={photo.id}
              className="relative w-auto h-24 sm:h-44 md:h-48 lg:h-64 overflow-hidden"
            >
              {!isMobile && (
                <FavouriteButton photo={photo} position="top-1 right-1" />
              )}
              <Link
                href={`/photo/${photo.id}?rover=${photo.rover.name}&favourite=true`}
              >
                <Image
                  src={photo.img_src}
                  alt={photo.id.toString()}
                  fill
                  style={{objectFit: 'cover'}}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                />
              </Link>
            </div>
          ))}
      </div>
    </main>
  )
}
