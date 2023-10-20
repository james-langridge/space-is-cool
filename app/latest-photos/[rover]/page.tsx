import React from 'react'

import LatestPhotosRoverPage from '@/components/pages/latest-photos/[rover]/LatestPhotosRoverPage'
import {getLatestPhotos} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache twice a day
export const revalidate = 43200

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const photos = await getLatestPhotos(rover)

  return <LatestPhotosRoverPage data={photos} />
}
