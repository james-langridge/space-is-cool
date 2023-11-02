import {notFound} from 'next/navigation'
import React from 'react'

import ManifestsRoverPage from '@/app/(with-header-footer)/manifests/ui/ManifestsRoverPage'
import {getMissionManifest} from '@/app/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const manifest = await getMissionManifest(rover)

  if (!manifest) {
    return notFound()
  }

  return <ManifestsRoverPage data={manifest} />
}
