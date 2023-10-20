import Link from 'next/link'
import React from 'react'

import Header from '@/components/shared/Header'
import {getMissionManifest} from '@/lib/api'
import {RoverName} from '@/types/APIResponseTypes'

// Revalidate the cache once a day
export const revalidate = 86400

export async function generateStaticParams() {
  const rovers = Object.values(RoverName).map(rover => rover)

  return rovers.map(rover => ({
    rover: rover,
  }))
}

export default async function Page({params}: {params: {rover: RoverName}}) {
  const {rover} = params
  const manifest = await getMissionManifest(rover)

  return (
    <main className="w-full min-h-screen">
      <Header string="Mission Manifests" />
      <div className="pt-4 sm:px-4 sm:pb-0 w-full flex justify-center">
        <div className="flex max-w-min justify-center overflow-hidden border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/manifests/${rover}`}>
              <button
                className={
                  'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              >
                {rover}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <section className="container mx-auto px-4">
        <p>Rover: {manifest.name}</p>
        <p>Launch date: {manifest.launch_date.toString()}</p>
        <p>Landing date: {manifest.landing_date.toString()}</p>
        <p>Status: {manifest.status}</p>
        <p>Max sol: {manifest.max_sol}</p>
        <p>Max date: {manifest.max_date.toString()}</p>
        <p>Total photos: {manifest.total_photos}</p>
      </section>
    </main>
  )
}
