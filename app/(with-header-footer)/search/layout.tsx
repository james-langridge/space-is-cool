import React from 'react'

import SearchForm from '@/app/(with-header-footer)/search/ui/SearchForm'
import Container from '@/app/ui/Container'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Container padding={166}>
      <div className="flex justify-center">
        <SearchForm />
      </div>
      {children}
    </Container>
  )
}
