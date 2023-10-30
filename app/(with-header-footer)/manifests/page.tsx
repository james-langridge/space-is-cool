import ManifestsPage from '@/components/pages/manifests/ManifestsPage'
import {getMissionManifest} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page() {
  const rovers = Object.values(RoverName).map(rover => rover)
  const promises = rovers.map(rover => getMissionManifest(rover))
  const manifests = await Promise.all(promises)

  return <ManifestsPage data={manifests} />
}
