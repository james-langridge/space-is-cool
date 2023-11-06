// Using 'next/legacy/image' because placeholder=blur + blurDataURL doesn't work with new Image??
// As of 04.11.2023 using nextjs 14.0.1
import Image from 'next/legacy/image'
import Link from 'next/link'
import React from 'react'

import {useBase64} from '@/app/(with-header-footer)/favourites/hooks/useBase64'
import ButtonFavourite from '@/app/ui/ButtonFavourite'
import {CameraName, Photo, RoverName} from '@/types/APIResponseTypes'

export type SearchParams = {
  rover?: RoverName
  date?: string
  camera?: CameraName
  page?: string
  type?: 'favourite' | 'latest'
}

export default function FavouritesThumbnail({
  photo,
  searchParams,
}: {
  photo: Photo
  searchParams?: SearchParams
}) {
  const base64 = useBase64(photo.img_src)
  const params = new URLSearchParams(searchParams)

  return (
    <div className="relative h-24 w-auto overflow-hidden rounded-md dark:invert sm:h-44 md:h-48 lg:h-64">
      <ButtonFavourite photo={photo} position="hidden sm:block top-1 right-1" />
      <Link
        href={`/photo/${photo.id}?${params.toString()}`}
        className="relative block h-full w-full"
      >
        {base64 && (
          <Image
            src={photo.img_src}
            alt={`Photo ${photo.id.toString()} taken by Mars Rover ${
              photo.rover.name
            } on sol ${photo.sol}.`}
            layout="fill"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
            className="object-cover transition-all hover:scale-105"
            placeholder="blur"
            blurDataURL={base64}
            quality={50}
          />
        )}
      </Link>
    </div>
  )
}
