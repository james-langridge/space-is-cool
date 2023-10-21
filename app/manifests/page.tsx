import ManifestsPage from '@/components/pages/manifests/ManifestsPage'
import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache once a day
export const revalidate = 86400

const getMissionManifest = async (rover: RoverName): Promise<PhotoManifest> => {
  const res = await fetch(
    `${process.env.NASA_BASE_URL}/manifests/${rover}?api_key=${String(
      process.env.NASA_API_KEY,
    )}`,
  )

  const {photo_manifest} = await res.json()

  return photo_manifest
}

export default async function Page() {
  const rovers = Object.values(RoverName).map(rover => rover)
  const promises = rovers.map(rover => getMissionManifest(rover))
  const manifests = await Promise.all(promises)

  return <ManifestsPage data={manifests} />
}
