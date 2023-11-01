import {format, parseISO} from 'date-fns'
import React from 'react'

import {getMissionManifest} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default async function PhotosNotFound({rover}: {rover: RoverName}) {
  const manifest = await getMissionManifest(rover)

  return (
    <div className="prose mx-auto w-full p-5">
      <p className="max-w-prose">
        No photos found. It&apos;s possible no photos were taken on that day or
        by that camera, or both.
      </p>
      {manifest && (
        <p className="max-w-prose">
          Note, the landing date for {rover} is{' '}
          {format(parseISO(manifest?.landing_date), 'do LLLL yyyy')}, and the
          max Earth date is{' '}
          {format(parseISO(manifest?.max_date), 'do LLLL yyyy')}.
        </p>
      )}
    </div>
  )
}
