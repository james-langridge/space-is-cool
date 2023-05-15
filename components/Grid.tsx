import React from 'react'

export default function Grid({children}: {children: React.ReactNode}) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 px-0 pt-4">
      {children}
    </div>
  )
}
