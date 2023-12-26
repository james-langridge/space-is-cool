import {format, parseISO} from 'date-fns'
import React from 'react'

import {PhotoManifest} from '@/types/APIResponseTypes'

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
    <section className="container mx-auto px-4">
      <p>Rover: {name}</p>
      <p>Launch date: {format(parseISO(launch_date), 'do LLLL yyyy')}</p>
      <p>Landing date: {format(parseISO(landing_date), 'do LLLL yyyy')}</p>
      <p>Status: {status}</p>
      <p>Max sol: {max_sol}</p>
      <p>Max date: {format(parseISO(max_date), 'do LLLL yyyy')}</p>
      <p>Total photos: {total_photos}</p>
    </section>
  )
}
