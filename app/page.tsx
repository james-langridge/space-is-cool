import React from 'react'

import PhotoOfTheDay from '@/components/PhotoOfTheDay'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="prose text-6xl p-5">Rover Photos</h1>
      <PhotoOfTheDay />
    </main>
  )
}
