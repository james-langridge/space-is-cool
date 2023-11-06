import React from 'react'

export default function Container({
  children,
  padding = 166,
}: {
  children: React.ReactNode
  padding?: number
}) {
  return (
    <main
      className="relative w-full"
      style={{minHeight: `calc(100vh - ${padding}px)`}}
    >
      {children}
    </main>
  )
}
