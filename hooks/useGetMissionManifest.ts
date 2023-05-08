import {useEffect, useState} from 'react'

import {getMissionManifest} from '@/lib/api'
import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

export default function useGetMissionManifest(rover: RoverName) {
  const [manifest, setManifest] = useState<PhotoManifest>()

  const fetchManifest = async () => {
    const missionManifest = await getMissionManifest(rover)

    setManifest(missionManifest)
  }

  useEffect(() => {
    void fetchManifest()
  }, [])

  return manifest
}
