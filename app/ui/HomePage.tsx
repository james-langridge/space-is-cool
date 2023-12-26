import Link from 'next/link'
import React from 'react'

import Container from '@/app/ui/container'
import Header from '@/app/ui/Header'
import NavFooter from '@/app/ui/NavFooter'
import {Separator} from '@/app/ui/separator'

export default function HomePage() {
  return (
    <>
      <Container padding={74}>
        <Link href="/">
          <Header string="SpaceI sCool" />
        </Link>
        <Separator className="prose mx-auto my-4" />
        <main className="container prose mx-auto flex flex-col px-7">
          <p>
            This is a user interface to view, search, and save photos taken by
            NASA&apos;s rovers on Mars, which are made public via the{' '}
            <Link
              href="https://api.nasa.gov/#mars-rover-photos"
              target="_blank"
            >
              Mars Rovers Photos API
            </Link>
            .
          </p>
          <p>
            <Link href={'/search'}>Search for photos</Link> by rover, date, and
            camera.
          </p>
          <p>
            <Link href={'/favourites'}>View favourite photos</Link>, saved to
            local browser storage.
          </p>
          <p>
            <Link href={'/manifests'}>View the mission manifests</Link> for each
            rover.
          </p>
        </main>
      </Container>
      <NavFooter />
    </>
  )
}
