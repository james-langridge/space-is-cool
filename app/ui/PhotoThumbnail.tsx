import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ButtonFavourite from '@/app/ui/ButtonFavourite'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  rover?: RoverName
  date?: string
  camera?: CameraName
  page?: string
  type?: 'favourite' | 'latest'
}

export default function PhotoThumbnail({
  photo,
  searchParams,
}: {
  photo: Photo
  searchParams?: SearchParams
}) {
  const params = new URLSearchParams(searchParams)

  return (
    <div className="relative h-24 w-auto overflow-hidden dark:invert sm:h-44 md:h-48 lg:h-64">
      <ButtonFavourite photo={photo} position="hidden sm:block top-1 right-1" />
      <Link
        href={`/photo/${photo.id}?${params.toString()}`}
        className="relative block h-full w-full"
      >
        <Image
          src={photo.img_src}
          alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
            photo.rover.name
          } on sol ${photo.sol}.`}
          fill={true}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
          className="object-cover"
        />
      </Link>
    </div>
  )
}
