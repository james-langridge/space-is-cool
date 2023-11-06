import React from 'react'

export default function PhotoGrid({children}: {children: React.ReactNode}) {
  return (
    <div className="grid grid-cols-4 gap-1 px-0 md:grid-cols-5 lg:grid-cols-6">
      {children}
    </div>
  )
}
