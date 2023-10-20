import TableManifests from '@/components/pages/manifests/TableManifests'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import {getMissionManifest} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

export default async function Page() {
  const rovers = Object.values(RoverName).map(rover => rover)
  const promises = rovers.map(rover => getMissionManifest(rover))
  const manifests = await Promise.all(promises)

  return (
    <Container>
      <Header string="Mission Manifests" />
      <section className="container mx-auto px-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <TableManifests manifests={manifests} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
