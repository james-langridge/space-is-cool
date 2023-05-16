import Link from 'next/link'
import React from 'react'

import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="container mx-auto my-5 px-7 flex flex-col prose">
      <Header string="SpaceI sCool" />
      <p>
        This is a user interface to view, search, and save photos taken by
        NASA&apos;s rovers on Mars, which are made public via the{' '}
        <Link href="https://api.nasa.gov/#mars-rover-photos" target="_blank">
          Mars Rovers Photos API
        </Link>
        .
      </p>
      <p>
        <Link href={'/latest-photos'}>View the latest photos</Link> taken by
        each rover.
      </p>
      <p>
        <Link href={'/search'}>Search for photos</Link> by rover, date, and
        camera.
      </p>
      <p>
        <Link href={'/favourites'}>View favourite photos</Link>, saved to local
        browser storage.
      </p>
      <p>
        <Link href={'/manifests'}>View the mission manifests</Link> for each
        rover.
      </p>
    </main>
  )
}
