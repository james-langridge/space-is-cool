import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <main className="container prose mx-auto flex min-h-screen flex-col px-7">
      <p>
        This is a user interface to view, search, and save photos taken by
        NASA&apos;s rovers on Mars, which are made public via the{' '}
        <Link href="https://api.nasa.gov/#mars-rover-photos" target="_blank">
          Mars Rovers Photos API
        </Link>
        .
      </p>
      <p>
        Search for photos by rover, date, and camera. Clicking on the rover name
        above will display the latest photos taken.
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