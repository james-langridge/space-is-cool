import {notFound} from 'next/navigation'
import React from 'react'

import ManifestsRoverPage from '@/components/pages/manifests/[rover]/ManifestsRoverPage'
import {getMissionManifest} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache once a day
export const revalidate = 86400

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const manifest = await getMissionManifest(rover)

  if (!manifest) {
    return notFound()
  }

  return <ManifestsRoverPage data={manifest} />
}
