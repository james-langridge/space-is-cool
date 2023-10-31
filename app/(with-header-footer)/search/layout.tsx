import React from 'react'

import Container from '@/components/global/Container'
import SearchForm from '@/components/pages/search/SearchForm'

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
