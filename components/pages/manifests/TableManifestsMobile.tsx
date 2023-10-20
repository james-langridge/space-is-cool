import {useQuery} from '@tanstack/react-query'
import React from 'react'

import {useForm} from '@/app/providers'
import ButtonRovers from '@/components/pages/search/ButtonRovers'
import Header from '@/components/shared/Header'
import {getMissionManifest} from '@/lib/api'
import {PhotoManifest} from '@/types/APIResponseTypes'

export default function TableManifestsMobile() {
  const form = useForm()
  const {rover} = form

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
    <main className="w-full min-h-screen">
      <Header string="Mission Manifests" />
      <ButtonRovers />
      <section className="container mx-auto px-4">
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
