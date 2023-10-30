import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return <main className="min-h-screen w-full">{children}</main>
}
