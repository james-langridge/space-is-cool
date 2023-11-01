import React from 'react'

export default function SearchPage() {
  return (
    <main className="container prose mx-auto flex flex-col px-7">
      <p>
        You must select a rover to filter the search results by. Date and camera
        are optional.
      </p>
      <p>
        If you select a rover with no date, then you will get the latest photos
        taken by that rover.
      </p>
      <p>If you want to filter by camera then you must pick a date.</p>
    </main>
  )
}
