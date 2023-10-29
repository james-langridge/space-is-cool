import React from 'react'

import SearchForm from '@/components/global/SearchForm'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <SearchForm />
      {children}
    </>
  )
}
