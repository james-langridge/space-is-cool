'use client'

import React from 'react'
import {useMediaQuery} from 'usehooks-ts'

import Container from '@/components/Container'
import Header from '@/components/Header'
import ManifestsTable from '@/components/ManifestsTable'
import ManifestsTableMobile from '@/components/ManifestsTableMobile'

export default function Page() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (isMobile) {
    return <ManifestsTableMobile />
  }

  return (
    <Container>
      <Header string="Mission Manifests" />
      <section className="container mx-auto px-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <ManifestsTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
