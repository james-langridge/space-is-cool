'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import {useForm} from '@/app/providers'
import ButtonFavourite from '@/components/ButtonFavourite'
import {PhotoWithPage} from '@/lib/api'
import {Photo} from '@/types/APIResponseTypes'

export default function PhotoThumbnail({
  photo,
  mode,
}: {
  photo: PhotoWithPage | Photo
  mode: 'search' | 'favourite' | 'latest'
}) {
  const form = useForm()
  const {rover} = form
  const isMobile = useMediaQuery('(max-width: 640px)')
  const href =
    mode === 'search'
      ? `/photo/${photo.id}?rover=${rover}&search=true`
      : mode === 'favourite'
      ? `/photo/${photo.id}?rover=${photo.rover.name}&favourite=true`
      : `/photo/${photo.id}?rover=${rover}`

  return (
    <div className="relative w-auto h-24 sm:h-44 md:h-48 lg:h-64 overflow-hidden dark:invert">
      {!isMobile && <ButtonFavourite photo={photo} position="top-1 right-1" />}
      <Link href={href} className="relative block w-full h-full">
        <Image
          src={photo.img_src}
          alt={photo.id.toString()}
          fill
          style={{objectFit: 'cover'}}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
        />
      </Link>
    </div>
  )
}
