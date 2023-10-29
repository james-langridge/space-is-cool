import React from 'react'

import {getMissionManifest} from '@/lib/api'
import {convertDateFormat} from '@/lib/date'
import {RoverName} from '@/types/APIResponseTypes'

export default async function PhotosNotFound({rover}: {rover: RoverName}) {
  const manifest = await getMissionManifest(rover)
  const maxDate = manifest?.max_date.toString()
  const landingDate = manifest?.landing_date.toString()

  return (
    <div className="prose mx-auto w-full p-5">
      <p className="max-w-prose">
        No photos found. It&apos;s possible no photos were taken on that day or
        by that camera, or both.
      </p>
      {manifest && (
        <p className="max-w-prose">
          Note, the landing date for {rover} is {convertDateFormat(landingDate)}
          , and the max Earth date is {convertDateFormat(maxDate)}. The sol date
          ranges from 0 to {manifest?.max_sol}.
        </p>
      )}
    </div>
  )
}
