import {format, parseISO} from 'date-fns'
import Link from 'next/link'
import React from 'react'

import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

interface ManifestsRoverPageProps {
  data: PhotoManifest
}

export default function ManifestsRoverPage({data}: ManifestsRoverPageProps) {
  const {
    name,
    max_date,
    launch_date,
    max_sol,
    landing_date,
    status,
    total_photos,
  } = data

  return (
    <>
      <div className="flex w-full justify-center pt-4 sm:px-4 sm:pb-0">
        <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/manifests/${rover}`}>
              <button
                className={
                  'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-6 sm:text-base'
                }
              >
                {rover}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <section className="container mx-auto px-4">
        <p>Rover: {name}</p>
        <p>Launch date: {format(parseISO(launch_date), 'do LLLL yyyy')}</p>
        <p>Landing date: {format(parseISO(landing_date), 'do LLLL yyyy')}</p>
        <p>Status: {status}</p>
        <p>Max sol: {max_sol}</p>
        <p>Max date: {format(parseISO(max_date), 'do LLLL yyyy')}</p>
        <p>Total photos: {total_photos}</p>
      </section>
    </>
  )
}
