import {notFound} from 'next/navigation'
import React from 'react'

import ManifestsRoverPage from '@/components/pages/manifests/[rover]/ManifestsRoverPage'
import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache once a day
export const revalidate = 86400

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

const getMissionManifest = async (rover: RoverName): Promise<PhotoManifest> => {
  const res = await fetch(
    `${process.env.NASA_BASE_URL}/manifests/${rover}?api_key=${String(
      process.env.NASA_API_KEY,
    )}`,
  )

  const {photo_manifest} = await res.json()

  return photo_manifest
}

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const manifest = await getMissionManifest(rover)

  if (!manifest) {
    return notFound()
  }

  return <ManifestsRoverPage data={manifest} />
}
