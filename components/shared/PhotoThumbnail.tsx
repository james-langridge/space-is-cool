import Image from 'next/image'
import React from 'react'

import ButtonFavourite from '@/components/shared/ButtonFavourite'
import {Photo} from '@/types/APIResponseTypes'

export default function PhotoThumbnail({photo}: {photo: Photo}) {
  return (
    <div className="relative h-24 w-auto overflow-hidden dark:invert sm:h-44 md:h-48 lg:h-64">
      <ButtonFavourite photo={photo} position="top-1 right-1" />
      <a
        href={photo.img_src}
        className="relative block h-full w-full"
        target="_blank"
      >
        <Image
          src={photo.img_src}
          alt={photo.id.toString()}
          fill
          style={{objectFit: 'cover'}}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
        />
      </a>
    </div>
  )
}
