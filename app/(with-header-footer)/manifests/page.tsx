import ManifestsPage from '@/app/(with-header-footer)/manifests/ui/ManifestsPage'
import {getMissionManifest} from '@/app/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page() {
  const rovers = Object.values(RoverName).map(rover => rover)
  const promises = rovers.map(rover => getMissionManifest(rover))
  const manifests = await Promise.all(promises)

  return <ManifestsPage data={manifests} />
}
