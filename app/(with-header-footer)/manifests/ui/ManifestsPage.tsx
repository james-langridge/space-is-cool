import React from 'react'

import TableManifests from '@/app/(with-header-footer)/manifests/ui/TableManifests'
import Container from '@/app/ui/Container'
import {Separator} from '@/app/ui/Separator'
import {PhotoManifest} from '@/types/APIResponseTypes'

interface ManifestsPageProps {
  data: PhotoManifest[]
}

export default function ManifestsPage({data}: ManifestsPageProps) {
  return (
    <Container>
      <Separator className="my-4" />
      <section className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <TableManifests manifests={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
