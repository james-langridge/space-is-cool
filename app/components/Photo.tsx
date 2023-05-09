import Image from 'next/image'
import React from 'react'

import {Photo} from '@/types/APIResponseTypes'

export default function Photo({
  photo,
  isLoading,
  error,
}: {
  photo?: Photo
  isLoading: boolean
  error: unknown
}) {
  if (isLoading || !photo) return <div>Loading...</div>

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>

  return (
    <div className="flex flex-col items-center">
      <p>
        Taken by {photo.rover.name} on {photo.earth_date.toString()} with the{' '}
        {photo.camera.full_name}.
      </p>

      <div className="w-full h-96 relative m-5">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={photo.img_src}
          alt="Photo of the Day"
        />
      </div>
    </div>
  )
}
