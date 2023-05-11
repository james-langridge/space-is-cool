'use client'

import {useQuery} from '@tanstack/react-query'
import React, {useState} from 'react'

import RoverButtonGroup from '@/components/RoverButtonGroup'
import {getMissionManifest} from '@/lib/api'
import {PhotoManifest, RoverName} from '@/types/APIResponseTypes'

export default function MobileManifests() {
  const [rover, setRover] = useState<RoverName>(RoverName.Curiosity)

  const {data, error, status} = useQuery<PhotoManifest>({
    queryKey: ['manifest', rover],
    queryFn: () => getMissionManifest(rover),
  })

  if (status === 'loading') return <p>Loading...</p>

  if (error instanceof Error) return <div>Error: {error.message}</div>

  if (!data) {
    return null
  }

  return (
    <main className="w-full bg-white dark:invert min-h-screen">
      <h1 className="text-center w-full text-6xl py-5">Mission Manifests</h1>
      <RoverButtonGroup setRover={setRover} selectedRover={rover} />
      <section className="container mx-auto px-4 prose">
        <p>Rover: {data.name}</p>
        <p>Launch date: {data.launch_date.toString()}</p>
        <p>Landing date: {data.landing_date.toString()}</p>
        <p>Status: {data.status}</p>
        <p>Max sol: {data.max_sol}</p>
        <p>Max date: {data.max_date.toString()}</p>
        <p>Total photos: {data.total_photos}</p>
      </section>
    </main>
  )
}
