import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ButtonFavourite from '@/app/ui/ButtonFavourite'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  id: string
  rover?: RoverName
  date?: string
  camera?: CameraName
  page?: string
}

export default async function PhotoThumbnail({
  photo,
  searchParams,
}: {
  photo: Photo
  searchParams?: SearchParams
}) {
  if (!searchParams) return null

  const isFavourite = searchParams.rover === undefined
  const params = new URLSearchParams(searchParams)
  const href = isFavourite
    ? `/photo/favourites?${params.toString()}`
    : `/photo?${params.toString()}`

  return (
    <div className="relative h-24 w-auto overflow-hidden rounded-md dark:invert sm:h-44 md:h-48 lg:h-64">
      <ButtonFavourite photo={photo} position="hidden sm:block top-1 right-1" />
      <Link href={href} className="relative block h-full w-full">
        <Image
          src={photo.img_src}
          alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
            photo.rover.name
          } on sol ${photo.sol}.`}
          layout="fill"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
          className="object-cover transition-all hover:scale-105"
          quality={1}
        />
      </Link>
    </div>
  )
}
